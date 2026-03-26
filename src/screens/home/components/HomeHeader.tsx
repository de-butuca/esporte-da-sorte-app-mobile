import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily } from '@/theme/design-tokens';
import { Search, TicketPercent } from 'lucide-react-native';
import Logo from '@assets/images/logo-square.svg';
import Animated, {
	useAnimatedStyle,
	SharedValue,
	interpolate,
	Extrapolation,
} from 'react-native-reanimated';

const CASSINO_ICON = require('@assets/images/cassino-coin-icon.png');
const SOCCER_ICON = require('@assets/images/soccer-ball-icon.png');

// Pre-calculate outside worklet
const EXPANDED_HEIGHT = RFValue(56);

type CategoryTab = 'cassino' | 'esportes';

interface HomeHeaderProps {
	scrollY: SharedValue<number>;
}

export function HomeHeader({ scrollY }: HomeHeaderProps) {
	const insets = useSafeAreaInsets();
	const [activeCategory, setActiveCategory] = useState<CategoryTab>('cassino');

	const wrapperStyle = useAnimatedStyle(() => {
		const progress = interpolate(scrollY.value, [0, 100], [0, 1], Extrapolation.CLAMP);
		return {
			maxHeight: (1 - progress) * EXPANDED_HEIGHT,
			opacity: 1 - progress,
		};
	});

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<View style={styles.topRow}>
				<Logo width={RFValue(80)} height={RFValue(28)} />

				<View style={styles.actions}>
					<TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
						<Search size={RFValue(20)} color="#fff" strokeWidth={2} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
						<TicketPercent size={RFValue(20)} color="#fff" strokeWidth={2} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.entrarBtn} activeOpacity={0.8}>
						<Text style={styles.entrarText}>Entrar</Text>
					</TouchableOpacity>
				</View>
			</View>

			<Animated.View style={[styles.tabsWrapper, wrapperStyle]}>
				<View style={styles.categoryTabs}>
					<TouchableOpacity
						style={[styles.categoryTab, activeCategory === 'cassino' && styles.categoryTabActive]}
						onPress={() => setActiveCategory('cassino')}
						activeOpacity={0.7}
					>
						<Image source={CASSINO_ICON} style={styles.categoryIcon} resizeMode="contain" />
						<Text
							style={[
								styles.categoryLabel,
								activeCategory === 'cassino' && styles.categoryLabelActive,
							]}
						>
							Cassino
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.categoryTab, activeCategory === 'esportes' && styles.categoryTabActive]}
						onPress={() => setActiveCategory('esportes')}
						activeOpacity={0.7}
					>
						<Image source={SOCCER_ICON} style={styles.categoryIcon} resizeMode="contain" />
						<Text
							style={[
								styles.categoryLabel,
								activeCategory === 'esportes' && styles.categoryLabelActive,
							]}
						>
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
		backgroundColor: '#01003A',
		paddingHorizontal: RFValue(20),
		paddingBottom: RFValue(12),
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.3,
		shadowRadius: 12,
		elevation: 12,
	},
	topRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: RFValue(8),
	},
	actions: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(14),
	},
	iconBtn: {
		padding: RFValue(4),
	},
	entrarBtn: {
		backgroundColor: '#38E67D',
		paddingHorizontal: RFValue(20),
		paddingVertical: RFValue(10),
		borderRadius: RFValue(10),
	},
	entrarText: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(13),
		color: '#01003A',
	},
	tabsWrapper: {
		overflow: 'hidden',
	},
	categoryTabs: {
		flexDirection: 'row',
		backgroundColor: 'rgba(255,255,255,0.15)',
		borderRadius: RFValue(10),
		padding: RFValue(4),
		marginTop: RFValue(16),
	},
	categoryTab: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: RFValue(8),
		borderRadius: RFValue(10),
		gap: RFValue(8),
	},
	categoryTabActive: {
		backgroundColor: '#02003D',
	},
	categoryIcon: {
		width: RFValue(16),
		height: RFValue(16),
	},
	categoryLabel: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(11),
		color: '#A0A0B0',
		letterSpacing: 0.08,
	},
	categoryLabelActive: {
		color: '#FFFFFF',
	},
});
