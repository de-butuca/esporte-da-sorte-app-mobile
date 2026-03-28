import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy } from 'lucide-react-native';
import { lightColors, fontFamily } from '@/stampd.config';
import { UpcomingMatches } from './components/UpcomingMatches';
import { Match } from './components/MatchCard';
import { useAppNavigation } from '@/navigation/hooks';

import IconsStores from '@assets/images/avatar-stores.png';

const UPCOMING_MATCHES: Match[] = [
	{ id: '1', homeTeam: 'BRA', awayTeam: 'ARG', scheduledAt: 'Qua, 21:45', thumbnail: IconsStores },
	{ id: '2', homeTeam: 'BRA', awayTeam: 'ARG', scheduledAt: 'Qua, 21:45', thumbnail: IconsStores },
	{ id: '3', homeTeam: 'BRA', awayTeam: 'ARG', scheduledAt: 'Qua, 21:45', thumbnail: IconsStores },
	{ id: '4', homeTeam: 'BRA', awayTeam: 'ARG', scheduledAt: 'Qua, 21:45', thumbnail: IconsStores },
	{ id: '5', homeTeam: 'BRA', awayTeam: 'ARG', scheduledAt: 'Qua, 21:45', thumbnail: IconsStores },
];

export function HomeEsportes() {
	const navigation = useAppNavigation();

	const handleMatchPress = useCallback(() => {
		navigation.navigate('GameHome');
	}, [navigation]);

	const handleBolaoPress = useCallback(() => {
		navigation.navigate('Bolao');
	}, [navigation]);

	return (
		<>
			<View style={styles.bannerWrapper}>
				<TouchableOpacity activeOpacity={0.85} onPress={handleBolaoPress}>
					<LinearGradient
						colors={['#023697', '#011B5E', '#00E878']}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.bolaoBanner}
					>
						<View style={styles.bannerContent}>
							<View style={styles.bannerTextBlock}>
								<Text style={styles.bannerTitle}>⚽ Bolão Copa 2026</Text>
								<Text style={styles.bannerSubtitle}>
									Faça seus palpites e concorra a prêmios!
								</Text>
							</View>
							<View style={styles.bannerIcon}>
								<Trophy size={RFValue(28)} color="#FFD700" strokeWidth={2} />
							</View>
						</View>
						<View style={styles.bannerCta}>
							<Text style={styles.bannerCtaText}>Participar →</Text>
						</View>
					</LinearGradient>
				</TouchableOpacity>
			</View>

			<UpcomingMatches matches={UPCOMING_MATCHES} onMatchPress={handleMatchPress} />
			<View style={styles.bottomSpacer} />
		</>
	);
}

const styles = StyleSheet.create({
	bannerWrapper: {
		paddingHorizontal: RFValue(16),
		marginBottom: RFValue(8),
	},
	bolaoBanner: {
		borderRadius: RFValue(14),
		padding: RFValue(16),
		overflow: 'hidden',
	},
	bannerContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	bannerTextBlock: {
		flex: 1,
		gap: RFValue(4),
	},
	bannerTitle: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(16),
		color: '#FFFFFF',
	},
	bannerSubtitle: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		color: 'rgba(255,255,255,0.8)',
	},
	bannerIcon: {
		width: RFValue(48),
		height: RFValue(48),
		borderRadius: RFValue(24),
		backgroundColor: 'rgba(255,255,255,0.1)',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: RFValue(12),
	},
	bannerCta: {
		marginTop: RFValue(12),
		backgroundColor: 'rgba(255,255,255,0.15)',
		borderRadius: RFValue(8),
		paddingVertical: RFValue(8),
		alignItems: 'center',
	},
	bannerCtaText: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(13),
		color: '#FFFFFF',
	},
	bottomSpacer: {
		height: RFValue(16),
	},
});
