import React from 'react';
import { View, StyleSheet } from 'react-native';

interface DividerProps {
	orientation?: 'horizontal' | 'vertical';
}

const DIVIDER_COLOR = 'rgba(148,163,184,0.1)';

export function Divider({ orientation = 'horizontal' }: DividerProps) {
	return (
		<View
			style={orientation === 'horizontal' ? styles.horizontal : styles.vertical}
			accessibilityRole="none"
		/>
	);
}

const styles = StyleSheet.create({
	horizontal: {
		height: 1,
		width: '100%',
		backgroundColor: DIVIDER_COLOR,
	},
	vertical: {
		width: 1,
		height: '100%',
		backgroundColor: DIVIDER_COLOR,
	},
});
