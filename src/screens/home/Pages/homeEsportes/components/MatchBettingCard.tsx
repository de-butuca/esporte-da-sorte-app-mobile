import React from 'react';
import { Styled } from 'stampd/styled';
import { Bell } from 'lucide-react-native';
import { lightColors } from '@/stampd.config';

interface MatchBettingOdds {
	label: string;
	odds: number;
}

interface MatchBettingCardProps {
	time: string;
	homeTeam: string;
	awayTeam: string;
	competition: string;
	odds: MatchBettingOdds[];
}

const MBC = {
	container: Styled.View({
		style: ({ theme }) => ({
			paddingHorizontal: theme.spacing.p4,
			paddingVertical: theme.spacing.p3,
			backgroundColor: theme.colors.bgCard,
			borderRadius: theme.radius.roundedMd,
			marginHorizontal: theme.spacing.p4,
			marginVertical: theme.spacing.p2,
		}),
	}),

	header: Styled.View({
		style: ({ theme }) => ({
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: theme.spacing.p3,
		}),
	}),

	timeText: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.xs,
			color: theme.colors.textMuted,
			fontFamily: theme.fonts.family.medium,
		}),
	}),

	matchInfo: Styled.View({
		style: ({ theme }) => ({
			marginBottom: theme.spacing.p3,
			gap: theme.spacing.p1,
		}),
	}),

	teamsRow: Styled.View({
		style: { flexDirection: 'row', alignItems: 'center', gap: 8 },
	}),

	teamText: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.base,
			color: theme.colors.textPrimary,
			fontFamily: theme.fonts.family.bold,
			flex: 1,
		}),
	}),

	competition: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.xs,
			color: theme.colors.textMuted,
		}),
	}),

	oddsRow: Styled.View({
		style: { flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
	}),

	oddButton: Styled.TouchableOpacity({
		style: ({ theme }) => ({
			flex: 1,
			paddingVertical: theme.spacing.p2,
			paddingHorizontal: theme.spacing.p2,
			backgroundColor: 'rgba(56, 230, 125, 0.1)',
			borderRadius: theme.radius.roundedSm,
			alignItems: 'center',
		}),
		attrs: { activeOpacity: 0.7 },
	}),

	oddLabel: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.xs,
			color: theme.colors.textSecondary,
		}),
	}),

	oddValue: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.base,
			fontFamily: theme.fonts.family.bold,
			color: theme.colors.accent,
			marginTop: 4,
		}),
	}),
};

export function MatchBettingCard({ time, homeTeam, awayTeam, competition, odds }: MatchBettingCardProps) {
	return (
		<MBC.container>
			<MBC.header>
				<MBC.timeText>{time}</MBC.timeText>
				<Bell size={18} color={lightColors.textMuted} strokeWidth={1.8} />
			</MBC.header>

			<MBC.matchInfo>
				<MBC.teamsRow>
					<MBC.teamText numberOfLines={1}>{homeTeam}</MBC.teamText>
				</MBC.teamsRow>
				<MBC.teamsRow>
					<MBC.teamText numberOfLines={1}>{awayTeam}</MBC.teamText>
				</MBC.teamsRow>
				<MBC.competition>{competition}</MBC.competition>
			</MBC.matchInfo>

			<MBC.oddsRow>
				{odds.map((odd, index) => (
					<MBC.oddButton key={index} onPress={() => {}}>
						<MBC.oddLabel>{odd.label}</MBC.oddLabel>
						<MBC.oddValue>{odd.odds.toFixed(2)}</MBC.oddValue>
					</MBC.oddButton>
				))}
			</MBC.oddsRow>
		</MBC.container>
	);
}
