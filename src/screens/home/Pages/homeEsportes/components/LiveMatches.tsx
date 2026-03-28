import React from 'react';
import { ScrollView } from 'react-native';
import { Styled } from 'stampd/styled';
import { SectionHeader } from '@components/SectionHeader';
import { LiveMatchCard } from './LiveMatchCard';

interface LiveMatch {
	id: string;
	homeTeam: string;
	awayTeam: string;
	league: string;
	odds: number;
}

interface LiveMatchesProps {
	matches: LiveMatch[];
}

const LM = {
	section: Styled.View({
		style: ({ theme }) => ({
			paddingVertical: theme.spacing.p4,
			gap: theme.spacing.p3,
		}),
	}),

	scrollContent: Styled.View({
		style: ({ theme }) => ({
			flexDirection: 'row',
			gap: theme.spacing.p3,
			paddingHorizontal: theme.spacing.p6,
		}),
	}),
};

export function LiveMatches({ matches }: LiveMatchesProps) {
	return (
		<LM.section>
			<SectionHeader title="Ao vivo" count={matches.length} hasLive />
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<LM.scrollContent>
					{matches.map((match) => (
						<LiveMatchCard
							key={match.id}
							homeTeam={match.homeTeam}
							awayTeam={match.awayTeam}
							league={match.league}
							odds={match.odds}
						/>
					))}
				</LM.scrollContent>
			</ScrollView>
		</LM.section>
	);
}
