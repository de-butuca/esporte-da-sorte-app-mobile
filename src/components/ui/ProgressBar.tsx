import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ui } from './theme';

interface ProgressBarProps {
	segments: number;
	activeSegment: number;
}

export function ProgressBar({ segments, activeSegment }: ProgressBarProps) {
	return (
		<View style={styles.container} accessibilityRole="progressbar">
			{Array.from({ length: segments }, (_, i) => (
				<View
					key={i}
					style={[
						styles.segment,
						{ backgroundColor: i < activeSegment ? ui.colors.primary : ui.colors.surface2 },
					]}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: RFValue(4),
	},
	segment: {
		flex: 1,
		height: RFValue(4),
		borderRadius: ui.radius.full,
	},
});
