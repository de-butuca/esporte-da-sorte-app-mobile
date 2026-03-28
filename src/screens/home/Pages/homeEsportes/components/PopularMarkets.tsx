import React from 'react';
import { ScrollView } from 'react-native';
import { Styled } from 'stampd/styled';
import { SectionHeader } from '@components/SectionHeader';
import { MarketCard } from './MarketCard';

interface MarketData {
	id: string;
	title: string;
	options: Array<{
		label: string;
		odds: number;
	}>;
}

interface PopularMarketsProps {
	markets: MarketData[];
}

const PM = {
	section: Styled.View({
		style: ({ theme }) => ({
			paddingVertical: theme.spacing.p4,
			gap: theme.spacing.p3,
		}),
	}),

	scrollContent: Styled.View({
		style: ({ theme }) => ({
			width: '100%',
			flexDirection: 'column',
			gap: theme.spacing.p3,
			paddingHorizontal: theme.spacing.p6,
		}),
	}),
};

export function PopularMarkets({ markets }: PopularMarketsProps) {
	return (
		<PM.section>
			<SectionHeader title="Mercados populares" count={markets.length} />

			<PM.scrollContent>
				{markets.map((market) => (
					<MarketCard key={market.id} title={market.title} options={market.options} />
				))}
			</PM.scrollContent>
		</PM.section>
	);
}
