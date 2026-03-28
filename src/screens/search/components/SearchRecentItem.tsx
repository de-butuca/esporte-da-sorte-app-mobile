import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Clock3 } from 'lucide-react-native';
import { fontFamily, lightColors } from '@/stampd.config';

interface SearchRecentItemProps {
	label: string;
	onPress: (label: string) => void;
}

export function SearchRecentItem({ label, onPress }: SearchRecentItemProps) {
	return (
		<TouchableOpacity style={styles.container} onPress={() => onPress(label)} activeOpacity={0.8}>
			<Clock3 size={RFValue(14)} color={lightColors.textInactive} strokeWidth={2} />
			<Text style={styles.label} numberOfLines={1}>
				{label}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(10),
		backgroundColor: '#1A2336',
		borderRadius: RFValue(10),
		paddingHorizontal: RFValue(14),
		paddingVertical: RFValue(12),
	},
	label: {
		flex: 1,
		fontFamily: fontFamily.medium,
		fontSize: RFValue(12),
		color: lightColors.textSecondary,
	},
});
