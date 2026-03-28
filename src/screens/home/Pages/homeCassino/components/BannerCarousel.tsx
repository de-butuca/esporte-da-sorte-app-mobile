import React, { useCallback, useRef, useState } from 'react';
import {
	StyleSheet,
	FlatList,
	Dimensions,
	NativeSyntheticEvent,
	NativeScrollEvent,
	ImageBackground,
	View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { lightColors } from '@/stampd.config';
import { LinearGradient } from 'expo-linear-gradient';
import { BCS } from '../homeCassino.styled';

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

	const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const index = Math.round(e.nativeEvent.contentOffset.x / (BANNER_W + BANNER_GAP));
		setActiveIndex(index);
	}, []);

	const renderBanner = useCallback(
		({ item }: { item: Banner }) => (
			<View style={styles.bannerContainer}>
				<LinearGradient
					colors={[lightColors.secondary, lightColors.primary]}
					start={{ x: 0, y: 0.5 }}
					end={{ x: 1, y: 0.5 }}
					style={styles.banner}
				>
					<BCS.bannerContent>
						<BCS.bannerSubtitle>{item.subtitle}</BCS.bannerSubtitle>
						<BCS.bannerTitle>{item.title}</BCS.bannerTitle>
					</BCS.bannerContent>
					<ImageBackground source={item.image} style={styles.bannerImage} resizeMode="cover" />
				</LinearGradient>
			</View>
		),
		[]
	);

	const keyExtractor = useCallback((item: Banner) => item.id, []);

	return (
		<BCS.container>
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
			<BCS.dots>
				{BANNERS.map((_, i) => (
					<BCS.dot key={i} {...({ state: i === activeIndex ? 'active' : 'inactive' } as any)} />
				))}
			</BCS.dots>
		</BCS.container>
	);
}

const styles = StyleSheet.create({
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
	bannerImage: {
		width: RFValue(140),
		height: BANNER_H + RFValue(16),
		marginTop: RFValue(-10),
		marginRight: RFValue(-8),
	},
});
