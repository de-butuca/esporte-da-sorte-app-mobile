import { useEffect, useRef, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useAppNavigation } from '@/navigation/hooks';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { getTeamBackground } from './backgroundMap';

interface ReelsMatch {
	id: string;
	leagueName: string;
	homeTeam: string;
	awayTeam: string;
	scheduledAt: string;
	location?: string;
	broadcast?: string;
	countdownMinutes?: number;
	backgroundImage: ImageSourcePropType;
}

// Mock data with real Brazilian teams (matched to implemented backgrounds)
const MOCK_MATCHES = [
	{
		id: 'match-1',
		leagueName: 'Campeonato Brasileiro',
		homeTeam: 'Corinthians',
		awayTeam: 'Palmeiras',
		location: 'Neo Química Arena, São Paulo',
		broadcast: 'Transmissão: Globo',
		countdownMinutes: 45,
	},
	{
		id: 'match-2',
		leagueName: 'Campeonato Brasileiro',
		homeTeam: 'São Paulo',
		awayTeam: 'Santos',
		location: 'Morumbi, São Paulo',
		broadcast: 'Transmissão: Premiere',
		countdownMinutes: 90,
	},
	{
		id: 'match-3',
		leagueName: 'Campeonato Brasileiro',
		homeTeam: 'Grêmio',
		awayTeam: 'Juventude',
		location: 'Arena do Grêmio, Porto Alegre',
		broadcast: 'Transmissão: ESPN',
		countdownMinutes: 120,
	},
	{
		id: 'match-4',
		leagueName: 'Campeonato Brasileiro',
		homeTeam: 'Internacional',
		awayTeam: 'Grêmio',
		location: 'Estádio Beira-Rio, Porto Alegre',
		broadcast: 'Transmissão: Sportv',
		countdownMinutes: 60,
	},
	{
		id: 'match-5',
		leagueName: 'Campeonato Brasileiro',
		homeTeam: 'Palmeiras',
		awayTeam: 'São Paulo',
		location: 'Allianz Parque, São Paulo',
		broadcast: 'Transmissão: Globo',
		countdownMinutes: 75,
	},
];

async function getReelsMatches() {
	// Using mock data instead of API
	return MOCK_MATCHES.map((match) => ({
		...match,
		scheduledAt: new Date().toISOString(),
		backgroundImage: getTeamBackground(match.homeTeam), // Uses team-specific background
	})) as ReelsMatch[];
}

export function useReelsEsportesViewModel() {
	const navigation = useAppNavigation();
	const { requireAuth } = useRequireAuth();
	const [currentIndex, setCurrentIndex] = useState(0);
	const autoPlayTimerRef = useRef<any>();

	const query = useQuery({
		queryKey: ['reels-esportes'],
		queryFn: getReelsMatches,
	});

	const matches = query.data ?? [];
	const currentMatch = matches[currentIndex];

	const startAutoPlay = () => {
		autoPlayTimerRef.current = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % matches.length);
		}, 5000); // Change reel every 5 seconds
	};

	const stopAutoPlay = () => {
		if (autoPlayTimerRef.current) {
			clearInterval(autoPlayTimerRef.current);
		}
	};

	useEffect(() => {
		if (matches.length > 0) {
			startAutoPlay();
			return () => stopAutoPlay();
		}
	}, [matches.length]);

	function handlePreviousMatch() {
		stopAutoPlay();
		setCurrentIndex((prev) => (prev === 0 ? matches.length - 1 : prev - 1));
		startAutoPlay();
	}

	function handleNextMatch() {
		stopAutoPlay();
		setCurrentIndex((prev) => (prev + 1) % matches.length);
		startAutoPlay();
	}

	function handleDismiss() {
		stopAutoPlay();
		navigation.goBack();
	}

	function handleSetReminder() {
		if (!currentMatch) return;
		// Handled by useMatchReminder hook in the component
	}

	function handleBetNow() {
		if (!currentMatch) return;
		requireAuth(() => {
			// TODO: Navigate to betting screen
			console.log(`Bet on ${currentMatch.homeTeam} vs ${currentMatch.awayTeam}`);
		});
	}

	return {
		currentMatch,
		currentIndex,
		matches,
		isLoading: query.isLoading,
		isError: query.isError,
		canGoPrevious: currentIndex > 0,
		canGoNext: currentIndex < matches.length - 1,
		handlePreviousMatch,
		handleNextMatch,
		handleDismiss,
		handleSetReminder,
		handleBetNow,
	};
}

export type { ReelsMatch };
