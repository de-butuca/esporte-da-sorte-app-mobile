import React, { useCallback, useEffect, useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	interpolateColor,
	interpolate,
	Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontFamily } from '@/stampd.config';
import { useSidebar } from '@/contexts/Sidebar/SidebarContext';
import HomeIcon from '@assets/icons/homeIcon.svg';
import BallIcon from '@assets/icons/ballIcon.svg';
import CupIcon from '@assets/icons/cupIcon.svg';
import ProfileIcon from '@assets/icons/profileIcon.svg';
import PointIcon from '@assets/icons/pointIcon.svg';
import { useStampdUI } from 'stampd/context';

export type NavTab = 'home' | 'partidas' | 'ranking' | 'perfil';

interface BottomNavBarProps {
	activeTab: NavTab;
	onTabPress: (tab: NavTab) => void;
}

const ICON_SIZE = 22;
const ACTIVE_COLOR = '#22C55E';
const INACTIVE_COLOR = '#6B7280';
const TIMING = { duration: 250, easing: Easing.bezier(0.4, 0, 0.2, 1) };

const TABS: { key: NavTab; label: string; Icon: typeof HomeIcon }[] = [
	{ key: 'home', label: 'Inicio', Icon: HomeIcon },
	{ key: 'partidas', label: 'Partidas', Icon: BallIcon },
	{ key: 'ranking', label: 'Ranking', Icon: CupIcon },
	{ key: 'perfil', label: 'Perfil', Icon: ProfileIcon },
];

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface TabItemProps {
	tab: typeof TABS[number];
	isActive: boolean;
	onPress: (key: NavTab) => void;
}

const TabItem = React.memo(function TabItem({ tab, isActive, onPress }: TabItemProps) {
	const progress = useSharedValue(isActive ? 1 : 0);

	useEffect(() => {
		progress.value = withTiming(isActive ? 1 : 0, TIMING);
	}, [isActive]);

	const { theme } = useStampdUI();
	const color = isActive ? theme.colors.accent : theme.colors.textMuted;
	const handlePress = useCallback(() => onPress(tab.key), [onPress, tab.key]);

	const bgStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			progress.value,
			[0, 1],
			['transparent', 'rgba(16,185,129,0.1)'],
		),
		height: interpolate(progress.value, [0, 1], [56, 82]),
		paddingTop: interpolate(progress.value, [0, 1], [8, 15]),
	}));

	const dotStyle = useAnimatedStyle(() => ({
		opacity: progress.value,
		transform: [{ scale: progress.value }],
	}));

	const colorStyle = useAnimatedStyle(() => ({
		color: interpolateColor(progress.value, [0, 1], [INACTIVE_COLOR, ACTIVE_COLOR]),
	}));

	const activeIconStyle = useAnimatedStyle(() => ({
		opacity: progress.value,
	}));

	const inactiveIconStyle = useAnimatedStyle(() => ({
		opacity: 1 - progress.value,
	}));

	return (
		<View style={styles.tabSlot}>
			<AnimatedTouchable
				style={[styles.tab, bgStyle]}
				onPress={handlePress}
				activeOpacity={0.7}
			>
				<Animated.View style={[styles.dotContainer, dotStyle]}>
					<PointIcon width={28} height={28} />
				</Animated.View>
				<View style={styles.iconContainer}>
					<Animated.View style={[styles.iconWrap, activeIconStyle]}>
						<tab.Icon width={ICON_SIZE} height={ICON_SIZE} color={ACTIVE_COLOR} />
					</Animated.View>
					<Animated.View style={[styles.iconWrap, inactiveIconStyle]}>
						<tab.Icon width={ICON_SIZE} height={ICON_SIZE} color={INACTIVE_COLOR} />
					</Animated.View>
				</View>
				<Animated.Text style={[styles.label, colorStyle]} numberOfLines={1}>
					{tab.label}
				</Animated.Text>
			</AnimatedTouchable>
		</View>
	);
});

export function BottomNavBar({ activeTab, onTabPress }: BottomNavBarProps) {
	const insets = useSafeAreaInsets();
	const { open: openSidebar } = useSidebar();
	const { theme } = useStampdUI();

	const handleTabPress = useCallback((key: NavTab) => {
		if (key === 'perfil') {
			openSidebar();
			return;
		}
		onTabPress(key);
	}, [onTabPress, openSidebar]);

	const containerStyle = useMemo(
		() => [styles.container, { paddingBottom: Math.max(insets.bottom, 8), backgroundColor: theme.colors.bgNav }],
		[insets.bottom, theme.colors.bgNav],
	);

	return (
		<View style={containerStyle}>
			<View style={styles.tabRow}>
				{TABS.map((tab) => (
					<TabItem
						key={tab.key}
						tab={tab}
						isActive={activeTab === tab.key}
						onPress={handleTabPress}
					/>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#101828',
		paddingTop: 8,
		paddingHorizontal: 24,
		...Platform.select({
			ios: {
				shadowColor: '#000000',
				shadowOffset: { width: 0, height: -8 },
				shadowOpacity: 0.3,
				shadowRadius: 12,
			},
			android: {
				elevation: 12,
			},
		}),
	},
	tabRow: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 15,
	},
	tabSlot: {
		flex: 1,
		alignItems: 'center',
		height: 80,
		overflow: 'visible',
	},
	tab: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: 4,
		paddingTop: 8,
		paddingHorizontal: 21,
		borderRadius: 16,
		height: 56,
	},
	dotContainer: {
		height: 4,
		alignItems: 'center',
		justifyContent: 'flex-start',
		overflow: 'visible',
	},
	iconContainer: {
		width: 22,
		height: 28,
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconWrap: {
		position: 'absolute',
	},
	label: {
		fontFamily: fontFamily.semibold,
		fontSize: 10,
		textAlign: 'center',
		includeFontPadding: false,
		lineHeight: 15,
	},
});
