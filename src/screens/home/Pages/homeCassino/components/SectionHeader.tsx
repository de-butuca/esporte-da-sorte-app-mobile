import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily } from '@/stampd.config';
import { useAuthThemeStore } from '@/core/auth/useAuthThemeStore';

interface SectionHeaderProps {
	title: string;
	count?: number;
	hasLive?: boolean;
	onSeeAll?: () => void;
}

export function SectionHeader({ title, count, hasLive, onSeeAll }: SectionHeaderProps) {
	const colors = useAuthThemeStore((s) => s.colors);

	return (
		<View style={styles.container}>
			<View style={styles.titleRow}>
				{hasLive && <View style={[styles.liveDot, { backgroundColor: colors.live }]} />}
				<Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
			</View>
			{count !== undefined && (
				<TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
					<Text style={[styles.seeAll, { color: colors.accent }]}>Ver todos →</Text>
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
	},
	title: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(14),
	},
	seeAll: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(11),
	},
});
