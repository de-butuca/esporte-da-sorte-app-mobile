import React from 'react';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { GCS } from '../homeCassino.styled';

type BadgeType = 'live' | 'new' | 'none';

interface GameCardProps {
	image: ImageSourcePropType;
	name: string;
	provider: string;
	badge?: BadgeType;
	players?: string;
	width?: number;
	onPress?: () => void;
}

export const GameCard = React.memo(function GameCard({
	image,
	name,
	provider,
	badge = 'none',
	players,
	width,
	onPress,
}: GameCardProps) {
	return (
		<GCS.container {...({ width } as any)} onPress={onPress}>
			<GCS.thumbnail {...({ width } as any)}>
				<Image source={image} style={styles.thumbnailImage} contentFit="cover" />
				{badge === 'live' && (
					<GCS.badge type="live">
						<GCS.liveIndicator />
						<GCS.badgeText type="live">Ao vivo</GCS.badgeText>
					</GCS.badge>
				)}
				{badge === 'new' && (
					<GCS.badge type="new">
						<GCS.badgeText type="new">Novo</GCS.badgeText>
					</GCS.badge>
				)}
				{players && (
					<GCS.players>
						<GCS.playersText>{players}</GCS.playersText>
					</GCS.players>
				)}
			</GCS.thumbnail>
			<GCS.name numberOfLines={1}>{name}</GCS.name>
			<GCS.provider numberOfLines={1}>{provider}</GCS.provider>
		</GCS.container>
	);
});

const styles = StyleSheet.create({
	thumbnailImage: {
		width: '100%',
		height: '100%',
	},
});
