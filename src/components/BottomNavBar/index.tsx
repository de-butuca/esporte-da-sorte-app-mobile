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
import { Dices, Radio } from 'lucide-react-native';
import { fontFamily, cassinoColors } from '@/stampd.config';
import { useSidebar } from '@/contexts/Sidebar/SidebarContext';
import { useSessionContext } from '@/contexts/SessionContext';
import HomeIcon from '@assets/icons/homeIcon.svg';
import BallIcon from '@assets/icons/ballIcon.svg';
import CupIcon from '@assets/icons/cupIcon.svg';
import ProfileIcon from '@assets/icons/profileIcon.svg';
import PointIcon from '@assets/icons/pointIcon.svg';
import { useStampdUI } from 'stampd/context';

// ── Esportes ──────────────────────────────────────────────────────────────────

export type NavTab = 'home' | 'partidas' | 'ranking' | 'perfil';

interface BottomNavBarProps {
	activeTab: NavTab;
	onTabPress: (tab: NavTab) => void;
}

const ICON_SIZE = 22;
const ESPORTES_ACTIVE = '#22C55E';
const INACTIVE_COLOR = '#6B7280';
const TIMING = { duration: 250, easing: Easing.bezier(0.4, 0, 0.2, 1) };

const ESPORTES_TABS: { key: NavTab; label: string; Icon: typeof HomeIcon }[] = [
	{ key: 'home', label: 'Inicio', Icon: HomeIcon },
	{ key: 'partidas', label: 'Partidas', Icon: BallIcon },
	{ key: 'ranking', label: 'Ranking', Icon: CupIcon },
	{ key: 'perfil', label: 'Perfil', Icon: ProfileIcon },
];

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

// ── Shared TabItem ─────────────────────────────────────────────────────────────

interface TabItemProps {
	label: string;
	isActive: boolean;
	activeColor: string;
	activeBgColor: string;
	onPress: () => void;
	renderIcon: (color: string) => React.ReactNode;
}

const TabItem = React.memo(function TabItem({
	label,
	isActive,
	activeColor,
	activeBgColor,
	onPress,
	renderIcon,
}: TabItemProps) {
	const progress = useSharedValue(isActive ? 1 : 0);

	useEffect(() => {
		progress.value = withTiming(isActive ? 1 : 0, TIMING);
	}, [isActive]);

	const bgStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			progress.value,
			[0, 1],
			['transparent', activeBgColor],
		),
		height: interpolate(progress.value, [0, 1], [56, 82]),
		paddingTop: interpolate(progress.value, [0, 1], [8, 15]),
	}));

	const dotStyle = useAnimatedStyle(() => ({
		opacity: progress.value,
		transform: [{ scale: progress.value }],
	}));

	const colorStyle = useAnimatedStyle(() => ({
		color: interpolateColor(progress.value, [0, 1], [INACTIVE_COLOR, activeColor]),
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
				onPress={onPress}
				activeOpacity={0.7}
			>
				<Animated.View style={[styles.dotContainer, dotStyle]}>
					<PointIcon width={28} height={28} />
				</Animated.View>
				<View style={styles.iconContainer}>
					<Animated.View style={[styles.iconWrap, activeIconStyle]}>
						{renderIcon(activeColor)}
					</Animated.View>
					<Animated.View style={[styles.iconWrap, inactiveIconStyle]}>
						{renderIcon(INACTIVE_COLOR)}
					</Animated.View>
				</View>
				<Animated.Text style={[styles.label, colorStyle]} numberOfLines={1}>
					{label}
				</Animated.Text>
			</AnimatedTouchable>
		</View>
	);
});

// ── Esportes Bottom Nav ────────────────────────────────────────────────────────

function EsportesBottomNavBar({ activeTab, onTabPress }: BottomNavBarProps) {
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
				{ESPORTES_TABS.map((tab) => (
					<TabItem
						key={tab.key}
						label={tab.label}
						isActive={activeTab === tab.key}
						activeColor={ESPORTES_ACTIVE}
						activeBgColor="rgba(16,185,129,0.1)"
						onPress={() => handleTabPress(tab.key)}
						renderIcon={(color) => <tab.Icon width={ICON_SIZE} height={ICON_SIZE} color={color} />}
					/>
				))}
			</View>
		</View>
	);
}

// ── Cassino Bottom Nav ─────────────────────────────────────────────────────────

export type CassinoNavTab = 'home' | 'slots' | 'ao-vivo' | 'perfil';

interface CassinoBottomNavBarProps {
	activeTab: CassinoNavTab;
	onTabPress: (tab: CassinoNavTab) => void;
}

const CASSINO_ACTIVE = cassinoColors.accent;
const CASSINO_BG_ACTIVE = 'rgba(0, 232, 120, 0.12)';

type CassinoTabDef = {
	key: CassinoNavTab;
	label: string;
	renderIcon: (color: string) => React.ReactNode;
};

const CASSINO_TABS: CassinoTabDef[] = [
	{
		key: 'home',
		label: 'Início',
		renderIcon: (color) => <HomeIcon width={ICON_SIZE} height={ICON_SIZE} color={color} />,
	},
	{
		key: 'slots',
		label: 'Slots',
		renderIcon: (color) => <Dices width={ICON_SIZE} height={ICON_SIZE} color={color} />,
	},
	{
		key: 'ao-vivo',
		label: 'Ao Vivo',
		renderIcon: (color) => <Radio width={ICON_SIZE} height={ICON_SIZE} color={color} />,
	},
	{
		key: 'perfil',
		label: 'Perfil',
		renderIcon: (color) => <ProfileIcon width={ICON_SIZE} height={ICON_SIZE} color={color} />,
	},
];

function CassinoBottomNavBarInner({ activeTab, onTabPress }: CassinoBottomNavBarProps) {
	const insets = useSafeAreaInsets();
	const { open: openSidebar } = useSidebar();

	const handleTabPress = useCallback((key: CassinoNavTab) => {
		if (key === 'perfil') {
			openSidebar();
			return;
		}
		onTabPress(key);
	}, [onTabPress, openSidebar]);

	const containerStyle = useMemo(
		() => [styles.container, { paddingBottom: Math.max(insets.bottom, 8), backgroundColor: cassinoColors.bgNav }],
		[insets.bottom],
	);

	return (
		<View style={containerStyle}>
			<View style={styles.tabRow}>
				{CASSINO_TABS.map((tab) => (
					<TabItem
						key={tab.key}
						label={tab.label}
						isActive={activeTab === tab.key}
						activeColor={CASSINO_ACTIVE}
						activeBgColor={CASSINO_BG_ACTIVE}
						onPress={() => handleTabPress(tab.key)}
						renderIcon={tab.renderIcon}
					/>
				))}
			</View>
		</View>
	);
}

// ── Smart wrapper ──────────────────────────────────────────────────────────────

export function BottomNavBar({ activeTab, onTabPress }: BottomNavBarProps) {
	const { activeCategory } = useSessionContext();

	// Cassino has its own internal tab state — keep it isolated
	const [cassinoTab, setCassinoTab] = React.useState<CassinoNavTab>('home');

	if (activeCategory === 'cassino') {
		return <CassinoBottomNavBarInner activeTab={cassinoTab} onTabPress={setCassinoTab} />;
	}

	return <EsportesBottomNavBar activeTab={activeTab} onTabPress={onTabPress} />;
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
	container: {
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
		paddingHorizontal: 8,
		borderRadius: 16,
		height: 56,
		width: '100%',
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
