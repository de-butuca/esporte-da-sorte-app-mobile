import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { HomeHeader, CategoryTab } from './Pages/homeCassino/components/HomeHeader';
import { BottomNavBar, NavTab } from '@/components/BottomNavBar';
import { HomeCassino } from './Pages/homeCassino/view';
import { HomeEsportes } from './Pages/homeEsportes/view';
import { useAuthThemeStore } from '@/core/auth/useAuthThemeStore';

export default function HomeScreen() {
	const [activeTab, setActiveTab] = useState<NavTab>('home');
	const [activeCategory, setActiveCategory] = useState<CategoryTab>('cassino');
	const colors = useAuthThemeStore((s) => s.colors);
	const setVariant = useAuthThemeStore((s) => s.setVariant);
	const scrollY = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollY.value = event.contentOffset.y;
		},
	});

	const handleCategoryChange = useCallback(
		(category: CategoryTab) => {
			setActiveCategory(category);
			setVariant(category === 'cassino' ? 'cassino' : 'esportes');
			scrollY.value = 0;
		},
		[scrollY, setVariant]
	);

	return (
		<View style={[styles.root, { backgroundColor: colors.background }]}>
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
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	scroll: {
		flex: 1,
	},
	scrollContent: {
		gap: RFValue(20),
		paddingTop: RFValue(14),
	},
});
