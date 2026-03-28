import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { GameCard } from './GameCard';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { GAME_ROW_CONTENT_STYLE } from '../homeCassino.styled';
import { CasinoHomeGameViewModel } from '../homeCassino.types';

type Game = CasinoHomeGameViewModel;

interface GameRowProps {
	games: Game[];
	cardWidth?: number;
	onGamePress?: (gameId: string) => void;
}

export function GameRow({ games, cardWidth = RFValue(110), onGamePress }: GameRowProps) {
	const { guardNavigation } = useRequireAuth();

	const handleGamePress = useCallback(
		(game: Game) => {
			const category = game.badge === 'live' ? 'live' : 'casino';
			guardNavigation(category, () => {
				if (onGamePress) onGamePress(game.id);
			});
		},
		[guardNavigation, onGamePress]
	);

	const renderItem = useCallback(
		({ item }: { item: Game }) => (
			<GameCard
				image={item.image}
				name={item.name}
				provider={item.provider}
				badge={item.badge}
				players={item.players}
				width={cardWidth}
				onPress={() => handleGamePress(item)}
			/>
		),
		[cardWidth, handleGamePress]
	);

	const keyExtractor = useCallback((item: Game) => item.id, []);

	return (
		<FlatList
			data={games}
			keyExtractor={keyExtractor}
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={GAME_ROW_CONTENT_STYLE}
			renderItem={renderItem}
		/>
	);
}
