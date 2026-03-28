/**
 * EDS Design System — UI Theme tokens (React Native)
 * Centralized tokens for all UI components.
 */
import { lightColors, fontFamily } from '@/stampd.config';
import { RFValue } from 'react-native-responsive-fontsize';

export const ui = {
	colors: lightColors,

	radius: {
		sm: RFValue(4),
		md: RFValue(8),
		lg: RFValue(12),
		full: 9999,
	},

	size: {
		sm: RFValue(32),
		md: RFValue(40),
		lg: RFValue(48),
	},

	font: fontFamily,

	fontSize: {
		xs: RFValue(10),
		sm: RFValue(12),
		base: RFValue(14),
		md: RFValue(16),
		lg: RFValue(18),
	},
} as const;
