import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { lightColors } from '@/stampd.config';
import { HomeHeader, CategoryTab } from './Pages/homeCassino/components/HomeHeader';
import { BottomNavBar, NavTab } from '@/components/BottomNavBar';
import { HomeCassino } from './Pages/homeCassino/view';
import { HomeEsportes } from './Pages/homeEsportes/view';

export default function HomeScreen() {
	const [activeTab, setActiveTab] = useState<NavTab>('home');
	const [activeCategory, setActiveCategory] = useState<CategoryTab>('cassino');
	const scrollY = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollY.value = event.contentOffset.y;
		},
	});

	const handleCategoryChange = useCallback(
		(category: CategoryTab) => {
			setActiveCategory(category);
			scrollY.value = 0;
		},
		[scrollY]
	);

	return (
		<View style={styles.root}>
			<HomeHeader scrollY={scrollY} activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

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
					<GameRow games={LIVE_GAMES} cardWidth={RFValue(80)} onGamePress={handleGamePress} />
				</View>

				<View style={styles.section}>
					<SectionHeader title="Cassino em alta" count={12} />
					<GameRow games={TRENDING_GAMES} onGamePress={handleGamePress} />
				</View>

				<PromoBanner />

				<View style={styles.section}>
					<SectionHeader title="Novos cassinos" count={12} />
					<GameRow games={NEW_GAMES} onGamePress={handleGamePress} />
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
		backgroundColor: lightColors.background,
	},
	scroll: {
		flex: 1,
	},
	scrollContent: {
		gap: RFValue(20),
		paddingTop: RFValue(14),
	},
	section: {
		gap: RFValue(8),
	},
	bottomSpacer: {
		height: RFValue(12),
	},
});
