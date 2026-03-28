import React from 'react';
import { Styled } from 'stampd/styled';

interface MarketOption {
	label: string;
	odds: number;
}

interface MarketCardProps {
	title: string;
	options: MarketOption[];
}

const MC = {
	container: Styled.View({
		style: ({ theme }) => ({
			paddingHorizontal: theme.spacing.p3,
			paddingVertical: theme.spacing.p4,
			backgroundColor: theme.colors.bgCard,
			borderRadius: theme.radius.roundedMd,

			gap: theme.spacing.p3,
		}),
	}),

	title: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: theme.fonts.sizes.sm,
			color: theme.colors.textSecondary,
		}),
	}),

	optionsGrid: Styled.View({
		style: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
	}),

	optionButton: Styled.TouchableOpacity({
		style: ({ theme }) => ({
			flex: 0.48,
			paddingVertical: theme.spacing.p3,
			paddingHorizontal: theme.spacing.p2,
			backgroundColor: 'rgba(56, 230, 125, 0.1)',
			borderRadius: theme.radius.roundedSm,
			alignItems: 'center',
			gap: theme.spacing.p1,
		}),
		attrs: { activeOpacity: 0.7 },
	}),

	optionLabel: Styled.Text({
		style: ({ theme }) => ({
			fontSize: theme.fonts.sizes.xs,
			color: theme.colors.textSecondary,
			textAlign: 'center',
		}),
	}),

	optionOdds: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: theme.fonts.sizes.base,
			color: theme.colors.accent,
		}),
	}),
};

export function MarketCard({ title, options }: MarketCardProps) {
	return (
		<MC.container>
			<MC.title>{title}</MC.title>
			<MC.optionsGrid>
				{options.map((option, index) => (
					<MC.optionButton key={index} onPress={() => {}}>
						<MC.optionLabel>{option.label}</MC.optionLabel>
						<MC.optionOdds>{option.odds.toFixed(2)}</MC.optionOdds>
					</MC.optionButton>
				))}
			</MC.optionsGrid>
		</MC.container>
	);
}
