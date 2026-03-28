import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Image, StyleSheet, LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { Menu, Search, Settings } from 'lucide-react-native';
import { useSidebar } from '@/contexts/Sidebar/SidebarContext';
import { useAppNavigation } from '@/navigation/hooks';
import Logo from '@assets/images/logo-square.svg';
import Animated, {
	useAnimatedStyle,
	SharedValue,
	interpolate,
	Extrapolation,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useStampdUI } from 'stampd/context';
import { HHS } from '../homeHeader.styled';

import SOCCER_ICON from '@assets/images/icons/soccer-ball-icon.png';
import CASSINO_ICON from '@assets/images/icons/cassino-coin-icon.png';

const EXPANDED_HEIGHT = RFValue(72);
const PILL_SPRING = { damping: 22, stiffness: 380, mass: 0.7 } as const;

export type CategoryTab = 'cassino' | 'esportes';

interface HomeHeaderProps {
	scrollY: SharedValue<number>;
	activeCategory: CategoryTab;
	onCategoryChange: (category: CategoryTab) => void;
}

export function HomeHeader({ scrollY, activeCategory, onCategoryChange }: HomeHeaderProps) {
	const insets = useSafeAreaInsets();
	const { theme } = useStampdUI();
	const { requireAuth, isAuthenticated } = useRequireAuth();
	const { open: openSidebar } = useSidebar();
	const [tabWidth, setTabWidth] = useState(0);
	const pillX = useSharedValue(0);

	const handleCategoryPress = useCallback((category: CategoryTab) => onCategoryChange(category), [onCategoryChange]);

	const handleLogin = useCallback(() => requireAuth(() => {}), [requireAuth]);

	const handleTabLayout = useCallback(
		(e: LayoutChangeEvent) => {
			const width = e.nativeEvent.layout.width;
			if (tabWidth !== 0) return;
			setTabWidth(width);
			pillX.value = activeCategory === 'cassino' ? 0 : width;
		},
		[tabWidth, activeCategory, pillX]
	);

	useEffect(() => {
		if (tabWidth === 0) return;
		pillX.value = withSpring(activeCategory === 'cassino' ? 0 : tabWidth, PILL_SPRING);
	}, [activeCategory, tabWidth, pillX]);

	const pillStyle = useAnimatedStyle(() => ({
		width: tabWidth,
		transform: [{ translateX: pillX.value }],
	}));

	const wrapperStyle = useAnimatedStyle(() => {
		const progress = interpolate(scrollY.value, [0, 100], [0, 1], Extrapolation.CLAMP);
		return {
			maxHeight: (1 - progress) * EXPANDED_HEIGHT,
			opacity: 1 - progress,
		};
	});

	const containerStyle = useMemo(
		() => [styles.container, { paddingTop: insets.top, backgroundColor: theme.colors.background }],
		[insets.top, theme.colors.background]
	);

	return (
		<View style={containerStyle}>
			<HHS.topRow>
				<HHS.iconBtn onPress={openSidebar}>
					<Menu size={RFValue(22)} color={theme.colors.textPrimary} strokeWidth={2} />
				</HHS.iconBtn>
				<Logo width={RFValue(80)} height={RFValue(28)} />

				<HHS.actions>
					<HHS.iconBtn>
						<Search size={RFValue(20)} color={theme.colors.textPrimary} strokeWidth={2} />
					</HHS.iconBtn>
					<HHS.iconBtn>
						<Settings size={RFValue(20)} color={theme.colors.textPrimary} strokeWidth={2} />
					</HHS.iconBtn>
					{!isAuthenticated && (
						<HHS.entrarBtn onPress={handleLogin}>
							<HHS.entrarText>Entrar</HHS.entrarText>
						</HHS.entrarBtn>
					)}
				</HHS.actions>
			</HHS.topRow>

			<Animated.View style={[styles.tabsWrapper, wrapperStyle]}>
				<HHS.categoryTabs>
					<Animated.View style={[styles.pill, { backgroundColor: theme.colors.bgNav }, pillStyle]} />

					<HHS.categoryTab onPress={() => handleCategoryPress('cassino')} onLayout={handleTabLayout}>
						<Image source={CASSINO_ICON} style={[styles.categoryIcon, activeCategory === 'cassino' && styles.active]} resizeMode="contain" />
						{activeCategory === 'cassino' ? (
							<HHS.categoryLabelActive>Cassino</HHS.categoryLabelActive>
						) : (
							<HHS.categoryLabel>Cassino</HHS.categoryLabel>
						)}
					</HHS.categoryTab>

					<HHS.categoryTab onPress={() => handleCategoryPress('esportes')}>
						<Image source={SOCCER_ICON} style={[styles.categoryIcon, activeCategory === 'esportes' && styles.active]} resizeMode="contain" />
						{activeCategory === 'esportes' ? (
							<HHS.categoryLabelActive>Esportes</HHS.categoryLabelActive>
						) : (
							<HHS.categoryLabel>Esportes</HHS.categoryLabel>
						)}
					</HHS.categoryTab>
				</HHS.categoryTabs>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingBottom: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 8,
	},
	tabsWrapper: {
		overflow: 'hidden',
	},
	pill: {
		position: 'absolute',
		top: 4,
		left: 4,
		bottom: 4,
		borderRadius: 10,
	},
	categoryIcon: {
		width: 16,
		height: 16,
		opacity: 0.4,
	},
	active: {
		opacity: 1,
	},
});
