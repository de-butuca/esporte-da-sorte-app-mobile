import { useCallback, useMemo, useRef, useState } from 'react';
import { useAppNavigation } from '@/navigation/hooks';
import type { BottomSheetMethods } from '@/components/BottomSheet';
import type { SearchGame } from './search-games.types';

const GAME_THUMB_1 = require('@assets/images/games/game-thumbnail-1.png');
const GAME_THUMB_2 = require('@assets/images/games/game-thumbnail-2.png');
const GAME_THUMB_3 = require('@assets/images/games/game-thumbnail-3.png');

const MOCK_GAMES: SearchGame[] = [
	{
		id: '1', name: 'Sticky Bandits', provider: 'Quickspin', image: GAME_THUMB_1, badge: 'none',
		tags: ['expansão_de_símbolos', 'faroeste', 'linhas_de_pagamento_fixas', 'mega_símbolos', 'respin', 'rodada_grátis', 'scatter', 'transportes'],
		volatility: 'high', rtp: '96,58%', lines: 5, reels: 5,
	},
	{
		id: '2', name: 'CashBack Blackjack', provider: 'Betano', image: GAME_THUMB_2, badge: 'exclusivo',
		tags: ['cartas', 'blackjack', 'cashback'], volatility: 'low', rtp: '99,50%', lines: 1, reels: 0,
	},
	{
		id: '3', name: 'FlyX', provider: 'Turbo Games', image: GAME_THUMB_3, badge: 'exclusivo',
		tags: ['crash', 'multiplicador', 'aviação'], volatility: 'high', rtp: '97,00%', lines: 0, reels: 0,
	},
	{
		id: '4', name: 'Artemis vs Medusa', provider: 'Quickspin', image: GAME_THUMB_1, badge: 'none',
		tags: ['mitologia', 'rodada_grátis', 'wild'], volatility: 'medium', rtp: '96,17%', lines: 20, reels: 5,
	},
	{
		id: '5', name: 'Gold Blitz', provider: 'Fortune Factory', image: GAME_THUMB_2, badge: 'compra_bonus',
		tags: ['jackpot', 'ouro', 'compra_bonus'], volatility: 'high', rtp: '95,50%', lines: 10, reels: 5,
	},
	{
		id: '6', name: 'Betano Mines', provider: 'Betano', image: GAME_THUMB_3, badge: 'exclusivo',
		tags: ['minas', 'multiplicador', 'exclusivo'], volatility: 'medium', rtp: '97,00%', lines: 0, reels: 0,
	},
	{
		id: '7', name: 'Black Bull', provider: 'Pragmatic Play', image: GAME_THUMB_1, badge: 'none',
		tags: ['touro', 'collect', 'rodada_grátis'], volatility: 'high', rtp: '96,51%', lines: 25, reels: 5,
	},
	{
		id: '8', name: 'Iron Bank', provider: 'Relax Gaming', image: GAME_THUMB_2, badge: 'compra_bonus',
		tags: ['assalto', 'compra_bonus', 'megaways'], volatility: 'high', rtp: '96,20%', lines: 117649, reels: 6,
	},
	{
		id: '9', name: 'Blue Slot', provider: 'Fazi', image: GAME_THUMB_3, badge: 'none',
		tags: ['clássico', 'frutas', '3_carretéis'], volatility: 'low', rtp: '96,00%', lines: 5, reels: 3,
	},
	{
		id: '10', name: 'Hit Slot', provider: 'Endorphina', image: GAME_THUMB_1, badge: 'compra_bonus',
		tags: ['frutas', 'compra_bonus', 'jackpot'], volatility: 'medium', rtp: '96,00%', lines: 5, reels: 3,
	},
	{
		id: '11', name: 'Sweet Bonanza', provider: 'Pragmatic Play', image: GAME_THUMB_2, badge: 'none',
		tags: ['doces', 'cluster', 'multiplicador', 'tumble'], volatility: 'high', rtp: '96,51%', lines: 0, reels: 6,
	},
	{
		id: '12', name: 'Gates of Olympus', provider: 'Pragmatic Play', image: GAME_THUMB_3, badge: 'exclusivo',
		tags: ['mitologia', 'multiplicador', 'tumble', 'compra_bonus'], volatility: 'high', rtp: '96,50%', lines: 0, reels: 6,
	},
];

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
