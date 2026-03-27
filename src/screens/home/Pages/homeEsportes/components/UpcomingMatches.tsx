import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { Styled } from 'stampd/styled';
import { SectionHeader } from '@/screens/home/Pages/homeCassino/components/SectionHeader';
import { Match, MatchCard } from './MatchCard';

interface UpcomingMatchesProps {
	matches: Match[];
	onMatchPress?: (match: Match) => void;
	onSeeAll?: () => void;
}

const UMS = {
	container: Styled.View({
		style: { gap: 14 },
	}),

	separator: Styled.View({
		style: ({ theme }) => ({ width: theme.spacing.p4 }),
	}),
};

const LIST_CONTENT_STYLE = { paddingHorizontal: 20 };

export function UpcomingMatches({ matches, onMatchPress, onSeeAll }: UpcomingMatchesProps) {
	const renderItem = useCallback(
		({ item }: { item: Match }) => <MatchCard match={item} onPress={onMatchPress} />,
		[onMatchPress]
	);

	const keyExtractor = useCallback((item: Match) => item.id, []);

	const renderSeparator = useCallback(() => <UMS.separator />, []);

	return (
		<UMS.container>
			<SectionHeader title="Próximas partidas" count={matches.length} onSeeAll={onSeeAll} />
			<FlatList
				data={matches}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={LIST_CONTENT_STYLE}
				ItemSeparatorComponent={renderSeparator}
			/>
		</UMS.container>
	);
}
