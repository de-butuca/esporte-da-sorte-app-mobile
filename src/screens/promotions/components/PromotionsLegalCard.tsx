import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ClipboardList, ChevronRight } from 'lucide-react-native';
import { fontFamily } from '@/stampd.config';
import { useAuthThemeStore } from '@/core/auth/useAuthThemeStore';
import { PromotionsLegalViewModel } from '../promotions.types';

interface PromotionsLegalCardProps {
	legal: PromotionsLegalViewModel;
	onPress: () => void;
}

export function PromotionsLegalCard({ legal, onPress }: PromotionsLegalCardProps) {
	const colors = useAuthThemeStore((s) => s.colors);

	return (
		<View style={[styles.card, { backgroundColor: colors.surface2, borderColor: colors.border }]}>
			<View style={[styles.iconWrap, { backgroundColor: `${colors.accent}1F` }]}>
				<ClipboardList size={RFValue(18)} color={colors.accent} strokeWidth={2} />
			</View>
			<View style={styles.content}>
				<Text style={[styles.title, { color: colors.textPrimary }]}>{legal.title}</Text>
				<Text style={[styles.description, { color: colors.textMuted }]}>{legal.description}</Text>
				<TouchableOpacity style={styles.link} onPress={onPress} activeOpacity={0.8}>
					<Text style={[styles.linkText, { color: colors.accent }]}>{legal.linkLabel}</Text>
					<ChevronRight size={RFValue(14)} color={colors.accent} strokeWidth={2.2} />
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
		borderWidth: 1,
		flexDirection: 'row',
		gap: RFValue(14),
	},
	iconWrap: {
		width: RFValue(34),
		height: RFValue(34),
		borderRadius: RFValue(12),
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
	},
	description: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(18),
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
	},
});
