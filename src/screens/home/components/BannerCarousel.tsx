import React, { useRef, useState } from 'react';
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
import { fontFamily } from '@/theme/design-tokens';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_W } = Dimensions.get('window');
const BANNER_W = SCREEN_W - RFValue(40);
const BANNER_H = RFValue(150);
const BANNER_GAP = RFValue(14);

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

	const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const index = Math.round(e.nativeEvent.contentOffset.x / (BANNER_W + BANNER_GAP));
		setActiveIndex(index);
	};

	const renderBanner = ({ item }: { item: Banner }) => (
		<View style={styles.bannerContainer}>
			<LinearGradient
				colors={['#023397', '#38E67D']}
				start={{ x: 0, y: 0.5 }}
				end={{ x: 1, y: 0.5 }}
				style={styles.banner}
			>
				<View style={styles.bannerContent}>
					<Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
					<Text style={styles.bannerTitle}>{item.title}</Text>
				</View>
				<ImageBackground
					source={item.image}
					style={styles.bannerImage}
					resizeMode="cover"
				/>
			</LinearGradient>
		</View>
	);

	return (
		<View style={styles.container}>
			<FlatList
				ref={flatListRef}
				data={BANNERS}
				renderItem={renderBanner}
				keyExtractor={(item) => item.id}
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
						style={[styles.dot, i === activeIndex ? styles.dotActive : styles.dotInactive]}
					/>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: RFValue(12),
	},
	listContent: {
		paddingHorizontal: RFValue(20),
		gap: BANNER_GAP,
	},
	bannerContainer: {
		width: BANNER_W,
		height: BANNER_H,
		borderRadius: RFValue(10),
		overflow: 'hidden',
	},
	banner: {
		flex: 1,
		borderRadius: RFValue(10),
		flexDirection: 'row',
		overflow: 'hidden',
	},
	bannerContent: {
		flex: 1,
		justifyContent: 'center',
		paddingLeft: RFValue(16),
		gap: RFValue(4),
		zIndex: 1,
	},
	bannerSubtitle: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(9),
		color: '#3AE77E',
	},
	bannerTitle: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(26),
		color: '#FFFFFF',
		textTransform: 'uppercase',
		lineHeight: RFValue(28),
	},
	bannerImage: {
		width: RFValue(200),
		height: BANNER_H + RFValue(30),
		marginTop: RFValue(-20),
		marginRight: RFValue(-10),
	},
	dots: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: RFValue(6),
	},
	dot: {
		borderRadius: RFValue(4),
		height: RFValue(6),
	},
	dotActive: {
		backgroundColor: '#38E67D',
		width: RFValue(20),
	},
	dotInactive: {
		backgroundColor: 'rgba(255,255,255,0.3)',
		width: RFValue(6),
	},
});
