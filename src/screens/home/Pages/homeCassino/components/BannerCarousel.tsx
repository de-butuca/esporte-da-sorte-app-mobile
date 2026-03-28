import React, { useCallback, useRef, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Dimensions,
	NativeSyntheticEvent,
	NativeScrollEvent,
	ImageBackground,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily } from '@/stampd.config';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthThemeStore } from '@/core/auth/useAuthThemeStore';

const { width: SCREEN_W } = Dimensions.get('window');
const BANNER_W = SCREEN_W - RFValue(32);
const BANNER_H = RFValue(120);
const BANNER_GAP = RFValue(10);

interface Banner {
	id: string;
	subtitle: string;
	title: string;
	image: any;
}

const BANNERS: Banner[] = [
	{
		id: '1',
		subtitle: 'Participe agora',
		title: 'PREMIO\nDIARIO',
		image: require('@assets/images/banners/banner-1.png'),
	},
	{
		id: '2',
		subtitle: 'Participe agora',
		title: 'TORNEIOS\n2026',
		image: require('@assets/images/banners/banner-2.png'),
	},
	{
		id: '3',
		subtitle: 'Participe agora',
		title: 'PREMIO\nDIARIO',
		image: require('@assets/images/banners/banner-3.png'),
	},
	{
		id: '4',
		subtitle: 'Participe agora',
		title: 'PREMIOS\nDIARIO',
		image: require('@assets/images/banners/banner-4.png'),
	},
];

export function BannerCarousel() {
	const [activeIndex, setActiveIndex] = useState(0);
	const flatListRef = useRef<FlatList>(null);
	const colors = useAuthThemeStore((s) => s.colors);

	const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const index = Math.round(e.nativeEvent.contentOffset.x / (BANNER_W + BANNER_GAP));
		setActiveIndex(index);
	}, []);

	const renderBanner = useCallback(({ item }: { item: Banner }) => (
		<View style={styles.bannerContainer}>
			<LinearGradient
				colors={[colors.gradientStart, colors.gradientEnd]}
				start={{ x: 0, y: 0.5 }}
				end={{ x: 1, y: 0.5 }}
				style={styles.banner}
			>
				<View style={styles.bannerContent}>
					<Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
					<Text style={[styles.bannerTitle, { color: colors.textPrimary }]}>{item.title}</Text>
				</View>
				<ImageBackground
					source={item.image}
					style={styles.bannerImage}
					resizeMode="cover"
				/>
			</LinearGradient>
		</View>
	), [colors]);

	const keyExtractor = useCallback((item: Banner) => item.id, []);

	return (
		<View style={styles.container}>
			<FlatList
				ref={flatListRef}
				data={BANNERS}
				renderItem={renderBanner}
				keyExtractor={keyExtractor}
				horizontal
				pagingEnabled={false}
				snapToInterval={BANNER_W + BANNER_GAP}
				decelerationRate="fast"
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
				onScroll={onScroll}
				scrollEventThrottle={16}
			/>
			<View style={styles.dots}>
				{BANNERS.map((_, i) => (
					<View
						key={i}
						style={[
							styles.dot,
							i === activeIndex
								? [styles.dotActive, { backgroundColor: colors.accent }]
								: styles.dotInactive,
						]}
					/>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: RFValue(8),
	},
	listContent: {
		paddingHorizontal: RFValue(14),
		gap: BANNER_GAP,
	},
	bannerContainer: {
		width: BANNER_W,
		height: BANNER_H,
		borderRadius: RFValue(12),
		overflow: 'hidden',
	},
	banner: {
		flex: 1,
		borderRadius: RFValue(12),
		flexDirection: 'row',
		overflow: 'hidden',
	},
	bannerContent: {
		flex: 1,
		justifyContent: 'center',
		paddingLeft: RFValue(16),
		gap: RFValue(3),
		zIndex: 1,
	},
	bannerSubtitle: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(9),
		color: 'rgba(255,255,255,0.8)',
	},
	bannerTitle: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(20),
		textTransform: 'uppercase',
		lineHeight: RFValue(22),
	},
	bannerImage: {
		width: RFValue(140),
		height: BANNER_H + RFValue(16),
		marginTop: RFValue(-10),
		marginRight: RFValue(-8),
	},
	dots: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: RFValue(5),
	},
	dot: {
		borderRadius: RFValue(3),
		height: RFValue(3),
	},
	dotActive: {
		width: RFValue(16),
	},
	dotInactive: {
		backgroundColor: 'rgba(160,160,200,0.4)',
		width: RFValue(3),
	},
});
