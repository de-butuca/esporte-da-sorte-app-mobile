import React from 'react';
import { ScrollView } from 'react-native';
import { UpcomingMatches } from './components/UpcomingMatches';
import { LiveMatches } from './components/LiveMatches';
import { PopularMarkets } from './components/PopularMarkets';
import { Match } from './components/MatchCard';

import IconsStores from '@assets/images/avatar-stores.png';

const UPCOMING_MATCHES: Match[] = [
	{ id: '1', homeTeam: 'BRA', awayTeam: 'ARG', scheduledAt: 'Qua, 21:45', thumbnail: IconsStores },
	{ id: '2', homeTeam: 'BRA', awayTeam: 'ARG', scheduledAt: 'Qua, 21:45', thumbnail: IconsStores },
	{ id: '3', homeTeam: 'BRA', awayTeam: 'ARG', scheduledAt: 'Qua, 21:45', thumbnail: IconsStores },
	{ id: '4', homeTeam: 'BRA', awayTeam: 'ARG', scheduledAt: 'Qua, 21:45', thumbnail: IconsStores },
	{ id: '5', homeTeam: 'BRA', awayTeam: 'ARG', scheduledAt: 'Qua, 21:45', thumbnail: IconsStores },
];

const LIVE_MATCHES = [
	{ id: '1', homeTeam: 'Inter', awayTeam: 'Grêmio', league: 'Gaúcho', odds: 2.85 },
	{ id: '2', homeTeam: 'Flamengo', awayTeam: 'Vasco', league: 'Carioca', odds: 1.95 },
	{ id: '3', homeTeam: 'Corinthians', awayTeam: 'Palmeiras', league: 'Brasileiro', odds: 3.20 },
];

const POPULAR_MARKETS = [
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

export function HomeEsportes() {
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<UpcomingMatches matches={UPCOMING_MATCHES} />
			<LiveMatches matches={LIVE_MATCHES} />
			<PopularMarkets markets={POPULAR_MARKETS} />
		</ScrollView>
	);
}
