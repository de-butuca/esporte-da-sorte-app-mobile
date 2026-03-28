import { useCallback, useMemo, useRef, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import { useAppNavigation } from '@/navigation/hooks';
import type { BottomSheetMethods } from '@/components/BottomSheet';
import {
	mockIframeGameList,
	mockReservedGames,
	mockCasinoGamesTags,
	mockCasinoTags,
} from '../../../backend/mocks/casino.mocks';
import type { SearchGame, GameBadge, Volatility } from './search-games.types';

const GAME_THUMBS: ImageSourcePropType[] = [
	require('@assets/images/games/game-thumbnail-1.png'),
	require('@assets/images/games/game-thumbnail-2.png'),
	require('@assets/images/games/game-thumbnail-3.png'),
];

// Metadata suplementar por gameId (dados que o backend não fornece)
const GAME_METADATA: Record<number, { volatility?: Volatility; rtp?: string; lines?: number; reels?: number }> = {
	60001: { volatility: 'high', rtp: '96,51%', lines: 0, reels: 6 },      // Sweet Bonanza
	60002: { volatility: 'high', rtp: '96,50%', lines: 0, reels: 6 },      // Gates of Olympus
	60003: { volatility: 'high', rtp: '97,00%', lines: 0, reels: 0 },      // Aviator
	60004: { volatility: 'low', rtp: '97,30%', lines: 0, reels: 0 },       // Lightning Roulette
	60005: { volatility: 'high', rtp: '96,71%', lines: 10, reels: 5 },     // Big Bass Bonanza
	60006: { volatility: 'low', rtp: '96,08%', lines: 0, reels: 0 },       // Crazy Time
	60007: { volatility: 'high', rtp: '97,00%', lines: 0, reels: 0 },      // JetX
	60008: { volatility: 'medium', rtp: '88,12%', lines: 25, reels: 5 },   // Mega Moolah
};

function resolveTagsForGame(gameId: number): string[] {
	const entry = mockCasinoGamesTags.list?.find((g) => g.gameId === gameId);
	if (!entry?.tagIds || !mockCasinoTags.map) return [];
	return entry.tagIds
		.map((id) => mockCasinoTags.map![String(id)])
		.filter(Boolean)
		.map((t) => t.toLowerCase().replace(/\s+/g, '_'));
}

function resolveBadge(gameId: number): GameBadge {
	const reserved = mockReservedGames.games?.find((g) => g.id === gameId);
	if (!reserved) return 'none';
	if (reserved.newGame) return 'novo';
	if (reserved.gameDetails?.dealer) return 'live';
	if (reserved.jackpot) return 'compra_bonus';
	return 'none';
}

function buildGamesFromMock(): SearchGame[] {
	const games: SearchGame[] = [];

	mockIframeGameList.data?.forEach((record) => {
		const providerName = record.provider?.name ?? 'Desconhecido';

		record.games?.forEach((game, idx) => {
			const id = game.gameId ?? 0;
			const meta = GAME_METADATA[id];

			games.push({
				id: String(id),
				name: game.gameName ?? '',
				provider: providerName,
				image: GAME_THUMBS[id % GAME_THUMBS.length],
				badge: resolveBadge(id),
				tags: resolveTagsForGame(id),
				volatility: meta?.volatility,
				rtp: meta?.rtp,
				lines: meta?.lines,
				reels: meta?.reels,
			});
		});
	});

	return games;
}

const MOCK_GAMES: SearchGame[] = buildGamesFromMock();

export function useSearchGamesViewModel() {
	const { goBack } = useAppNavigation();
	const [searchValue, setSearchValue] = useState('');
	const [selectedGame, setSelectedGame] = useState<SearchGame | null>(null);
	const sheetRef = useRef<BottomSheetMethods>(null);

	const filteredGames = useMemo(() => {
		if (!searchValue.trim()) return MOCK_GAMES;
		const q = searchValue.trim().toLowerCase();
		return MOCK_GAMES.filter(
			(g) =>
				g.name.toLowerCase().includes(q) ||
				g.provider.toLowerCase().includes(q)
		);
	}, [searchValue]);

	const similarGames = useMemo(() => {
		if (!selectedGame) return [];
		return MOCK_GAMES.filter((g) => g.id !== selectedGame.id && g.provider === selectedGame.provider).slice(0, 3);
	}, [selectedGame]);

	const handleBack = useCallback(() => goBack(), [goBack]);
	const handleClearSearch = useCallback(() => setSearchValue(''), []);

	const handleOpenGameDetails = useCallback((game: SearchGame) => {
		setSelectedGame(game);
		sheetRef.current?.snapToIndex(0);
	}, []);

	const handleCloseGameDetails = useCallback(() => {
		setSelectedGame(null);
	}, []);

	const handlePlayGame = useCallback(() => {
		if (__DEV__ && selectedGame) console.log('Play game:', selectedGame.id);
	}, [selectedGame]);

	return {
		searchValue,
		filteredGames,
		selectedGame,
		similarGames,
		sheetRef,
		handleSearchChange: setSearchValue,
		handleClearSearch,
		handleBack,
		handleOpenGameDetails,
		handleCloseGameDetails,
		handlePlayGame,
	};
}
