import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { UpcomingMatches } from './components/UpcomingMatches';
import { Match } from './components/MatchCard';

import IconsStores from '@assets/images/avatar-stores.png';

const UPCOMING_MATCHES: Match[] = [
	{ id: '1', homeTeam: 'BRA', awayTeam: 'ARG', scheduledAt: 'Qua, 21:45', thumbnail: IconsStores },
	{ id: '2', homeTeam: 'BRA', awayTeam: 'ARG', scheduledAt: 'Qua, 21:45', thumbnail: IconsStores },
	{ id: '3', homeTeam: 'BRA', awayTeam: 'ARG', scheduledAt: 'Qua, 21:45', thumbnail: IconsStores },
	{ id: '4', homeTeam: 'BRA', awayTeam: 'ARG', scheduledAt: 'Qua, 21:45', thumbnail: IconsStores },
	{ id: '5', homeTeam: 'BRA', awayTeam: 'ARG', scheduledAt: 'Qua, 21:45', thumbnail: IconsStores },
];

export function HomeEsportes() {
	return (
		<>
			<UpcomingMatches matches={UPCOMING_MATCHES} />
			<View style={styles.bottomSpacer} />
		</>
	);
}

const styles = StyleSheet.create({
	bottomSpacer: {
		height: RFValue(16),
	},
});
