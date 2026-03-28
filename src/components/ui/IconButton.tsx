import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { ui } from './theme';

type Size = 'sm' | 'md' | 'lg';
type Variant = 'default' | 'primary';

interface IconButtonProps {
	icon: React.ReactNode;
	size?: Size;
	variant?: Variant;
	disabled?: boolean;
	onPress?: () => void;
	accessibilityLabel: string;
}

export function IconButton({
	icon,
	size = 'md',
	variant = 'default',
	disabled = false,
	onPress,
	accessibilityLabel,
}: IconButtonProps) {
	return (
		<TouchableOpacity
			style={[styles.base, sizeStyles[size], variantStyles[variant], disabled && styles.disabled]}
			onPress={onPress}
			disabled={disabled}
			activeOpacity={0.7}
			accessibilityRole="button"
			accessibilityLabel={accessibilityLabel}
			accessibilityState={{ disabled }}
		>
			{icon}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	base: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: ui.radius.md,
	},
	disabled: {
		opacity: 0.5,
	},
});

const sizeStyles: Record<Size, ViewStyle> = {
	sm: { width: ui.size.sm, height: ui.size.sm },
	md: { width: ui.size.md, height: ui.size.md },
	lg: { width: ui.size.lg, height: ui.size.lg },
};

const variantStyles: Record<Variant, ViewStyle> = {
	default: { backgroundColor: ui.colors.surface1 },
	primary: { backgroundColor: ui.colors.primary },
};
