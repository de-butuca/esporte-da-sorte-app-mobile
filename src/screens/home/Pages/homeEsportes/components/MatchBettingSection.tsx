import React, { useState } from 'react';
import { Styled } from 'stampd/styled';
import { Zap, Clock } from 'lucide-react-native';
import { lightColors } from '@/stampd.config';
import { SportsFilter } from './SportsFilter';
import { MatchBettingCard } from './MatchBettingCard';

interface MatchData {
	id: string;
	time: string;
	homeTeam: string;
	awayTeam: string;
	competition: string;
	odds: Array<{ label: string; odds: number }>;
}

interface MatchBettingSectionProps {
	liveMatches: MatchData[];
	upcomingMatches: MatchData[];
}

const MBS = {
	section: Styled.View({
		style: ({ theme }) => ({
			paddingVertical: theme.spacing.p4,
		}),
	}),

	header: Styled.View({
		style: ({ theme }) => ({
			paddingHorizontal: theme.spacing.p4,
			marginBottom: theme.spacing.p4,
		}),
	}),

	title: Styled.Text({
		style: ({ theme }) => ({
			fontFamily: theme.fonts.family.bold,
			fontSize: theme.fonts.sizes.lg,
			color: theme.colors.textPrimary,
			marginBottom: theme.spacing.p3,
		}),
	}),

	tabsContainer: Styled.View({
		style: {
			flexDirection: 'row',
			gap: 12,
		},
	}),

	tab: Styled.TouchableOpacity({
		style: ({ theme, active }) => ({
			flexDirection: 'row',
			alignItems: 'center',
			gap: theme.spacing.p2,
			paddingHorizontal: theme.spacing.p3,
			paddingVertical: theme.spacing.p2,
			borderRadius: theme.radius.roundedFull,
			backgroundColor: active ? 'rgba(56, 230, 125, 0.15)' : 'rgba(160, 160, 200, 0.08)',
			borderWidth: 1,
			borderColor: active ? theme.colors.accent : 'transparent',
		}),
		attrs: { activeOpacity: 0.7 },
	}),

	tabText: Styled.Text({
		style: ({ theme, active }) => ({
			fontSize: theme.fonts.sizes.sm,
			fontFamily: theme.fonts.family.medium,
			color: active ? theme.colors.accent : theme.colors.textSecondary,
		}),
	}),

	matchesContainer: Styled.View({
		style: {
			gap: 8,
		},
	}),
};

const SPORTS = [
	{ id: 'popular', label: 'Popular' },
	{ id: 'football', label: 'Futebol' },
	{ id: 'tennis', label: 'Tênis' },
	{ id: 'basketball', label: 'Basquete' },
	{ id: 'esports', label: 'Esports' },
	{ id: 'volleyball', label: 'Vôlei' },
];

export function MatchBettingSection({
	liveMatches,
	upcomingMatches,
}: MatchBettingSectionProps) {
	const [activeTab, setActiveTab] = useState<'live' | 'upcoming'>('live');

	const matches = activeTab === 'live' ? liveMatches : upcomingMatches;

	return (
		<MBS.section>
			<MBS.header>
				<MBS.title>Junte-se à ação</MBS.title>
				<MBS.tabsContainer>
					<MBS.tab
						active={activeTab === 'live'}
						onPress={() => setActiveTab('live')}
					>
						<Zap size={16} color={activeTab === 'live' ? lightColors.accent : lightColors.textSecondary} strokeWidth={2} />
						<MBS.tabText active={activeTab === 'live'}>Ao vivo</MBS.tabText>
					</MBS.tab>
					<MBS.tab
						active={activeTab === 'upcoming'}
						onPress={() => setActiveTab('upcoming')}
					>
						<Clock size={16} color={activeTab === 'upcoming' ? lightColors.accent : lightColors.textSecondary} strokeWidth={2} />
						<MBS.tabText active={activeTab === 'upcoming'}>Próximos</MBS.tabText>
					</MBS.tab>
				</MBS.tabsContainer>
			</MBS.header>

			<SportsFilter sports={SPORTS} />

			<MBS.matchesContainer>
				{matches.map((match) => (
					<MatchBettingCard
						key={match.id}
						time={match.time}
						homeTeam={match.homeTeam}
						awayTeam={match.awayTeam}
						competition={match.competition}
						odds={match.odds}
					/>
				))}
			</MBS.matchesContainer>
		</MBS.section>
	);
}
