import { useCallback, useMemo, useState } from 'react';
import { useAppNavigation } from '@/navigation/hooks';
import type { SearchGame } from './search-games.types';

const GAME_THUMB_1 = require('@assets/images/games/game-thumbnail-1.png');
const GAME_THUMB_2 = require('@assets/images/games/game-thumbnail-2.png');
const GAME_THUMB_3 = require('@assets/images/games/game-thumbnail-3.png');

const MOCK_GAMES: SearchGame[] = [
	{ id: '1', name: 'Sticky Bandits', provider: 'Quickspin', image: GAME_THUMB_1, badge: 'none' },
	{ id: '2', name: 'CashBack Blackjack', provider: 'Betano', image: GAME_THUMB_2, badge: 'exclusivo' },
	{ id: '3', name: 'FlyX', provider: 'Turbo Games', image: GAME_THUMB_3, badge: 'exclusivo' },
	{ id: '4', name: 'Artemis vs Medusa', provider: 'Quickspin', image: GAME_THUMB_1, badge: 'none' },
	{ id: '5', name: 'Gold Blitz', provider: 'Fortune Factory', image: GAME_THUMB_2, badge: 'compra_bonus' },
	{ id: '6', name: 'Betano Mines', provider: 'Betano', image: GAME_THUMB_3, badge: 'exclusivo' },
	{ id: '7', name: 'Black Bull', provider: 'Pragmatic Play', image: GAME_THUMB_1, badge: 'none' },
	{ id: '8', name: 'Iron Bank', provider: 'Relax Gaming', image: GAME_THUMB_2, badge: 'compra_bonus' },
	{ id: '9', name: 'Blue Slot', provider: 'Fazi', image: GAME_THUMB_3, badge: 'none' },
	{ id: '10', name: 'Hit Slot', provider: 'Endorphina', image: GAME_THUMB_1, badge: 'compra_bonus' },
	{ id: '11', name: 'Sweet Bonanza', provider: 'Pragmatic Play', image: GAME_THUMB_2, badge: 'none' },
	{ id: '12', name: 'Gates of Olympus', provider: 'Pragmatic Play', image: GAME_THUMB_3, badge: 'exclusivo' },
];

export function useSearchGamesViewModel() {
	const { goBack } = useAppNavigation();
	const [searchValue, setSearchValue] = useState('');

	const filteredGames = useMemo(() => {
		if (!searchValue.trim()) return MOCK_GAMES;
		const q = searchValue.trim().toLowerCase();
		return MOCK_GAMES.filter(
			(g) =>
				g.name.toLowerCase().includes(q) ||
				g.provider.toLowerCase().includes(q)
		);
	}, [searchValue]);

	const handleBack = useCallback(() => goBack(), [goBack]);
	const handleClearSearch = useCallback(() => setSearchValue(''), []);

	return {
		searchValue,
		filteredGames,
		handleSearchChange: setSearchValue,
		handleClearSearch,
		handleBack,
	};
}
