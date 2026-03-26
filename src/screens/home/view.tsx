import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { HomeHeader } from './components/HomeHeader';
import { BannerCarousel } from './components/BannerCarousel';
import { SectionHeader } from './components/SectionHeader';
import { GameRow } from './components/GameRow';
import { PromoBanner } from './components/PromoBanner';
import { BottomNavBar, NavTab } from '@/components/BottomNavBar';

const GAME_THUMB_1 = require('@assets/images/games/game-thumbnail-1.png');
const GAME_THUMB_2 = require('@assets/images/games/game-thumbnail-2.png');
const GAME_THUMB_3 = require('@assets/images/games/game-thumbnail-3.png');

const LIVE_GAMES = [
	{ id: '1', name: 'Bac bo', provider: 'Fatec', image: GAME_THUMB_3, badge: 'live' as const, players: '1.2k online' },
	{ id: '2', name: 'Bac bo', provider: 'Fatec', image: GAME_THUMB_3, badge: 'live' as const, players: '1.2k online' },
	{ id: '3', name: 'Bac bo', provider: 'Fatec', image: GAME_THUMB_3, badge: 'live' as const, players: '1.2k online' },
	{ id: '4', name: 'Bac bo', provider: 'Fatec', image: GAME_THUMB_3, badge: 'live' as const, players: '1.2k online' },
	{ id: '5', name: 'Bac bo', provider: 'Fatec', image: GAME_THUMB_3, badge: 'live' as const, players: '1.2k online' },
];

const TRENDING_GAMES = [
	{ id: '1', name: 'Choice gaming', provider: 'Maua', image: GAME_THUMB_1, players: '1.2k online' },
	{ id: '2', name: 'Choice gaming', provider: 'Maua', image: GAME_THUMB_1, players: '1.2k online' },
	{ id: '3', name: 'Choice gaming', provider: 'Maua', image: GAME_THUMB_1, players: '1.2k online' },
	{ id: '4', name: 'Choice gaming', provider: 'Maua', image: GAME_THUMB_1, players: '1.2k online' },
];

const NEW_GAMES = [
	{ id: '1', name: 'Game Name', provider: 'Provider', image: GAME_THUMB_2, badge: 'new' as const, players: '1.2k online' },
	{ id: '2', name: 'Game Name', provider: 'Provider', image: GAME_THUMB_2, badge: 'new' as const, players: '1.2k online' },
	{ id: '3', name: 'Game Name', provider: 'Provider', image: GAME_THUMB_2, badge: 'new' as const, players: '1.2k online' },
	{ id: '4', name: 'Game Name', provider: 'Provider', image: GAME_THUMB_2, badge: 'new' as const, players: '1.2k online' },
];

export default function HomeScreen() {
	const [activeTab, setActiveTab] = useState<NavTab>('home');
	const scrollY = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollY.value = event.contentOffset.y;
		},
	});

	return (
		<View style={styles.root}>
			<HomeHeader scrollY={scrollY} />

			<Animated.ScrollView
				style={styles.scroll}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
				onScroll={scrollHandler}
				scrollEventThrottle={16}
			>
				<BannerCarousel />

				<View style={styles.section}>
					<SectionHeader title="Ao vivo" count={12} hasLive />
					<GameRow games={LIVE_GAMES} cardWidth={RFValue(95)} />
				</View>

				<View style={styles.section}>
					<SectionHeader title="Cassino em alta" count={12} />
					<GameRow games={TRENDING_GAMES} />
				</View>

				<PromoBanner />

				<View style={styles.section}>
					<SectionHeader title="Novos cassinos" count={12} />
					<GameRow games={NEW_GAMES} />
				</View>

				<View style={styles.bottomSpacer} />
			</Animated.ScrollView>

			<BottomNavBar activeTab={activeTab} onTabPress={setActiveTab} />
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#01003A',
	},
	scroll: {
		flex: 1,
	},
	scrollContent: {
		gap: RFValue(24),
		paddingTop: RFValue(20),
	},
	section: {
		gap: RFValue(12),
	},
	bottomSpacer: {
		height: RFValue(20),
	},
});
