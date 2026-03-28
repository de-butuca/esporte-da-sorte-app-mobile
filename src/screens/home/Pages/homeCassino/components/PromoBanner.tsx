import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily } from '@/stampd.config';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthThemeStore } from '@/core/auth/useAuthThemeStore';

const PROMO_IMAGE = require('@assets/images/banners/banner-3.png');

export function PromoBanner() {
	const colors = useAuthThemeStore((s) => s.colors);

	return (
		<View style={styles.wrapper}>
			<LinearGradient
				colors={[colors.gradientStart, colors.gradientEnd]}
				start={{ x: 0, y: 0.5 }}
				end={{ x: 1, y: 0.5 }}
				style={styles.container}
			>
				<View style={styles.content}>
					<Text style={styles.subtitle}>Ganhe bônus de até 100%</Text>
					<Text style={[styles.title, { color: colors.textPrimary }]}>Faça seu primeiro depósito</Text>
					<TouchableOpacity style={[styles.button, { backgroundColor: colors.accent }]} activeOpacity={0.8}>
						<Text style={[styles.buttonText, { color: colors.bgNav }]}>Depositar agora</Text>
					</TouchableOpacity>
				</View>
				<ImageBackground
					source={PROMO_IMAGE}
					style={styles.image}
					resizeMode="cover"
				/>
			</LinearGradient>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: RFValue(14),
	},
	container: {
		height: RFValue(120),
		borderRadius: RFValue(12),
		flexDirection: 'row',
		overflow: 'hidden',
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		paddingLeft: RFValue(16),
		gap: RFValue(6),
		zIndex: 1,
	},
	subtitle: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(9),
		color: 'rgba(255,255,255,0.8)',
	},
	title: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(16),
		lineHeight: RFValue(20),
	},
	button: {
		paddingHorizontal: RFValue(16),
		paddingVertical: RFValue(8),
		borderRadius: RFValue(8),
		alignSelf: 'flex-start',
	},
	buttonText: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(11),
	},
	image: {
		width: RFValue(130),
		height: RFValue(140),
		marginTop: RFValue(-10),
		marginRight: RFValue(-8),
	},
});
