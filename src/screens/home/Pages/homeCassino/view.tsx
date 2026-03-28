import { useCallback } from 'react';
import { ImageSourcePropType } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BannerCarousel } from './components/BannerCarousel';
import { GameRow } from './components/GameRow';
import { PromoBanner } from './components/PromoBanner';
import { SectionHeader } from '../../../../components/SectionHeader';
import { useAuthGuard } from '@/core/auth/useAuthGuard';
import { HCS } from './homeCassino.styled';
import {
	mockIframeGameList,
	mockReservedGames,
} from '../../../../../backend/mocks/casino.mocks';

const GAME_THUMBS: ImageSourcePropType[] = [
	require('@assets/images/games/game-thumbnail-1.png'),
	require('@assets/images/games/game-thumbnail-2.png'),
	require('@assets/images/games/game-thumbnail-3.png'),
];

type HomeGame = {
	id: string;
	name: string;
	provider: string;
	image: ImageSourcePropType;
	badge?: 'live' | 'new' | 'none';
	players?: string;
};

function buildHomeGames() {
	const allGames: (HomeGame & { gameId: number })[] = [];

	mockIframeGameList.data?.forEach((record) => {
		const providerName = record.provider?.name ?? '';
		record.games?.forEach((game) => {
			const id = game.gameId ?? 0;
			const reserved = mockReservedGames.games?.find((g) => g.id === id);

			let badge: 'live' | 'new' | 'none' = 'none';
			if (reserved?.gameDetails?.dealer) badge = 'live';
			else if (reserved?.newGame) badge = 'new';

			const playerCount = Math.floor(Math.random() * 3000) + 200;
			const players = playerCount >= 1000
				? `${(playerCount / 1000).toFixed(1)}k online`
				: `${playerCount} online`;

			allGames.push({
				gameId: id,
				id: String(id),
				name: game.gameName ?? '',
				provider: providerName,
				image: GAME_THUMBS[id % GAME_THUMBS.length],
				badge,
				players,
			});
		});
	});

	return allGames;
}

const ALL_GAMES = buildHomeGames();

const LIVE_GAMES: HomeGame[] = ALL_GAMES.filter((g) => g.badge === 'live');
const TRENDING_GAMES: HomeGame[] = ALL_GAMES.filter((g) => {
	const reserved = mockReservedGames.games?.find((r) => r.id === g.gameId);
	return reserved?.popular && g.badge !== 'live';
});
const NEW_GAMES: HomeGame[] = ALL_GAMES.filter((g) => g.badge === 'new');

export function HomeCassino() {
	const { requireAuth } = useAuthGuard('cassino');

	const handleGamePress = useCallback(
		(gameId: string) => {
			requireAuth(() => {
				if (__DEV__) console.log('Opening game:', gameId);
			});
		},
		[requireAuth]
	);

	return (
		<>
			<BannerCarousel />
			{LIVE_GAMES.length > 0 && (
				<HCS.section>
					<SectionHeader title="Ao vivo" count={LIVE_GAMES.length} hasLive />
					<GameRow games={LIVE_GAMES} cardWidth={RFValue(95)} onGamePress={handleGamePress} />
				</HCS.section>
			)}
			{TRENDING_GAMES.length > 0 && (
				<HCS.section>
					<SectionHeader title="Cassino em alta" count={TRENDING_GAMES.length} />
					<GameRow games={TRENDING_GAMES} onGamePress={handleGamePress} />
				</HCS.section>
			)}
			<PromoBanner />
			{NEW_GAMES.length > 0 && (
				<HCS.section>
					<SectionHeader title="Novos cassinos" count={NEW_GAMES.length} />
					<GameRow games={NEW_GAMES} onGamePress={handleGamePress} />
				</HCS.section>
			)}
			<HCS.bottomSpacer />
		</>
	);
}
