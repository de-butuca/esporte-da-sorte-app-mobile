import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { ChevronRight } from 'lucide-react-native';
import { ButtonBase } from '@/components/Button';
import { fontFamily, lightColors } from '@/stampd.config';
import { PromotionCardViewModel } from '../promotions.types';

interface PromotionCardProps {
	card: PromotionCardViewModel;
	onPress: (card: PromotionCardViewModel) => void;
}

export const PromotionCard = React.memo(function PromotionCard({ card, onPress }: PromotionCardProps) {
	const IconSvg = card.iconSvg;

	return (
		<View style={styles.shell}>
			<LinearGradient colors={card.gradient as [string, string, ...string[]]} style={styles.hero}>
				<View style={styles.iconBubble}>
					{IconSvg ? (
						<IconSvg width={RFValue(18)} height={RFValue(18)} />
					) : card.iconAsset ? (
						<Image source={card.iconAsset} style={styles.icon} contentFit="contain" />
					) : null}
				</View>
				{card.badge && (
					<View style={styles.badge}>
						<Text style={styles.badgeText}>{card.badge}</Text>
					</View>
				)}
			</LinearGradient>

			<View style={styles.body}>
				<Text style={styles.title}>{card.title}</Text>
				<Text style={styles.benefit}>{card.benefit}</Text>
				<Text style={styles.description}>{card.description}</Text>

				<View style={styles.highlights}>
					{card.highlights.map((item) => (
						<View key={item} style={styles.highlightRow}>
							<View style={styles.highlightDot} />
							<Text style={styles.highlightText}>{item}</Text>
						</View>
					))}
					{card.validUntilLabel && (
						<View style={styles.highlightRow}>
							<View style={styles.highlightDotMuted} />
							<Text style={styles.highlightMutedText}>{card.validUntilLabel}</Text>
						</View>
					)}
				</View>

				<View style={styles.buttonRow}>
					<ButtonBase
						text={card.ctaLabel}
						size="full"
						variant="accent"
						rightIcon={
							<ChevronRight size={RFValue(16)} color={lightColors.bgNav} strokeWidth={2.3} />
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
		backgroundColor: '#1A2332',
		borderRadius: 12,
		padding: RFValue(14),
		marginHorizontal: RFValue(20),
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.04)',
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
		color: lightColors.textPrimary,
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
		color: lightColors.textPrimary,
	},
	benefit: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(13),
		color: lightColors.textSecondary,
	},
	description: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(18),
		color: lightColors.textMuted,
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
		backgroundColor: lightColors.accent,
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
		color: lightColors.textSecondary,
	},
	highlightMutedText: {
		flex: 1,
		fontFamily: fontFamily.medium,
		fontSize: RFValue(11),
		color: lightColors.textInactive,
	},
	buttonRow: {
		paddingTop: RFValue(6),
	},
});
