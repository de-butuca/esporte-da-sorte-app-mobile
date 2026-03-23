// typography.ts
import { RFValue } from 'react-native-responsive-fontsize';
import { TextStyle } from 'react-native';

/** Fontes Inter disponíveis */
export const fontFamily = {
	regular: 'Inter_400Regular',
	medium: 'Inter_500Medium',
	bold: 'Inter_700Bold',
} as const;

export const typography = {
	/*
  |--------------------------------------------------------------------------
  | Tamanhos
  |--------------------------------------------------------------------------
  */

	textXs: RFValue(12),
	textSm: RFValue(14),
	textBase: RFValue(16),
	textLg: RFValue(18),
	textXl: RFValue(20),
	text2xl: RFValue(22),
	text3xl: RFValue(24),
	fontFamily: {
		default: {
			regular: fontFamily.regular,
			medium: fontFamily.medium,
			bold: fontFamily.bold,
		},
	},

	/*
  |--------------------------------------------------------------------------
  | Base default do app
  |--------------------------------------------------------------------------
  */

	base: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(16),
	},

	/*
  |--------------------------------------------------------------------------
  | Presets prontos (opcional - profissional)
  |--------------------------------------------------------------------------
  */

	h1: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(24),
	},

	h2: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(20),
	},

	body: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(16),
	},
} as const;
