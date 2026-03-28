import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { ChevronRight } from 'lucide-react-native';
import { ButtonBase } from '@/components/Button';
import { fontFamily } from '@/stampd.config';
import { useAuthThemeStore } from '@/core/auth/useAuthThemeStore';
import { PromotionCardViewModel } from '../promotions.types';

interface PromotionCardProps {
	card: PromotionCardViewModel;
	onPress: (card: PromotionCardViewModel) => void;
}

export const PromotionCard = React.memo(function PromotionCard({ card, onPress }: PromotionCardProps) {
	const colors = useAuthThemeStore((s) => s.colors);

	return (
		<View style={[styles.shell, { backgroundColor: colors.surface1, borderColor: colors.border }]}>
			<LinearGradient colors={card.gradient as [string, string, ...string[]]} style={styles.hero}>
				<View style={styles.iconBubble}>
					<Image source={card.iconAsset} style={styles.icon} contentFit="contain" />
				</View>
				{card.badge && (
					<View style={styles.badge}>
						<Text style={[styles.badgeText, { color: colors.textPrimary }]}>{card.badge}</Text>
					</View>
				)}
			</LinearGradient>

			<View style={styles.body}>
				<Text style={[styles.title, { color: colors.textPrimary }]}>{card.title}</Text>
				<Text style={[styles.benefit, { color: colors.textSecondary }]}>{card.benefit}</Text>
				<Text style={[styles.description, { color: colors.textMuted }]}>{card.description}</Text>

				<View style={styles.highlights}>
					{card.highlights.map((item) => (
						<View key={item} style={styles.highlightRow}>
							<View style={[styles.highlightDot, { backgroundColor: colors.accent }]} />
							<Text style={[styles.highlightText, { color: colors.textSecondary }]}>{item}</Text>
						</View>
					))}
					{card.validUntilLabel && (
						<View style={styles.highlightRow}>
							<View style={styles.highlightDotMuted} />
							<Text style={[styles.highlightMutedText, { color: colors.textDisabled }]}>{card.validUntilLabel}</Text>
						</View>
					)}
				</View>

				<View style={styles.buttonRow}>
					<ButtonBase
						text={card.ctaLabel}
						size="full"
						variant="accent"
						rightIcon={
							<ChevronRight size={RFValue(16)} color={colors.onPrimary} strokeWidth={2.3} />
						}
						onPress={() => onPress(card)}
					/>
				</View>
			</View>
		</View>
	);
});

const styles = StyleSheet.create({
	shell: {
		borderRadius: 12,
		padding: RFValue(14),
		marginHorizontal: RFValue(20),
		borderWidth: 1,
	},
	hero: {
		height: RFValue(126),
		borderRadius: 12,
		padding: RFValue(14),
		justifyContent: 'space-between',
	},
	iconBubble: {
		width: RFValue(34),
		height: RFValue(34),
		borderRadius: 12,
		backgroundColor: 'rgba(255,255,255,0.14)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		width: RFValue(18),
		height: RFValue(18),
	},
	badge: {
		position: 'absolute',
		top: RFValue(12),
		right: RFValue(12),
		backgroundColor: 'rgba(1,0,58,0.72)',
		borderRadius: 8,
		paddingHorizontal: RFValue(8),
		paddingVertical: RFValue(4),
	},
	badgeText: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(9),
		letterSpacing: 0.5,
	},
	body: {
		paddingTop: RFValue(16),
		gap: RFValue(10),
	},
	title: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(24),
		lineHeight: RFValue(28),
	},
	benefit: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(13),
	},
	description: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(18),
	},
	highlights: {
		gap: RFValue(8),
		paddingTop: RFValue(4),
	},
	highlightRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(8),
	},
	highlightDot: {
		width: RFValue(6),
		height: RFValue(6),
		borderRadius: RFValue(3),
	},
	highlightDotMuted: {
		width: RFValue(6),
		height: RFValue(6),
		borderRadius: RFValue(3),
		backgroundColor: 'rgba(255,255,255,0.2)',
	},
	highlightText: {
		flex: 1,
		fontFamily: fontFamily.regular,
		fontSize: RFValue(11),
	},
	highlightMutedText: {
		flex: 1,
		fontFamily: fontFamily.medium,
		fontSize: RFValue(11),
	},
	buttonRow: {
		paddingTop: RFValue(6),
	},
});
