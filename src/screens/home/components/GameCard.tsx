import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily, lightColors } from '@/theme/design-tokens';

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
	width = RFValue(110),
	onPress,
}: GameCardProps) {
	const containerStyle = useMemo(() => [styles.container, { width }], [width]);
	const thumbnailStyle = useMemo(() => [styles.thumbnail, { width }], [width]);

	return (
		<TouchableOpacity
			style={containerStyle}
			activeOpacity={0.8}
			onPress={onPress}
		>
			<View style={thumbnailStyle}>
				<Image source={image} style={styles.thumbnailImage} contentFit="cover" />
				{badge === 'live' && (
					<View style={[styles.badge, styles.badgeLive]}>
						<View style={styles.liveIndicator} />
						<Text style={styles.badgeLiveText}>Ao vivo</Text>
					</View>
				)}
				{badge === 'new' && (
					<View style={[styles.badge, styles.badgeNew]}>
						<Text style={styles.badgeNewText}>Novo</Text>
					</View>
				)}
				{players && (
					<View style={styles.players}>
						<Text style={styles.playersText}>{players}</Text>
					</View>
				)}
			</View>
			<Text style={styles.name} numberOfLines={1}>{name}</Text>
			<Text style={styles.provider} numberOfLines={1}>{provider}</Text>
		</TouchableOpacity>
	);
});

const styles = StyleSheet.create({
	container: {
		gap: RFValue(4),
	},
	thumbnail: {
		height: RFValue(95),
		borderRadius: RFValue(10),
		overflow: 'hidden',
		backgroundColor: lightColors.bgCard,
	},
	thumbnailImage: {
		width: '100%',
		height: '100%',
	},
	badge: {
		position: 'absolute',
		top: RFValue(6),
		left: RFValue(6),
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: RFValue(6),
		paddingVertical: RFValue(3),
		borderRadius: RFValue(6),
		gap: RFValue(3),
	},
	badgeLive: {
		backgroundColor: lightColors.live,
	},
	liveIndicator: {
		width: 4,
		height: 4,
		borderRadius: 2,
		backgroundColor: lightColors.textPrimary,
	},
	badgeLiveText: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(8),
		color: lightColors.textPrimary,
	},
	badgeNew: {
		backgroundColor: lightColors.accent,
	},
	badgeNewText: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(8),
		color: lightColors.bgNav,
	},
	players: {
		position: 'absolute',
		bottom: RFValue(6),
		left: RFValue(6),
		backgroundColor: 'rgba(0,0,0,0.5)',
		paddingHorizontal: RFValue(6),
		paddingVertical: RFValue(2),
		borderRadius: RFValue(16),
	},
	playersText: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(7),
		color: lightColors.textPrimary,
	},
	name: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(10),
		color: lightColors.textPrimary,
	},
	provider: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(8),
		color: lightColors.textMuted,
	},
});
