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
	width = RFValue(130),
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
		gap: RFValue(6),
	},
	thumbnail: {
		height: RFValue(130),
		borderRadius: RFValue(16),
		overflow: 'hidden',
		backgroundColor: lightColors.bgCard,
	},
	thumbnailImage: {
		width: '100%',
		height: '100%',
	},
	badge: {
		position: 'absolute',
		top: RFValue(8),
		left: RFValue(8),
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: RFValue(8),
		paddingVertical: RFValue(4),
		borderRadius: RFValue(8),
		gap: RFValue(4),
	},
	badgeLive: {
		backgroundColor: lightColors.live,
	},
	liveIndicator: {
		width: 5,
		height: 5,
		borderRadius: 3,
		backgroundColor: lightColors.textPrimary,
	},
	badgeLiveText: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(9),
		color: lightColors.textPrimary,
	},
	badgeNew: {
		backgroundColor: lightColors.accent,
	},
	badgeNewText: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(9),
		color: lightColors.bgNav,
	},
	players: {
		position: 'absolute',
		bottom: RFValue(8),
		left: RFValue(8),
		backgroundColor: 'rgba(0,0,0,0.5)',
		paddingHorizontal: RFValue(8),
		paddingVertical: RFValue(3),
		borderRadius: RFValue(20),
	},
	playersText: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(8),
		color: lightColors.textPrimary,
	},
	name: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(11),
		color: lightColors.textPrimary,
	},
	provider: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(9),
		color: lightColors.textMuted,
	},
});
