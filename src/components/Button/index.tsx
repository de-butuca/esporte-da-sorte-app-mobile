import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { BBS } from './styles';

import { useStampdUI } from 'stampd/context';
interface ButtonBaseProps {
	text: string;
	isLoading?: boolean;
	disabled?: boolean;
	size?: 'sm' | 'md' | 'lg' | 'full';
	variant?: 'primary' | 'accent';
	rightIcon?: React.ReactNode;
	onPress: () => void;
}

export function ButtonBase({
	text,
	isLoading = false,
	disabled = false,
	onPress,
	size = 'full',
	variant = 'primary',
	rightIcon,
}: ButtonBaseProps) {
	const isDisabled = disabled || isLoading;
	const { theme } = useStampdUI();
	const containerStyle = variant === 'accent' ? { backgroundColor: theme.colors.accent } : undefined;
	const textStyle = variant === 'accent' ? { color: theme.colors.bgNav } : undefined;
	const loaderColor = variant === 'accent' ? theme.colors.bgNav : theme.colors.onPrimary;

	return (
		<BBS.container
			size={size}
			style={containerStyle}
			onPress={onPress}
			disabled={isDisabled}
			accessibilityState={{ disabled: isDisabled, busy: isLoading }}
		>
			{isLoading ? (
				<ActivityIndicator color={loaderColor} size={30} />
			) : (
				<View style={styles.content}>
					<BBS.Text style={textStyle}>{text}</BBS.Text>
					{rightIcon ? <View style={styles.iconWrap}>{rightIcon}</View> : null}
				</View>
			)}
		</BBS.container>
	);
}

const styles = StyleSheet.create({
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconWrap: {
		marginLeft: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
