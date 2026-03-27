import {
	Keyboard,
	KeyboardAvoidingViewProps,
	Platform,
	RefreshControl,
	ScrollViewProps,
	StyleSheet,
	TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BPS } from './styles';
import { useStampdUI } from 'stampd/context';
import { useMemo } from 'react';

type BasePageType = 'view' | 'scroll' | 'form';

interface BasePageProps {
	children?: React.ReactNode;
	type?: BasePageType;
	refreshing?: boolean;
	onRefresh?: () => void;
	scrollProps?: ScrollViewProps;
	keyboardProps?: KeyboardAvoidingViewProps;
	padding?: number;
}

export function BasePage({
	children,
	type = 'view',
	refreshing = false,
	onRefresh,
	scrollProps,
	keyboardProps,
	padding = 12,
}: BasePageProps) {
	const { theme } = useStampdUI();

	const paddingStyle = useMemo(() => ({ padding }), [padding]);
	const formStyle = useMemo(() => ({ flex: 1, padding }), [padding]);
	const scrollContentStyle = useMemo(() => ({ padding }), [padding]);
	const safeAreaStyle = useMemo(
		() => [baseStyles.fill, { backgroundColor: theme.colors.background }],
		[theme.colors.background],
	);

	const content = (() => {
		if (type === 'scroll') {
			return (
				<BPS.ScrollView
					contentContainerStyle={scrollContentStyle}
					refreshControl={onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : undefined}
					keyboardShouldPersistTaps="handled"
					{...scrollProps}
				>
					{children}
				</BPS.ScrollView>
			);
		}

		if (type === 'form') {
			return (
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<BPS.KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
						style={formStyle}
						{...keyboardProps}
					>
						{children}
					</BPS.KeyboardAvoidingView>
				</TouchableWithoutFeedback>
			);
		}

		return <BPS.View style={paddingStyle}>{children}</BPS.View>;
	})();

	return <SafeAreaView style={safeAreaStyle}>{content}</SafeAreaView>;
}

const baseStyles = StyleSheet.create({
	fill: { flex: 1 },
});
