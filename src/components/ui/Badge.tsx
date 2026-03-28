import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ui } from './theme';

type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'live' | 'neutral';
type BadgeType = 'filled' | 'outline';

interface BadgeProps {
	variant?: BadgeVariant;
	type?: BadgeType;
	children: React.ReactNode;
}

const VARIANT_COLORS: Record<BadgeVariant, string> = {
	success: ui.colors.success,
	error: ui.colors.error,
	warning: ui.colors.warning,
	info: ui.colors.info,
	live: ui.colors.live,
	neutral: ui.colors.textSecondary,
};

export function Badge({ variant = 'neutral', type = 'filled', children }: BadgeProps) {
	const color = VARIANT_COLORS[variant];
	const isFilled = type === 'filled';

	const containerStyle: ViewStyle = isFilled
		? { backgroundColor: color }
		: { backgroundColor: 'transparent', borderWidth: 1, borderColor: color };

	const textColor: string = isFilled
		? (variant === 'warning' ? ui.colors.onPrimary : '#FFFFFF')
		: color;

	return (
		<View style={[styles.base, containerStyle]}>
			<Text style={[styles.text, { color: textColor }]}>
				{children}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	base: {
		alignSelf: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: RFValue(8),
		paddingVertical: RFValue(2),
		borderRadius: ui.radius.full,
	},
	text: {
		fontFamily: ui.font.semibold,
		fontSize: ui.fontSize.xs,
		letterSpacing: 0.08,
		textTransform: 'uppercase',
	},
});
