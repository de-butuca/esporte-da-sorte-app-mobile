import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { Image } from 'expo-image';
import { Styled } from 'stampd/styled';
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

const AVATAR_SIZE = 64;

const MCS = {
	container: Styled.TouchableOpacity({
		style: {
			alignItems: 'center',

			width: 80,
		},
		attrs: { activeOpacity: 0.8 },
	}),

	avatarRing: Styled.View({
		style: ({ theme }) => ({
			width: AVATAR_SIZE,
			height: AVATAR_SIZE,
			borderRadius: theme.radius.roundedFull,
			borderWidth: 2.5,
			borderColor: theme.colors.accent,
			overflow: 'hidden',
			marginBottom: theme.size.s1,
		}),
	}),

	placeholder: Styled.View({
		style: ({ theme }) => ({
			width: '100%',
			height: '100%',
			backgroundColor: theme.colors.bgCard,
		}),
	}),

	label: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: theme.fonts.sizes.xs,
			color: theme.colors.textPrimary,
			textAlign: 'center',
		}),
	}),

	time: Styled.Text({
		style: ({ theme }) => ({
			fontSize: 10,
			color: theme.colors.textMuted,
			textAlign: 'center',
		}),
	}),
};

export const MatchCard = React.memo(function MatchCard({ match, onPress }: MatchCardProps) {
	const { navigate } = useNavigation();

	function SendToStores() {
		navigate('ReelsEsportesScreen');
	}
	return (
		<MCS.container onPress={SendToStores}>
			<MCS.avatarRing>
				{match.thumbnail ? (
					<Image source={match.thumbnail} style={{ width: '100%', height: '100%' }} contentFit="cover" />
				) : (
					<MCS.placeholder />
				)}
			</MCS.avatarRing>
			<MCS.label numberOfLines={1}>
				{match.homeTeam} x {match.awayTeam}
			</MCS.label>
			<MCS.time numberOfLines={1}>{match.scheduledAt}</MCS.time>
		</MCS.container>
	);
});
