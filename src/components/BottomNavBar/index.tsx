import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily, lightColors } from '@/theme/design-tokens';
import { House, Zap, Dice5, ClipboardList, Menu } from 'lucide-react-native';

export type NavTab = 'home' | 'live' | 'cassino' | 'apostas' | 'menu';

interface BottomNavBarProps {
	activeTab: NavTab;
	onTabPress: (tab: NavTab) => void;
}

const TABS: { key: NavTab; label: string; Icon: typeof House }[] = [
	{ key: 'home', label: 'Início', Icon: House },
	{ key: 'live', label: 'Ao Vivo', Icon: Zap },
	{ key: 'cassino', label: 'Cassino', Icon: Dice5 },
	{ key: 'apostas', label: 'Apostas', Icon: ClipboardList },
	{ key: 'menu', label: 'Menu', Icon: Menu },
];

interface TabItemProps {
	tab: typeof TABS[number];
	isActive: boolean;
	onPress: (key: NavTab) => void;
}

const TabItem = React.memo(function TabItem({ tab, isActive, onPress }: TabItemProps) {
	const color = isActive ? lightColors.accent : lightColors.textMuted;
	const handlePress = useCallback(() => onPress(tab.key), [onPress, tab.key]);

	return (
		<TouchableOpacity
			style={styles.tab}
			onPress={handlePress}
			activeOpacity={0.7}
		>
			<tab.Icon size={RFValue(18)} color={color} strokeWidth={isActive ? 2.2 : 1.5} />
			<Text
				style={[
					styles.label,
					{ color, fontFamily: isActive ? fontFamily.bold : fontFamily.regular },
				]}
			>
				{tab.label}
			</Text>
			{isActive && <View style={styles.activeDot} />}
		</TouchableOpacity>
	);
});

export function BottomNavBar({ activeTab, onTabPress }: BottomNavBarProps) {
	const insets = useSafeAreaInsets();
	const containerStyle = useMemo(
		() => [styles.container, { paddingBottom: Math.max(insets.bottom, 8) }],
		[insets.bottom],
	);

	return (
		<View style={containerStyle}>
			<View style={styles.divider} />
			<View style={styles.tabRow}>
				{TABS.map((tab) => (
					<TabItem
						key={tab.key}
						tab={tab}
						isActive={activeTab === tab.key}
						onPress={onTabPress}
					/>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: lightColors.bgNav,
	},
	divider: {
		height: 1,
		backgroundColor: 'rgba(160,160,200,0.15)',
	},
	tabRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: RFValue(12),
		paddingTop: RFValue(6),
		height: RFValue(46),
	},
	tab: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		gap: RFValue(2),
	},
	label: {
		fontSize: RFValue(9),
		textAlign: 'center',
	},
	activeDot: {
		width: 4,
		height: 4,
		borderRadius: 2,
		backgroundColor: lightColors.accent,
		marginTop: 2,
	},
});
