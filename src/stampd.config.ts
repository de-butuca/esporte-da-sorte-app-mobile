import { createTheme } from 'stampd/theme';
import { lightColors, darkColors, fontFamily } from './theme/design-tokens';

export const config = createTheme({
	// ── Compile-time tokens ──────────────────────────────────────────────────
	tokens: {
		spacing: {
			p1: 4,
			p2: 8,
			p3: 12,
			p4: 16,
			p5: 20,
			p6: 24,
			p8: 32,
			m1: 4,
			m2: 8,
			m3: 12,
			m4: 16,
			m5: 20,
			m6: 24,
			m8: 32,
			gap1: 4,
			gap2: 8,
			gap3: 12,
			gap4: 16,
			gap5: 20,
			gap6: 24,
			gap8: 32,
		},
		radius: {
			roundedSm: 2,
			rounded: 4,
			roundedMd: 8,
			roundedLg: 12,
			roundedXl: 16,
			roundedFull: 9999,
		},
		size: {
			s1: 4,
			s2: 8,
			s3: 12,
			s4: 16,
			s5: 20,
			s6: 24,
			s7: 28,
			s8: 32,
			s10: 40,
			s12: 48,
			s14: 56,
			s16: 64,
			s20: 80,
			s24: 96,
			s28: 112,
			s32: 128,
		},
	},

	// ── Runtime theme ────────────────────────────────────────────────────────
	theme: {
		light: { colors: lightColors },
		dark: { colors: darkColors },
		highContrast: { colors: { background: '#000' } },
	},

	// ── Fonts ────────────────────────────────────────────────────────────────
	fonts: {
		default: { size: 16, family: fontFamily.regular },
		sizes: { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, xl2: 22, xl3: 24 },
		family: {
			regular: fontFamily.regular,
			medium: fontFamily.medium,
			bold: fontFamily.bold,
		},
	},
});
