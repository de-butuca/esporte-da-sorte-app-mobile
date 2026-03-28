import React from 'react';
import { Styled } from 'stampd/styled';

interface LiveMatchCardProps {
	homeTeam: string;
	awayTeam: string;
	league: string;
	odds: number;
}

const LMC = {
	container: Styled.View({
		style: ({ theme }) => ({
			width: 280,
			flexDirection: 'row',
			alignItems: 'center',
			gap: theme.spacing.p3,
			paddingHorizontal: theme.spacing.p3,
			paddingVertical: theme.spacing.p4,
			backgroundColor: theme.colors.bgCard,
			borderRadius: theme.radius.roundedMd,
		}),
	}),

	matchInfo: Styled.View({
		style: ({ theme }) => ({
			flex: 1,
			gap: theme.spacing.p1,
		}),
	}),

	matchup: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: theme.fonts.sizes.base,
			color: theme.colors.textPrimary,
		}),
	}),

	league: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.xs,
			color: theme.colors.textMuted,
		}),
	}),

	oddsBadge: Styled.View({
		style: ({ theme }) => ({
			backgroundColor: theme.colors.accent,
			paddingHorizontal: theme.spacing.p3,
			paddingVertical: theme.spacing.p2,
			borderRadius: theme.radius.roundedSm,
			justifyContent: 'center',
			alignItems: 'center',
		}),
	}),

	oddsText: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: theme.fonts.sizes.base,
			color: theme.colors.background,
		}),
	}),
};

export function LiveMatchCard({ homeTeam, awayTeam, league, odds }: LiveMatchCardProps) {
	return (
		<LMC.container>
			<LMC.matchInfo>
				<LMC.matchup>
					{homeTeam} x {awayTeam}
				</LMC.matchup>
				<LMC.league>{league}</LMC.league>
			</LMC.matchInfo>
			<LMC.oddsBadge>
				<LMC.oddsText>{odds.toFixed(2)}</LMC.oddsText>
			</LMC.oddsBadge>
		</LMC.container>
	);
}
