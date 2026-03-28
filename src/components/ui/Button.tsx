import React from 'react';
import {
	TouchableOpacity,
	Text,
	ActivityIndicator,
	StyleSheet,
	ViewStyle,
	TextStyle,
	View,
} from 'react-native';
import { ui } from './theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
	children: string;
	variant?: Variant;
	size?: Size;
	icon?: React.ReactNode;
	iconPosition?: 'leading' | 'trailing';
	loading?: boolean;
	disabled?: boolean;
	onPress?: () => void;
}

export function Button({
	children,
	variant = 'primary',
	size = 'md',
	icon,
	iconPosition = 'leading',
	loading = false,
	disabled = false,
	onPress,
}: ButtonProps) {
	const isDisabled = disabled || loading;

	return (
		<TouchableOpacity
			style={[
				styles.base,
				sizeStyles[size],
				variantStyles[variant],
				isDisabled && styles.disabled,
			]}
			onPress={onPress}
			disabled={isDisabled}
			activeOpacity={0.7}
			accessibilityRole="button"
			accessibilityState={{ disabled: isDisabled }}
		>
			{loading ? (
				<ActivityIndicator
					size="small"
					color={variant === 'primary' ? ui.colors.onPrimary : ui.colors.textPrimary}
				/>
			) : (
				<View style={styles.content}>
					{icon && iconPosition === 'leading' && icon}
					<Text style={[styles.label, variantTextStyles[variant], sizeTextStyles[size]]}>
						{children}
					</Text>
					{icon && iconPosition === 'trailing' && icon}
				</View>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	base: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: ui.radius.md,
		borderWidth: 2,
		borderColor: 'transparent',
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: ui.fontSize.xs,
	},
	label: {
		fontFamily: ui.font.semibold,
	},
	disabled: {
		opacity: 0.5,
	},
});

const sizeStyles: Record<Size, ViewStyle> = {
	sm: { height: ui.size.sm, paddingHorizontal: ui.fontSize.sm },
	md: { height: ui.size.md, paddingHorizontal: ui.fontSize.md },
	lg: { height: ui.size.lg, paddingHorizontal: ui.fontSize.lg },
};

const sizeTextStyles: Record<Size, TextStyle> = {
	sm: { fontSize: ui.fontSize.sm },
	md: { fontSize: ui.fontSize.base },
	lg: { fontSize: ui.fontSize.md },
};

const variantStyles: Record<Variant, ViewStyle> = {
	primary: { backgroundColor: ui.colors.primary, borderColor: ui.colors.primary },
	secondary: { backgroundColor: ui.colors.secondary, borderColor: ui.colors.secondary },
	ghost: { backgroundColor: 'transparent', borderColor: ui.colors.primary },
	outline: { backgroundColor: 'transparent', borderColor: ui.colors.border },
};

const variantTextStyles: Record<Variant, TextStyle> = {
	primary: { color: ui.colors.onPrimary },
	secondary: { color: ui.colors.textPrimary },
	ghost: { color: ui.colors.primary },
	outline: { color: ui.colors.textPrimary },
};
