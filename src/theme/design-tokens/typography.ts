/**
 * EDS Design System — Typography tokens
 * Font: Inter (Regular 400, Medium 500, SemiBold 600, Bold 700, ExtraBold 800)
 *
 * Scale from Figma:
 *   10px SemiBold LH14 LS0.08 (UPPERCASE) — caption
 *   12px Regular  LH16 LS0.01             — small
 *   14px Regular|Medium|Bold LH20         — body
 *   16px Medium   LH22                    — bodyLg
 *   18px SemiBold LH24                    — subtitle
 *   20px SemiBold LH28                    — h4
 *   24px Bold     LH32                    — h3
 *   32px Bold     LH40 LS-0.01           — h2
 *   40px ExtraBold LH48 LS-0.02          — h1
 */
import { RFValue } from 'react-native-responsive-fontsize';
import { TextStyle } from 'react-native';

export const fontFamily = {
	regular: 'Inter_400Regular',
	medium: 'Inter_500Medium',
	semibold: 'Inter_600SemiBold',
	bold: 'Inter_700Bold',
} as const;

export const typography = {
	// Sizes
	textXs: RFValue(10),
	textSm: RFValue(12),
	textBase: RFValue(14),
	textMd: RFValue(16),
	textLg: RFValue(18),
	textXl: RFValue(20),
	text2xl: RFValue(24),
	text3xl: RFValue(32),
	text4xl: RFValue(40),

	fontFamily: {
		default: {
			regular: fontFamily.regular,
			medium: fontFamily.medium,
			semibold: fontFamily.semibold,
			bold: fontFamily.bold,
		},
	},

	// Base
	base: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(14),
		lineHeight: RFValue(20),
	} as TextStyle,

	// Presets
	h1: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(40),
		lineHeight: RFValue(48),
		letterSpacing: -0.02,
	} as TextStyle,

	h2: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(32),
		lineHeight: RFValue(40),
		letterSpacing: -0.01,
	} as TextStyle,

	h3: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(24),
		lineHeight: RFValue(32),
	} as TextStyle,

	h4: {
		fontFamily: fontFamily.semibold,
		fontSize: RFValue(20),
		lineHeight: RFValue(28),
	} as TextStyle,

	subtitle: {
		fontFamily: fontFamily.semibold,
		fontSize: RFValue(18),
		lineHeight: RFValue(24),
	} as TextStyle,

	bodyLg: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(16),
		lineHeight: RFValue(22),
	} as TextStyle,

	body: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(14),
		lineHeight: RFValue(20),
	} as TextStyle,

	bodyMedium: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(14),
		lineHeight: RFValue(20),
	} as TextStyle,

	bodyBold: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(14),
		lineHeight: RFValue(20),
	} as TextStyle,

	small: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(16),
		letterSpacing: 0.01,
	} as TextStyle,

	caption: {
		fontFamily: fontFamily.semibold,
		fontSize: RFValue(10),
		lineHeight: RFValue(14),
		letterSpacing: 0.08,
		textTransform: 'uppercase',
	} as TextStyle,
} as const;
