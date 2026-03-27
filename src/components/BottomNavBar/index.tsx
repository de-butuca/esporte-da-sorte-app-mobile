import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily } from '@/theme/design-tokens';
import { House, Radio, Menu } from 'lucide-react-native';

export type NavTab = 'home' | 'live' | 'menu';

interface BottomNavBarProps {
	activeTab: NavTab;
	onTabPress: (tab: NavTab) => void;
}

const TABS: { key: NavTab; label: string; Icon: typeof House }[] = [
	{ key: 'home', label: 'Inicio', Icon: House },
	{ key: 'live', label: 'Ao Vivo', Icon: Radio },
	{ key: 'menu', label: 'Menu', Icon: Menu },
];

export function BottomNavBar({ activeTab, onTabPress }: BottomNavBarProps) {
	const insets = useSafeAreaInsets();

	return (
		<View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
			<View style={styles.tabRow}>
				{TABS.map((tab) => {
					const isActive = activeTab === tab.key;
					const color = isActive ? '#37E67D' : '#6B6B8A';
					return (
						<TouchableOpacity
							key={tab.key}
							style={styles.tab}
							onPress={() => onTabPress(tab.key)}
							activeOpacity={0.7}
						>
							<tab.Icon size={RFValue(22)} color={color} strokeWidth={isActive ? 2.2 : 1.5} />
							<Text
								style={[
									styles.label,
									{ color, fontFamily: isActive ? fontFamily.medium : fontFamily.regular },
								]}
							>
								{tab.label}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#02003D',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -8 },
		shadowOpacity: 0.3,
		shadowRadius: 12,
		elevation: 12,
	},
	tabRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: RFValue(24),
		paddingVertical: RFValue(8),
		height: RFValue(56),
	},
	tab: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		gap: RFValue(4),
	},
	label: {
		fontSize: RFValue(10),
		textAlign: 'center',
	},
});
