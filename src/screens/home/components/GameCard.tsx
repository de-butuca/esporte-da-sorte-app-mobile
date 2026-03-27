import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily } from '@/theme/design-tokens';

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

export function GameCard({
	image,
	name,
	provider,
	badge = 'none',
	players,
	width = RFValue(130),
	onPress,
}: GameCardProps) {
	return (
		<TouchableOpacity style={[styles.container, { width }]} activeOpacity={0.8} onPress={onPress}>
			<View style={[styles.thumbnail, { width }]}>
				<Image source={image} style={styles.thumbnailImage} resizeMode="cover" />
				{badge === 'live' && (
					<View style={[styles.badge, styles.badgeLive]}>
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
			<Text style={styles.name} numberOfLines={1}>
				{name}
			</Text>
			<Text style={styles.provider}>{provider}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: RFValue(6),
	},
	thumbnail: {
		height: RFValue(130),
		borderRadius: RFValue(10),
		overflow: 'hidden',
		backgroundColor: '#0A0F2E',
	},
	thumbnailImage: {
		width: '100%',
		height: '100%',
	},
	badge: {
		position: 'absolute',
		top: RFValue(8),
		left: RFValue(8),
		paddingHorizontal: RFValue(8),
		paddingVertical: RFValue(3),
		borderRadius: RFValue(6),
	},
	badgeLive: {
		backgroundColor: '#FF3B3B',
	},
	badgeLiveText: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(9),
		color: '#FFFFFF',
	},
	badgeNew: {
		backgroundColor: '#38E67D',
	},
	badgeNewText: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(9),
		color: '#02003D',
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
		color: '#FFFFFF',
	},
	name: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(11),
		color: '#FFFFFF',
	},
	provider: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(9),
		color: '#F0F0F0',
	},
});
