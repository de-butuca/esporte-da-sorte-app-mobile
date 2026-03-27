import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily, lightColors } from '@/stampd.config';

interface SectionHeaderProps {
	title: string;
	count?: number;
	hasLive?: boolean;
	onSeeAll?: () => void;
}

export function SectionHeader({ title, count, hasLive, onSeeAll }: SectionHeaderProps) {
	return (
		<View style={styles.container}>
			<View style={styles.titleRow}>
				{hasLive && <View style={styles.liveDot} />}
				<Text style={styles.title}>{title}</Text>
			</View>
			{count !== undefined && (
				<TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
					<Text style={styles.seeAll}>Ver todos →</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: RFValue(14),
	},
	titleRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(6),
	},
	liveDot: {
		width: RFValue(6),
		height: RFValue(6),
		borderRadius: RFValue(3),
		backgroundColor: lightColors.live,
	},
	title: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(14),
		color: lightColors.textPrimary,
	},
	seeAll: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(11),
		color: lightColors.accent,
	},
});
