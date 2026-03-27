import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ClipboardList, ChevronRight } from 'lucide-react-native';
import { fontFamily, lightColors } from '@/stampd.config';
import { PromotionsLegalViewModel } from '../promotions.types';

interface PromotionsLegalCardProps {
	legal: PromotionsLegalViewModel;
	onPress: () => void;
}

export function PromotionsLegalCard({ legal, onPress }: PromotionsLegalCardProps) {
	return (
		<View style={styles.card}>
			<View style={styles.iconWrap}>
				<ClipboardList size={RFValue(18)} color={lightColors.accent} strokeWidth={2} />
			</View>
			<View style={styles.content}>
				<Text style={styles.title}>{legal.title}</Text>
				<Text style={styles.description}>{legal.description}</Text>
				<TouchableOpacity style={styles.link} onPress={onPress} activeOpacity={0.8}>
					<Text style={styles.linkText}>{legal.linkLabel}</Text>
					<ChevronRight size={RFValue(14)} color={lightColors.accent} strokeWidth={2.2} />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		marginHorizontal: RFValue(20),
		borderRadius: RFValue(16),
		padding: RFValue(16),
		backgroundColor: '#111B36',
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.04)',
		flexDirection: 'row',
		gap: RFValue(14),
	},
	iconWrap: {
		width: RFValue(34),
		height: RFValue(34),
		borderRadius: RFValue(12),
		backgroundColor: 'rgba(56,230,125,0.12)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	content: {
		flex: 1,
		gap: RFValue(8),
	},
	title: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(16),
		color: lightColors.textPrimary,
	},
	description: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(18),
		color: lightColors.textMuted,
	},
	link: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-start',
		gap: RFValue(6),
	},
	linkText: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(12),
		color: lightColors.accent,
	},
});
