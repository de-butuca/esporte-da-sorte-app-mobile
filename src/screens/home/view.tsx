import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { BlurTargetView } from 'expo-blur';
import { lightColors } from '@/stampd.config';
import { HomeHeader, CategoryTab } from './Pages/homeCassino/components/HomeHeader';
import { BottomNavBar, NavTab } from '@/components/BottomNavBar';
import { HomeCassino } from './Pages/homeCassino/view';
import { HomeEsportes } from './Pages/homeEsportes/view';
import { Roulette } from '@/components/Roulette';
import { markRouletteSpun, setOnRouletteOpen } from '@/core/services/notifications';
import { useAppNavigation } from '@/navigation/hooks';

export default function HomeScreen() {
	const navigation = useAppNavigation();
	const [activeTab, setActiveTab] = useState<NavTab>('home');
	const [activeCategory, setActiveCategory] = useState<CategoryTab>('cassino');
	const [showRoulette, setShowRoulette] = useState(false);
	const scrollY = useSharedValue(0);
	const blurTargetRef = useRef<View>(null);

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

	useEffect(() => {
		setOnRouletteOpen(() => setShowRoulette(true));
		return () => setOnRouletteOpen(null);
	}, []);

	const handleRouletteSpin = useCallback(() => {
		markRouletteSpun();
	}, []);

	const handleRouletteClose = useCallback(() => {
		setShowRoulette(false);
	}, []);

	const handleRouletteClaim = useCallback(() => {
		setShowRoulette(false);
		navigation.navigate('Login');
	}, [navigation]);

	return (
		<View style={styles.root}>
			<BlurTargetView ref={blurTargetRef} style={styles.fill}>
				<HomeHeader scrollY={scrollY} activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

				<Animated.ScrollView
					style={styles.scroll}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					onScroll={scrollHandler}
					scrollEventThrottle={16}
				>
					{activeCategory === 'cassino' ? <HomeCassino /> : <HomeEsportes />}
				</Animated.ScrollView>

				<BottomNavBar activeTab={activeTab} onTabPress={setActiveTab} />
			</BlurTargetView>

			<Roulette
				visible={showRoulette}
				onClose={handleRouletteClose}
				onSpin={handleRouletteSpin}
				onClaim={handleRouletteClaim}
				blurTarget={blurTargetRef}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: lightColors.background,
	},
	fill: {
		flex: 1,
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
