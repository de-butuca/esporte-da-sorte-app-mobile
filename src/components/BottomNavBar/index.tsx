import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily } from '@/theme/design-tokens';
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

export function BottomNavBar({ activeTab, onTabPress }: BottomNavBarProps) {
	const insets = useSafeAreaInsets();

	return (
		<View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
			<View style={styles.divider} />
			<View style={styles.tabRow}>
				{TABS.map((tab) => {
					const isActive = activeTab === tab.key;
					const color = isActive ? '#38E67D' : '#A0A0C8';
					return (
						<TouchableOpacity
							key={tab.key}
							style={styles.tab}
							onPress={() => onTabPress(tab.key)}
							activeOpacity={0.7}
						>
							<tab.Icon size={RFValue(20)} color={color} strokeWidth={isActive ? 2.2 : 1.5} />
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
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#05032D',
	},
	divider: {
		height: 1,
		backgroundColor: 'rgba(160,160,200,0.15)',
	},
	tabRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: RFValue(16),
		paddingTop: RFValue(8),
		height: RFValue(52),
	},
	tab: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		gap: RFValue(3),
	},
	label: {
		fontSize: RFValue(10),
		textAlign: 'center',
	},
	activeDot: {
		width: 4,
		height: 4,
		borderRadius: 2,
		backgroundColor: '#38E67D',
		marginTop: 2,
	},
});
