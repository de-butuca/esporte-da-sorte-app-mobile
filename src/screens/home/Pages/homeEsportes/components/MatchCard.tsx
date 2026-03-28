import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily, lightColors } from '@/stampd.config';
import { useNavigation } from '@react-navigation/native';

export interface Match {
	id: string;
	homeTeam: string;
	awayTeam: string;
	scheduledAt: string;
	thumbnail?: ImageSourcePropType;
}

interface MatchCardProps {
	match: Match;
	onPress?: (match: Match) => void;
}

export const MatchCard = React.memo(function MatchCard({ match, onPress }: MatchCardProps) {
	const { navigate } = useNavigation();

	function SendToStores() {
		navigate('ReelsEsportesScreen');
	}
	return (
		<TouchableOpacity style={styles.container} onPress={SendToStores} activeOpacity={0.8}>
			<View style={styles.avatarRing}>
				{match.thumbnail ? (
					<Image source={match.thumbnail} style={styles.thumbnailImage} resizeMode="cover" />
				) : (
					<View style={styles.placeholder} />
				)}
			</View>
			<Text style={styles.label} numberOfLines={1}>
				{match.homeTeam} x {match.awayTeam}
			</Text>
			<Text style={styles.time} numberOfLines={1}>
				{match.scheduledAt}
			</Text>
		</TouchableOpacity>
	);
});

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		width: RFValue(80),
	},
	avatarRing: {
		width: RFValue(64),
		height: RFValue(64),
		borderRadius: RFValue(999),
		borderWidth: 2.5,
		borderColor: lightColors.accent,
		overflow: 'hidden',
		marginBottom: RFValue(4),
		backgroundColor: lightColors.bgCard,
	},
	thumbnailImage: {
		width: '100%',
		height: '100%',
	},
	placeholder: {
		width: '100%',
		height: '100%',
		backgroundColor: lightColors.bgCard,
	},
	label: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(10),
		color: lightColors.textPrimary,
		textAlign: 'center',
	},
	time: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(10),
		color: lightColors.textMuted,
		textAlign: 'center',
	},
});
