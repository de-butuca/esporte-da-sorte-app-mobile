import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily, lightColors } from '@/theme/design-tokens';
import { Search, Settings } from 'lucide-react-native';
import Logo from '@assets/images/logo-square.svg';
import Animated, { useAnimatedStyle, SharedValue, interpolate, Extrapolation } from 'react-native-reanimated';
import { useRequireAuth } from '@/hooks/useRequireAuth';

import SOCCER_ICON from '@assets/images/icons/soccer-ball-icon.png';
import CASSINO_ICON from '@assets/images/icons/cassino-coin-icon.png';

const EXPANDED_HEIGHT = RFValue(62);

type CategoryTab = 'cassino' | 'esportes';

interface HomeHeaderProps {
	scrollY: SharedValue<number>;
	onCategoryChange?: (category: CategoryTab) => void;
}

export function HomeHeader({ scrollY, onCategoryChange }: HomeHeaderProps) {
	const insets = useSafeAreaInsets();
	const [activeCategory, setActiveCategory] = useState<CategoryTab>('cassino');
	const { requireAuth, isAuthenticated } = useRequireAuth();

	const handleCategoryPress = useCallback((category: CategoryTab) => {
		setActiveCategory(category);
		onCategoryChange?.(category);
	}, [onCategoryChange]);

	const handleLogin = useCallback(() => {
		requireAuth(() => {});
	}, [requireAuth]);

	const wrapperStyle = useAnimatedStyle(() => {
		const progress = interpolate(scrollY.value, [0, 100], [0, 1], Extrapolation.CLAMP);
		return {
			maxHeight: (1 - progress) * EXPANDED_HEIGHT,
			opacity: 1 - progress,
		};
	});

	const containerStyle = useMemo(
		() => [styles.container, { paddingTop: insets.top }],
		[insets.top],
	);

	return (
		<View style={containerStyle}>
			<View style={styles.topRow}>
				<Logo width={RFValue(70)} height={RFValue(24)} />

				<View style={styles.actions}>
					<TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
						<Search size={RFValue(18)} color={lightColors.textPrimary} strokeWidth={2} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
						<Settings size={RFValue(18)} color={lightColors.textPrimary} strokeWidth={2} />
					</TouchableOpacity>
					{!isAuthenticated && (
						<TouchableOpacity style={styles.entrarBtn} activeOpacity={0.8} onPress={handleLogin}>
							<Text style={styles.entrarText}>Entrar</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>

			<Animated.View style={[styles.tabsWrapper, wrapperStyle]}>
				<View style={styles.categoryTabs}>
					<TouchableOpacity
						style={[styles.categoryTab, activeCategory === 'cassino' && styles.categoryTabActive]}
						onPress={() => handleCategoryPress('cassino')}
						activeOpacity={0.7}
					>
						<Image source={CASSINO_ICON} style={styles.categoryIcon} resizeMode="contain" />
						<Text style={[styles.categoryLabel, activeCategory === 'cassino' && styles.categoryLabelActive]}>
							Cassino
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.categoryTab, activeCategory === 'esportes' && styles.categoryTabActive]}
						onPress={() => handleCategoryPress('esportes')}
						activeOpacity={0.7}
					>
						<Image source={SOCCER_ICON} style={styles.categoryIcon} resizeMode="contain" />
						<Text style={[styles.categoryLabel, activeCategory === 'esportes' && styles.categoryLabelActive]}>
							Esportes
						</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: lightColors.background,
		paddingHorizontal: RFValue(14),
		paddingBottom: RFValue(8),
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 8,
	},
	topRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: RFValue(6),
	},
	actions: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(12),
	},
	iconBtn: {
		padding: RFValue(4),
	},
	entrarBtn: {
		backgroundColor: lightColors.accent,
		paddingHorizontal: RFValue(16),
		paddingVertical: RFValue(8),
		borderRadius: RFValue(8),
	},
	entrarText: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(11),
		color: lightColors.bgNav,
		letterSpacing: 0.1,
	},
	tabsWrapper: {
		overflow: 'hidden',
	},
	categoryTabs: {
		flexDirection: 'row',
		backgroundColor: 'rgba(255,255,255,0.08)',
		borderRadius: RFValue(10),
		padding: RFValue(3),
		marginTop: RFValue(12),
	},
	categoryTab: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: RFValue(8),
		borderRadius: RFValue(8),
		gap: RFValue(6),
	},
	categoryTabActive: {
		backgroundColor: lightColors.bgNav,
	},
	categoryIcon: {
		width: RFValue(14),
		height: RFValue(14),
	},
	categoryLabel: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(11),
		color: lightColors.textMuted,
		letterSpacing: 0.08,
	},
	categoryLabelActive: {
		color: lightColors.textPrimary,
		fontFamily: fontFamily.bold,
	},
});
