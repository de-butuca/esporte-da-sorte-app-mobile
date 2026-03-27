import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily } from '@/theme/design-tokens';
import { LinearGradient } from 'expo-linear-gradient';

const PROMO_IMAGE = require('@assets/images/banners/banner-3.png');

export function PromoBanner() {
	return (
		<View style={styles.wrapper}>
			<LinearGradient
				colors={['#023397', '#38E67D']}
				start={{ x: 0, y: 0.5 }}
				end={{ x: 1, y: 0.5 }}
				style={styles.container}
			>
				<View style={styles.content}>
					<Text style={styles.subtitle}>Ganhe bonus de ate 100%</Text>
					<Text style={styles.title}>Faca seu primeiro deposito</Text>
					<TouchableOpacity style={styles.button} activeOpacity={0.8}>
						<Text style={styles.buttonText}>Depositar agora</Text>
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
		paddingHorizontal: RFValue(20),
	},
	container: {
		height: RFValue(170),
		borderRadius: RFValue(10),
		flexDirection: 'row',
		overflow: 'hidden',
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		paddingLeft: RFValue(16),
		gap: RFValue(8),
		zIndex: 1,
	},
	subtitle: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(9),
		color: '#3AE77E',
	},
	title: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(20),
		color: '#FFFFFF',
		lineHeight: RFValue(24),
	},
	button: {
		backgroundColor: '#38E67D',
		paddingHorizontal: RFValue(16),
		paddingVertical: RFValue(10),
		borderRadius: RFValue(10),
		alignSelf: 'flex-start',
	},
	buttonText: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(11),
		color: '#02003D',
	},
	image: {
		width: RFValue(180),
		height: RFValue(190),
		marginTop: RFValue(-14),
		marginRight: RFValue(-10),
	},
});
