import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { ButtonBase } from '@/components/Button';
import { fontFamily } from '@/stampd.config';
import { useAuthThemeStore } from '@/core/auth/useAuthThemeStore';
import { PromotionHeroViewModel } from '../promotions.types';

interface PromotionsHeroProps {
	hero: PromotionHeroViewModel;
	onPress: (hero: PromotionHeroViewModel) => void;
}

export function PromotionsHero({ hero, onPress }: PromotionsHeroProps) {
	const colors = useAuthThemeStore((s) => s.colors);
	const [useFallbackImage, setUseFallbackImage] = useState(false);

	return (
		<View style={styles.wrapper}>
			<LinearGradient colors={hero.gradient as [string, string, ...string[]]} style={styles.card}>
				<View style={styles.content}>
					<Text style={styles.eyebrow}>{hero.eyebrow}</Text>
					<Text style={[styles.title, { color: colors.textPrimary }]}>{hero.title}</Text>
					<Text style={styles.description}>{hero.description}</Text>
					<ButtonBase
						text={hero.ctaLabel}
						size="sm"
						variant="accent"
						onPress={() => onPress(hero)}
					/>
				</View>

				<Image
					source={useFallbackImage ? hero.fallbackAsset : hero.imageUrl ?? hero.fallbackAsset}
					style={styles.image}
					contentFit="contain"
					onError={() => setUseFallbackImage(true)}
				/>
			</LinearGradient>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: RFValue(20),
		paddingTop: RFValue(12),
	},
	card: {
		minHeight: RFValue(162),
		borderRadius: RFValue(18),
		padding: RFValue(18),
		flexDirection: 'row',
		overflow: 'hidden',
	},
	content: {
		flex: 1,
		zIndex: 1,
		paddingRight: RFValue(12),
		justifyContent: 'space-between',
	},
	eyebrow: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(11),
		color: 'rgba(255,255,255,0.82)',
		textTransform: 'uppercase',
		letterSpacing: 0.8,
		marginBottom: RFValue(8),
	},
	title: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(24),
		lineHeight: RFValue(26),
		marginBottom: RFValue(10),
	},
	description: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(18),
		color: 'rgba(255,255,255,0.88)',
		marginBottom: RFValue(16),
		maxWidth: '92%',
	},
	image: {
		width: RFValue(136),
		height: RFValue(154),
		alignSelf: 'flex-end',
		marginRight: RFValue(-8),
		marginBottom: RFValue(-12),
	},
});
