import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily } from '@/stampd.config';
import { useAuthThemeStore } from '@/core/auth/useAuthThemeStore';
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
	const colors = useAuthThemeStore((s) => s.colors);

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
							style={[
								styles.chip,
								{ backgroundColor: colors.surface2, borderColor: colors.border },
								isActive && { backgroundColor: colors.accent, borderColor: colors.accent },
							]}
							onPress={() => onSelectFilter(filter)}
							activeOpacity={0.8}
						>
							<Text
								style={[
									styles.chipText,
									{ color: colors.textMuted },
									isActive && { fontFamily: fontFamily.bold, color: colors.onPrimary },
								]}
							>
								{filter}
							</Text>
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
		borderWidth: 1,
	},
	chipText: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(12),
	},
});
