import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { HomeHeader } from './Pages/homeCassino/components/HomeHeader';
import { BottomNavBar, NavTab } from '@/components/BottomNavBar';
import { HomeCassino } from './Pages/homeCassino/view';
import { HomeEsportes } from './Pages/homeEsportes/view';
import { HomeStyled } from './home.styled';
import { setOnRouletteOpen } from '@/core/services/notifications';
import { useSessionContext } from '@/contexts/SessionContext';
import { useAuthThemeStore } from '@/core/auth/useAuthThemeStore';

export default function HomeScreen() {
	const [activeTab, setActiveTab] = useState<NavTab>('home');
	const [showRoulette, setShowRoulette] = useState(false);
	const { activeCategory } = useSessionContext();
	const setVariant = useAuthThemeStore((s) => s.setVariant);
	const scrollY = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollY.value = event.contentOffset.y;
		},
	});

	useEffect(() => {
		setOnRouletteOpen(() => setShowRoulette(true));
		return () => setOnRouletteOpen(null);
	}, []);

	// Sync auth theme store with active category
	useEffect(() => {
		setVariant(activeCategory === 'cassino' ? 'cassino' : 'esportes');
	}, [activeCategory, setVariant]);

	return (
		<HomeStyled.Root>
			<HomeHeader scrollY={scrollY} />

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
		</HomeStyled.Root>
	);
}

const styles = StyleSheet.create({
	scroll: {
		flex: 1,
	},
	scrollContent: {
		gap: RFValue(20),
	},
});
