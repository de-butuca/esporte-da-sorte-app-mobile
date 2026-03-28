import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily, lightColors } from '@/stampd.config';
import { SearchSportChipViewModel } from '../search.types';

interface SearchSportTabsProps {
	sports: SearchSportChipViewModel[];
	selectedSportSlug: string;
	onSelectSport: (slug: string) => void;
}

export function SearchSportTabs({
	sports,
	selectedSportSlug,
	onSelectSport,
}: SearchSportTabsProps) {
	return (
		<View style={styles.wrapper}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.content}
			>
				{sports.map((sport) => {
					const isActive = sport.slug === selectedSportSlug;

					return (
						<TouchableOpacity
							key={sport.id}
							style={[styles.tab, isActive && styles.tabActive]}
							onPress={() => onSelectSport(sport.slug)}
							activeOpacity={0.8}
						>
							<View
								style={[
									styles.dot,
									{ backgroundColor: sport.accentColor },
									isActive && styles.dotActive,
								]}
							/>
							<Text style={[styles.label, isActive && styles.labelActive]}>{sport.label}</Text>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		paddingTop: RFValue(4),
	},
	content: {
		paddingHorizontal: RFValue(20),
		gap: RFValue(8),
	},
	tab: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(6),
		paddingHorizontal: RFValue(12),
		paddingVertical: RFValue(8),
		borderRadius: RFValue(999),
		backgroundColor: '#1A2336',
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.06)',
	},
	tabActive: {
		backgroundColor: '#222D44',
		borderColor: 'rgba(56,230,125,0.3)',
	},
	dot: {
		width: RFValue(8),
		height: RFValue(8),
		borderRadius: RFValue(4),
	},
	dotActive: {
		shadowColor: '#FFFFFF',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
	},
	label: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(11),
		color: lightColors.textSecondary,
	},
	labelActive: {
		fontFamily: fontFamily.bold,
		color: lightColors.textPrimary,
	},
});
