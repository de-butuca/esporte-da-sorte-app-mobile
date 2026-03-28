import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { HelpCircle } from 'lucide-react-native';
import { fontFamily, lightColors } from '@/stampd.config';
import { PromotionsSupportViewModel } from '../promotions.types';

interface PromotionsSupportCardProps {
	support: PromotionsSupportViewModel;
	onPress: () => void;
}

export function PromotionsSupportCard({ support, onPress }: PromotionsSupportCardProps) {
	return (
		<View style={styles.card}>
			<View style={styles.iconWrap}>
				<HelpCircle size={RFValue(18)} color={lightColors.accent} strokeWidth={2} />
			</View>
			<Text style={styles.title}>{support.title}</Text>
			<Text style={styles.description}>{support.description}</Text>
			<TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
				<Text style={styles.buttonText}>{support.buttonLabel}</Text>
			</TouchableOpacity>
			<Text style={styles.helperText}>{support.helperText}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		marginHorizontal: 0,
		borderRadius: 12,
		padding: RFValue(20),
		backgroundColor: '#1A2332',
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.04)',
		alignItems: 'center',
	},
	iconWrap: {
		width: RFValue(42),
		height: RFValue(42),
		borderRadius: RFValue(14),
		backgroundColor: 'rgba(56,230,125,0.12)',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: RFValue(14),
	},
	title: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(18),
		color: lightColors.textPrimary,
		textAlign: 'center',
		marginBottom: RFValue(8),
	},
	description: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(18),
		color: lightColors.textMuted,
		textAlign: 'center',
		marginBottom: RFValue(18),
	},
	button: {
		width: '100%',
		height: 48,
		borderRadius: 12,
		backgroundColor: '#00E878',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: RFValue(12),
	},
	buttonText: {
		fontFamily: fontFamily.semibold,
		fontSize: 16,
		color: '#0B1120',
	},
	helperText: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(11),
		color: lightColors.textInactive,
		textAlign: 'center',
	},
});
