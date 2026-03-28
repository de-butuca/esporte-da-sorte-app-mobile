import React from 'react';
import {
	View,
	ScrollView,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
	RefreshControl,
	StyleSheet,
	ScrollViewProps,
	KeyboardAvoidingViewProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStampdUI } from 'stampd/context';

interface BasePageProps {
	children: React.ReactNode;

	// comportamento
	scroll?: boolean;
	form?: boolean;

	// scroll
	refreshing?: boolean;
	onRefresh?: () => void;
	scrollProps?: ScrollViewProps;

	// keyboard
	keyboardProps?: KeyboardAvoidingViewProps;

	// layout
	padding?: number;
	fullscreen?: boolean;
}

export function BasePage({
	children,
	scroll,
	form,
	refreshing = false,
	onRefresh,
	scrollProps,
	keyboardProps,
	padding = 16,
	fullscreen = false,
}: BasePageProps) {
	const { theme } = useStampdUI();

	const Container = (
		<SafeAreaView style={[styles.flex, { backgroundColor: theme.colors.background }]}>{renderContent()}</SafeAreaView>
	);

	function renderContent() {
		// 🔥 FULLSCREEN (sem padding)
		if (fullscreen) {
			return <View style={styles.flex}>{children}</View>;
		}

		// 🔥 SCROLL
		if (scroll) {
			return (
				<ScrollView
					contentContainerStyle={{ padding }}
					keyboardShouldPersistTaps="handled"
					refreshControl={onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : undefined}
					{...scrollProps}
				>
					{children}
				</ScrollView>
			);
		}

		// 🔥 FORM (keyboard + dismiss)
		if (form) {
			return (
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<KeyboardAvoidingView
						style={[styles.flex, { padding }]}
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
						{...keyboardProps}
					>
						{children}
					</KeyboardAvoidingView>
				</TouchableWithoutFeedback>
			);
		}

		// 🔥 DEFAULT
		return <View style={{ padding }}>{children}</View>;
	}

	return Container;
}

const styles = StyleSheet.create({
	flex: { flex: 1 },
});
