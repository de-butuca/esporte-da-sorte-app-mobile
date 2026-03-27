import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, Trophy } from 'lucide-react-native';
import { fontFamily, lightColors } from '@/stampd.config';
import { SearchLeagueCardViewModel } from '../search.types';

interface SearchLeagueCardProps {
	league: SearchLeagueCardViewModel;
	onPress: (league: SearchLeagueCardViewModel) => void;
}

export function SearchLeagueCard({ league, onPress }: SearchLeagueCardProps) {
	return (
		<TouchableOpacity style={styles.card} onPress={() => onPress(league)} activeOpacity={0.85}>
			<View style={styles.mainContent}>
				<LinearGradient colors={['#1D3D76', '#0C1731']} style={styles.iconWrap}>
					<Trophy size={RFValue(15)} color="#F2C761" strokeWidth={2} />
				</LinearGradient>

				<View style={styles.textContent}>
					<Text style={styles.title} numberOfLines={1}>
						{league.title}
					</Text>
					<Text style={styles.subtitle} numberOfLines={1}>
						{league.subtitle}
					</Text>
				</View>
			</View>

			<ChevronRight size={RFValue(18)} color="rgba(255,255,255,0.3)" strokeWidth={2.2} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#1A2336',
		borderRadius: RFValue(14),
		paddingHorizontal: RFValue(16),
		paddingVertical: RFValue(14),
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.04)',
	},
	mainContent: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	iconWrap: {
		width: RFValue(34),
		height: RFValue(34),
		borderRadius: RFValue(17),
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: RFValue(12),
	},
	textContent: {
		flex: 1,
		gap: RFValue(4),
	},
	title: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(14),
		color: lightColors.textPrimary,
	},
	subtitle: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(11),
		color: lightColors.textMuted,
	},
});
