import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { HelpCircle } from 'lucide-react-native';
import { fontFamily } from '@/stampd.config';
import { useAuthThemeStore } from '@/core/auth/useAuthThemeStore';
import { PromotionsSupportViewModel } from '../promotions.types';

interface PromotionsSupportCardProps {
	support: PromotionsSupportViewModel;
	onPress: () => void;
}

export function PromotionsSupportCard({ support, onPress }: PromotionsSupportCardProps) {
	const colors = useAuthThemeStore((s) => s.colors);

	return (
		<View style={[styles.card, { backgroundColor: colors.surface1, borderColor: `${colors.border}` }]}>
			<View style={[styles.iconWrap, { backgroundColor: `${colors.accent}1F` }]}>
				<HelpCircle size={RFValue(18)} color={colors.accent} strokeWidth={2} />
			</View>
			<Text style={[styles.title, { color: colors.textPrimary }]}>{support.title}</Text>
			<Text style={[styles.description, { color: colors.textMuted }]}>{support.description}</Text>
			<TouchableOpacity style={[styles.button, { backgroundColor: colors.accent }]} onPress={onPress} activeOpacity={0.8}>
				<Text style={[styles.buttonText, { color: colors.onPrimary }]}>{support.buttonLabel}</Text>
			</TouchableOpacity>
			<Text style={[styles.helperText, { color: colors.textDisabled }]}>{support.helperText}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		marginHorizontal: 0,
		borderRadius: 12,
		padding: RFValue(20),
		borderWidth: 1,
		alignItems: 'center',
	},
	iconWrap: {
		width: RFValue(42),
		height: RFValue(42),
		borderRadius: RFValue(14),
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: RFValue(14),
	},
	title: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(18),
		textAlign: 'center',
		marginBottom: RFValue(8),
	},
	description: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(18),
		textAlign: 'center',
		marginBottom: RFValue(18),
	},
	button: {
		width: '100%',
		height: 48,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: RFValue(12),
	},
	buttonText: {
		fontFamily: fontFamily.semibold,
		fontSize: 16,
	},
	helperText: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(11),
		textAlign: 'center',
	},
});
