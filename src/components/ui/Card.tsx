import React from 'react';
import { View, StyleSheet, ViewStyle, ViewProps } from 'react-native';
import { ui } from './theme';

type SurfaceVariant = 'surface-1' | 'surface-2' | 'surface-3';
type Elevation = 1 | 2 | 3;

interface CardProps extends ViewProps {
	variant?: SurfaceVariant;
	elevation?: Elevation;
	children: React.ReactNode;
}

export function Card({
	variant = 'surface-1',
	elevation = 1,
	children,
	style,
	...rest
}: CardProps) {
	return (
		<View
			style={[styles.base, surfaceStyles[variant], elevationStyles[elevation], style]}
			{...rest}
		>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	base: {
		borderRadius: ui.radius.lg,
		padding: ui.fontSize.md,
	},
});

const surfaceStyles: Record<SurfaceVariant, ViewStyle> = {
	'surface-1': { backgroundColor: ui.colors.surface1 },
	'surface-2': { backgroundColor: ui.colors.surface2 },
	'surface-3': { backgroundColor: ui.colors.surface3 },
};

const elevationStyles: Record<Elevation, ViewStyle> = {
	1: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},
	2: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 4,
	},
	3: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.1,
		shadowRadius: 15,
		elevation: 8,
	},
};
