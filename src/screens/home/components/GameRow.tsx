import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { GameCard } from './GameCard';

interface Game {
	id: string;
	name: string;
	provider: string;
	image: any;
	badge?: 'live' | 'new' | 'none';
	players?: string;
}

interface GameRowProps {
	games: Game[];
	cardWidth?: number;
}

export function GameRow({ games, cardWidth = RFValue(130) }: GameRowProps) {
	return (
		<FlatList
			data={games}
			keyExtractor={(item) => item.id}
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.content}
			renderItem={({ item }) => (
				<GameCard
					image={item.image}
					name={item.name}
					provider={item.provider}
					badge={item.badge}
					players={item.players}
					width={cardWidth}
				/>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	content: {
		paddingHorizontal: RFValue(20),
		gap: RFValue(12),
	},
});
