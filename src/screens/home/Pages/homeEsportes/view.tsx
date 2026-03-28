import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy } from 'lucide-react-native';
import { lightColors, fontFamily } from '@/stampd.config';
import { ScrollView } from 'react-native';
import { UpcomingMatches } from './components/UpcomingMatches';
import { LiveMatches } from './components/LiveMatches';
import { PopularMarkets } from './components/PopularMarkets';
import { MatchBettingSection } from './components/MatchBettingSection';
import { Match } from './components/MatchCard';
import { useAppNavigation } from '@/navigation/hooks';

import IconsStores from '@assets/images/avatar-stores.png';

const UPCOMING_MATCHES_CAROUSEL: Match[] = [
	{ id: '1', homeTeam: 'BRA', awayTeam: 'ARG', scheduledAt: 'Qua, 21:45', thumbnail: IconsStores },
	{ id: '2', homeTeam: 'BRA', awayTeam: 'ARG', scheduledAt: 'Qua, 21:45', thumbnail: IconsStores },
	{ id: '3', homeTeam: 'BRA', awayTeam: 'ARG', scheduledAt: 'Qua, 21:45', thumbnail: IconsStores },
	{ id: '4', homeTeam: 'BRA', awayTeam: 'ARG', scheduledAt: 'Qua, 21:45', thumbnail: IconsStores },
	{ id: '5', homeTeam: 'BRA', awayTeam: 'ARG', scheduledAt: 'Qua, 21:45', thumbnail: IconsStores },
];

const LIVE_MATCHES_CAROUSEL = [
	{ id: '1', homeTeam: 'Inter', awayTeam: 'Grêmio', league: 'Gaúcho', odds: 2.85 },
	{ id: '2', homeTeam: 'Flamengo', awayTeam: 'Vasco', league: 'Carioca', odds: 1.95 },
	{ id: '3', homeTeam: 'Corinthians', awayTeam: 'Palmeiras', league: 'Brasileiro', odds: 3.2 },
];

const POPULAR_MARKETS_DATA = [
	{
		id: '1',
		title: 'Brasileirão - Artilheiro do campeonato',
		options: [
			{ label: 'Vegetti', odds: 5.0 },
			{ label: 'Pedro', odds: 3.5 },
			{ label: 'Vegetti', odds: 5.0 },
			{ label: 'Pedro', odds: 3.5 },
		],
	},
	{
		id: '2',
		title: 'Brasileirão - Top 4 Rebaixamento',
		options: [
			{ label: 'Sim', odds: 1.8 },
			{ label: 'Não', odds: 2.1 },
			{ label: 'Sim', odds: 1.8 },
			{ label: 'Não', odds: 2.1 },
		],
	},
];

const LIVE_MATCHES = [
	{
		id: '1',
		time: '28/03 16:30',
		homeTeam: 'EUA',
		awayTeam: 'Bélgica',
		competition: 'Jogos Amistosos',
		odds: [
			{ label: '1', odds: 3.0 },
			{ label: 'X', odds: 3.4 },
			{ label: '2', odds: 2.35 },
		],
	},
	{
		id: '2',
		time: '28/03 14:00',
		homeTeam: 'Escócia',
		awayTeam: 'Japão',
		competition: 'Jogos Amistosos',
		odds: [
			{ label: '1', odds: 3.1 },
			{ label: 'X', odds: 3.3 },
			{ label: '2', odds: 2.25 },
		],
	},
];

const UPCOMING_MATCHES = [
	{
		id: '3',
		time: '29/03 20:00',
		homeTeam: 'França',
		awayTeam: 'Itália',
		competition: 'Qualificatória Euro 2024',
		odds: [
			{ label: '1', odds: 2.1 },
			{ label: 'X', odds: 3.5 },
			{ label: '2', odds: 3.8 },
		],
	},
	{
		id: '4',
		time: '29/03 19:45',
		homeTeam: 'Alemanha',
		awayTeam: 'Holanda',
		competition: 'Amistoso Internacional',
		odds: [
			{ label: '1', odds: 2.3 },
			{ label: 'X', odds: 3.2 },
			{ label: '2', odds: 3.5 },
		],
	},
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
		<ScrollView showsVerticalScrollIndicator={false}>
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
								<Text style={styles.bannerSubtitle}>Faça seus palpites e concorra a prêmios!</Text>
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
			<UpcomingMatches matches={UPCOMING_MATCHES_CAROUSEL} />
			<LiveMatches matches={LIVE_MATCHES_CAROUSEL} />
			<PopularMarkets markets={POPULAR_MARKETS_DATA} />
			<MatchBettingSection liveMatches={LIVE_MATCHES} upcomingMatches={UPCOMING_MATCHES} />
		</ScrollView>
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
