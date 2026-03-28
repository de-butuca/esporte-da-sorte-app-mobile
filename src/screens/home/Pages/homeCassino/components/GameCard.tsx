import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily } from '@/stampd.config';
import { useAuthThemeStore } from '@/core/auth/useAuthThemeStore';

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
	const colors = useAuthThemeStore((s) => s.colors);
	const containerStyle = useMemo(() => [styles.container, { width }], [width]);
	const thumbnailStyle = useMemo(() => [styles.thumbnail, { width, backgroundColor: colors.bgCard }], [width, colors.bgCard]);

	return (
		<TouchableOpacity
			style={containerStyle}
			activeOpacity={0.8}
			onPress={onPress}
		>
			<View style={thumbnailStyle}>
				<Image source={image} style={styles.thumbnailImage} contentFit="cover" />
				{badge === 'live' && (
					<View style={[styles.badge, { backgroundColor: colors.live }]}>
						<View style={[styles.liveIndicator, { backgroundColor: colors.textPrimary }]} />
						<Text style={[styles.badgeLiveText, { color: colors.textPrimary }]}>Ao vivo</Text>
					</View>
				)}
				{badge === 'new' && (
					<View style={[styles.badge, { backgroundColor: colors.accent }]}>
						<Text style={[styles.badgeNewText, { color: colors.bgNav }]}>Novo</Text>
					</View>
				)}
				{players && (
					<View style={styles.players}>
						<Text style={[styles.playersText, { color: colors.textPrimary }]}>{players}</Text>
					</View>
				)}
			</View>
			<Text style={[styles.name, { color: colors.textPrimary }]} numberOfLines={1}>{name}</Text>
			<Text style={[styles.provider, { color: colors.textMuted }]} numberOfLines={1}>{provider}</Text>
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
	liveIndicator: {
		width: 4,
		height: 4,
		borderRadius: 2,
	},
	badgeLiveText: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(8),
	},
	badgeNewText: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(8),
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
	},
	name: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(10),
	},
	provider: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(8),
	},
});
