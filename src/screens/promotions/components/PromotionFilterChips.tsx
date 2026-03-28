import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily, lightColors } from '@/stampd.config';
import { PromotionCategory } from '../promotions.types';

interface PromotionFilterChipsProps {
	filters: PromotionCategory[];
	selectedFilter: PromotionCategory;
	onSelectFilter: (filter: PromotionCategory) => void;
}

export function PromotionFilterChips({
	filters,
	selectedFilter,
	onSelectFilter,
}: PromotionFilterChipsProps) {
	return (
		<View style={styles.wrapper}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.content}
			>
				{filters.map((filter) => {
					const isActive = filter === selectedFilter;
					return (
						<TouchableOpacity
							key={filter}
							style={[styles.chip, isActive && styles.chipActive]}
							onPress={() => onSelectFilter(filter)}
							activeOpacity={0.8}
						>
							<Text style={[styles.chipText, isActive && styles.chipTextActive]}>{filter}</Text>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		paddingTop: RFValue(8),
	},
	content: {
		paddingHorizontal: RFValue(20),
		gap: RFValue(10),
	},
	chip: {
		paddingHorizontal: RFValue(16),
		paddingVertical: RFValue(10),
		borderRadius: RFValue(14),
		backgroundColor: '#161A4A',
		borderWidth: 1,
		borderColor: 'rgba(160,160,200,0.18)',
	},
	chipActive: {
		backgroundColor: lightColors.accent,
		borderColor: lightColors.accent,
	},
	chipText: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(12),
		color: lightColors.textMuted,
	},
	chipTextActive: {
		fontFamily: fontFamily.bold,
		color: lightColors.bgNav,
	},
});
