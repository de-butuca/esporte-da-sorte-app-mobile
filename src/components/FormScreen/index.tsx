import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
} from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	TextInput,
	View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { lightColors } from '@/theme/design-tokens';

// ── Context para vincular inputs ──────────────────────────────────

type FormFieldsContextValue = {
	register: (order: number, ref: TextInput) => void;
	focusNext: (currentOrder: number) => void;
	isLast: (order: number) => boolean;
	setScrollRef: (ref: ScrollView) => void;
};

const FormFieldsContext = createContext<FormFieldsContextValue | null>(null);

// ── Provider (envolve a tela inteira) ─────────────────────────────

interface FormFieldsProviderProps {
	children: React.ReactNode;
	fieldCount: number;
}

export function FormFieldsProvider({
	children,
	fieldCount,
}: FormFieldsProviderProps) {
	const fieldsRef = useRef<Map<number, TextInput>>(new Map());
	const scrollViewRef = useRef<ScrollView | null>(null);

	const register = useCallback((order: number, ref: TextInput) => {
		fieldsRef.current.set(order, ref);
	}, []);

	const focusNext = useCallback((currentOrder: number) => {
		const map = fieldsRef.current;
		const orders = Array.from(map.keys()).sort((a, b) => a - b);
		const nextOrder = orders.find((o) => o > currentOrder);
		if (nextOrder != null) {
			const nextInput = map.get(nextOrder);
			nextInput?.focus();

			// Scrolla até o input focado com um pequeno delay para o layout atualizar
			if (scrollViewRef.current && nextInput) {
				setTimeout(() => {
					(nextInput as any).measureLayout?.(
						scrollViewRef.current,
						(_x: number, y: number) => {
							scrollViewRef.current?.scrollTo({ y: Math.max(0, y - 120), animated: true });
						},
						() => {},
					);
				}, 100);
			}
		}
	}, []);

	const isLast = useCallback(
		(order: number) => order >= fieldCount - 1,
		[fieldCount],
	);

	const setScrollRef = useCallback((ref: ScrollView) => {
		scrollViewRef.current = ref;
	}, []);

	const ctxValue = useMemo<FormFieldsContextValue>(
		() => ({ register, focusNext, isLast, setScrollRef }),
		[register, focusNext, isLast, setScrollRef],
	);

	return (
		<FormFieldsContext.Provider value={ctxValue}>
			{children}
		</FormFieldsContext.Provider>
	);
}

// ── Hook para cada campo ──────────────────────────────────────────

export function useFormField(order: number, onSubmit?: () => void) {
	const ctx = useContext(FormFieldsContext);
	if (!ctx) {
		throw new Error('useFormField deve ser usado dentro de <FormFieldsProvider>');
	}

	const { register, focusNext, isLast } = ctx;
	const last = isLast(order);

	const refCallback = useCallback(
		(input: TextInput | null) => {
			if (input) register(order, input);
		},
		[order, register],
	);

	const handleSubmitEditing = useCallback(() => {
		if (last && onSubmit) {
			onSubmit();
		} else {
			focusNext(order);
		}
	}, [last, onSubmit, order, focusNext]);

	return {
		ref: refCallback,
		returnKeyType: last ? ('done' as const) : ('next' as const),
		onSubmitEditing: handleSubmitEditing,
		blurOnSubmit: last,
	};
}

// ── FormScreen (layout) ──────────────────────────────────────────

interface FormScreenProps {
	children: React.ReactNode;
	header?: React.ReactNode;
	footer?: React.ReactNode;
	paddingHorizontal?: number;
	backgroundColor?: string;
}

export function FormScreen({
	children,
	header,
	footer,
	paddingHorizontal = 20,
	backgroundColor,
}: FormScreenProps) {
	const insets = useSafeAreaInsets();
	const ctx = useContext(FormFieldsContext);

	const scrollRefCallback = useCallback(
		(ref: ScrollView | null) => {
			if (ref && ctx) {
				ctx.setScrollRef(ref);
			}
		},
		[ctx],
	);

	const scrollContentStyle = useMemo(
		() => ({
			paddingHorizontal,
			paddingBottom: insets.bottom + 40,
			flexGrow: 1,
		}),
		[paddingHorizontal, insets.bottom],
	);

	return (
		<View style={[styles.root, backgroundColor != null && { backgroundColor }]}>
			{header}

			<KeyboardAvoidingView
				style={styles.flex}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<ScrollView
					ref={scrollRefCallback}
					style={styles.flex}
					contentContainerStyle={scrollContentStyle}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
					keyboardDismissMode="interactive"
				>
					{children}
				</ScrollView>
			</KeyboardAvoidingView>

			{footer && (
				<View style={[styles.footer, { paddingBottom: insets.bottom }]}>
					{footer}
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: lightColors.background,
	},
	flex: {
		flex: 1,
	},
	footer: {
		paddingHorizontal: 20,
	},
});
