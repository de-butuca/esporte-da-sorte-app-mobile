import { useCallback } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { BannerCarousel } from './components/BannerCarousel';
import { GameRow } from './components/GameRow';
import { PromoBanner } from './components/PromoBanner';
import { SectionHeader } from '../../../../components/SectionHeader';
import { useAuthGuard } from '@/core/auth/useAuthGuard';
import { HCS } from './homeCassino.styled';

const GAME_THUMB_1 = require('@assets/images/games/game-thumbnail-1.png');
const GAME_THUMB_2 = require('@assets/images/games/game-thumbnail-2.png');
const GAME_THUMB_3 = require('@assets/images/games/game-thumbnail-3.png');

const LIVE_GAMES = [
	{ id: '1', name: 'Bac bo', provider: 'Fatec', image: GAME_THUMB_3, badge: 'live' as const, players: '1.2k online' },
	{ id: '2', name: 'Bac bo', provider: 'Fatec', image: GAME_THUMB_3, badge: 'live' as const, players: '1.2k online' },
	{ id: '3', name: 'Bac bo', provider: 'Fatec', image: GAME_THUMB_3, badge: 'live' as const, players: '1.2k online' },
	{ id: '4', name: 'Bac bo', provider: 'Fatec', image: GAME_THUMB_3, badge: 'live' as const, players: '1.2k online' },
	{ id: '5', name: 'Bac bo', provider: 'Fatec', image: GAME_THUMB_3, badge: 'live' as const, players: '1.2k online' },
];

const TRENDING_GAMES = [
	{ id: '1', name: 'Choice gaming', provider: 'Maua', image: GAME_THUMB_1, players: '1.2k online' },
	{ id: '2', name: 'Choice gaming', provider: 'Maua', image: GAME_THUMB_1, players: '1.2k online' },
	{ id: '3', name: 'Choice gaming', provider: 'Maua', image: GAME_THUMB_1, players: '1.2k online' },
	{ id: '4', name: 'Choice gaming', provider: 'Maua', image: GAME_THUMB_1, players: '1.2k online' },
];

const NEW_GAMES = [
	{
		id: '1',
		name: 'Game Name',
		provider: 'Provider',
		image: GAME_THUMB_2,
		badge: 'new' as const,
		players: '1.2k online',
	},
	{
		id: '2',
		name: 'Game Name',
		provider: 'Provider',
		image: GAME_THUMB_2,
		badge: 'new' as const,
		players: '1.2k online',
	},
	{
		id: '3',
		name: 'Game Name',
		provider: 'Provider',
		image: GAME_THUMB_2,
		badge: 'new' as const,
		players: '1.2k online',
	},
	{
		id: '4',
		name: 'Game Name',
		provider: 'Provider',
		image: GAME_THUMB_2,
		badge: 'new' as const,
		players: '1.2k online',
	},
];

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
			<HCS.section>
				<SectionHeader title="Ao vivo" count={12} hasLive />
				<GameRow games={LIVE_GAMES} cardWidth={RFValue(95)} onGamePress={handleGamePress} />
			</HCS.section>
			<HCS.section>
				<SectionHeader title="Cassino em alta" count={12} />
				<GameRow games={TRENDING_GAMES} onGamePress={handleGamePress} />
			</HCS.section>
			<PromoBanner />
			<HCS.section>
				<SectionHeader title="Novos cassinos" count={12} />
				<GameRow games={NEW_GAMES} onGamePress={handleGamePress} />
			</HCS.section>
			<HCS.bottomSpacer />
		</>
	);
}
