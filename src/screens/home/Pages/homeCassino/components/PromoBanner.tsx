import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import { useStampdUI } from 'stampd/context';
import { PBS } from '../homeCassino.styled';

const PROMO_IMAGE = require('@assets/images/banners/banner-3.png');

export function PromoBanner() {
	const { theme } = useStampdUI();

	return (
		<PBS.wrapper>
			<LinearGradient
				colors={[theme.colors.secondary, theme.colors.primary]}
				start={{ x: 0, y: 0.5 }}
				end={{ x: 1, y: 0.5 }}
				style={styles.gradient}
			>
				<PBS.content>
					<PBS.subtitle>Ganhe bônus de até 100%</PBS.subtitle>
					<PBS.title>Faça seu primeiro depósito</PBS.title>
					<PBS.button>
						<PBS.buttonText>Depositar agora</PBS.buttonText>
					</PBS.button>
				</PBS.content>
				<ImageBackground source={PROMO_IMAGE} style={styles.image} resizeMode="cover" />
			</LinearGradient>
		</PBS.wrapper>
	);
}

const styles = StyleSheet.create({
	gradient: {
		height: RFValue(170),
		borderRadius: RFValue(16),
		flexDirection: 'row',
		overflow: 'hidden',
	},
	image: {
		width: RFValue(130),
		height: RFValue(140),
		marginTop: RFValue(-10),
		marginRight: RFValue(-8),
	},
});
