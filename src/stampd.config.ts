import { createTheme } from 'stampd/theme';

export const lightColors = {
	primary: '#023697',
	onPrimary: 'black',

	secondary: '#625B71',
	onSecondary: '#FFFFFF',

	background: '#0D0A1A',
	onBackground: '#FFFFFF',

	bgNav: '#120E22',
	bgCard: '#1A1229',
	bgSecondary: '#120E22',

	accent: '#38E67D',
	accentText: '#37E67D',

	textPrimary: '#FFFFFF',
	textSecondary: '#F0F0F0',
	textMuted: '#A0A0B0',
	textInactive: '#6B6B8A',

	live: '#FF3B3B',
	success: '#22C55E',

	label: '#fff',
	inputText: '#000000',
	inputPlaceholder: '#a0a0a0',
	inputIcon: '#7D5260',
	inputBackground: '#f5c542',
	inputPrimary: '#4245d0',
	inputSercundary: '#ae3c91',

	surface: '#FFFBFE',
	onSurface: '#1C1B1F',

	error: '#B3261E',
	onError: '#FFFFFF',
};

/** Dark = Esportes (Dark Arena — navy/green) */
export const darkColors = {
	primary: '#00E878',
	onPrimary: '#0B1120',

	secondary: '#1B1464',
	onSecondary: '#FFFFFF',

	background: '#0B1120',
	onBackground: '#FFFFFF',

	bgNav: '#101828',
	bgCard: '#1A2332',
	bgSecondary: '#101828',

	accent: '#00E878',
	accentText: '#00E878',

	textPrimary: '#FFFFFF',
	textSecondary: '#94A3B8',
	textMuted: '#94A3B8',
	textInactive: '#475569',

	live: '#FF3B30',
	success: '#22C55E',

	label: '#FFFFFF',
	inputText: '#FFFFFF',
	inputPlaceholder: '#475569',
	inputIcon: '#94A3B8',
	inputBackground: '#1A2332',
	inputPrimary: '#00E878',
	inputSercundary: '#00B4D8',

	surface: '#1A2332',
	onSurface: '#E2E8F0',

	error: '#EF4444',
	onError: '#FFFFFF',
};
// ── Theme variants (Cassino / Esportes) ──────────────────────────────────────

export type ThemeVariant = 'cassino' | 'esportes';

/** @deprecated use ThemeVariant */
export type LoginVariant = ThemeVariant;

/** Casino Royale — purple palette, green accents */
export const cassinoColors = {
	// ── Brand ──────────────────────────────────────────────────
	primary: '#00E878',
	primaryDark: '#00C466',
	primaryLight: '#33ED94',
	onPrimary: '#0D0A1A',
	secondary: '#1B1464',
	accent: '#00E878',
	accentCyan: '#7C3AED',

	// ── Backgrounds ───────────────────────────────────────────
	background: '#0D0A1A',
	bgSecondary: '#120E22',
	bgNav: '#120E22',
	bgCard: '#1A1229',

	// ── Surfaces ──────────────────────────────────────────────
	surface1: '#1A1229',
	surface2: '#251A38',
	surface3: '#33244A',

	// ── Text ──────────────────────────────────────────────────
	textPrimary: '#E8E0F5',
	textSecondary: '#9E91BA',
	textMuted: '#9E91BA',
	textDisabled: '#584C71',

	// ── Semantic ──────────────────────────────────────────────
	success: '#22C55E',
	error: '#EF4444',
	warning: '#F59E0B',
	info: '#818CF8',
	live: '#E11D48',

	// ── Border / Input ────────────────────────────────────────
	border: 'rgba(152,129,186,0.2)',
	inputBackground: '#1A1229',
	inputPlaceholder: '#584C71',
	inputFocusBorder: '#00E878',
	inputErrorBorder: '#E11D48',

	// ── Gradients ─────────────────────────────────────────────
	gradientStart: '#1B1464',
	gradientEnd: '#7C3AED',
} as const;

/** Dark Arena — green/navy palette */
export const esportesColors = {
	// ── Brand ──────────────────────────────────────────────────
	primary: '#00E878',
	primaryDark: '#00C466',
	primaryLight: '#33ED94',
	onPrimary: '#0B1120',
	secondary: '#1B1464',
	accent: '#00E878',
	accentCyan: '#00B4D8',

	// ── Backgrounds ───────────────────────────────────────────
	background: '#0B1120',
	bgSecondary: '#101828',
	bgNav: '#101828',
	bgCard: '#1A2332',

	// ── Surfaces ──────────────────────────────────────────────
	surface1: '#1A2332',
	surface2: '#243447',
	surface3: '#2D3F54',

	// ── Text ──────────────────────────────────────────────────
	textPrimary: '#FFFFFF',
	textSecondary: '#94A3B8',
	textMuted: '#94A3B8',
	textDisabled: '#475569',

	// ── Semantic ──────────────────────────────────────────────
	success: '#22C55E',
	error: '#EF4444',
	warning: '#F59E0B',
	info: '#3B82F6',
	live: '#FF3B30',

	// ── Border / Input ────────────────────────────────────────
	border: 'rgba(148,163,184,0.2)',
	inputBackground: '#1A2332',
	inputPlaceholder: '#475569',
	inputFocusBorder: '#00E878',
	inputErrorBorder: '#EF4444',

	// ── Gradients ─────────────────────────────────────────────
	gradientStart: '#1B1464',
	gradientEnd: '#00E878',
} as const;

export type AppThemeColors = {
	[K in keyof typeof cassinoColors]: string;
};

/** @deprecated use AppThemeColors */
export type LoginThemeColors = AppThemeColors;

export function getThemeColors(variant: ThemeVariant): AppThemeColors {
	return variant === 'cassino' ? cassinoColors : esportesColors;
}

/** @deprecated use getThemeColors */
export const getLoginThemeColors = getThemeColors;

// ── Font family ───────────────────────────────────────────────────────────────

export const fontFamily = {
	regular: 'Inter_400Regular',
	medium: 'Inter_500Medium',
	semibold: 'Inter_600SemiBold',
	bold: 'Inter_700Bold',
} as const;

export const shadows = {
	level1: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.08,
		shadowRadius: 2,
		elevation: 2,
	},
	level2: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.12,
		shadowRadius: 4,
		elevation: 4,
	},
	level3: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.16,
		shadowRadius: 8,
		elevation: 8,
	},
	level4: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.2,
		shadowRadius: 12,
		elevation: 16,
	},
};

export const config = createTheme({
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
	theme: {
		light: { colors: lightColors },
		dark: { colors: darkColors },
		highContrast: {
			colors: {
				primary: '#00D46A',
				onPrimary: '#fffb00',

				secondary: '#1B1464',
				onSecondary: 'yellow',

				background: '#000000',
				onBackground: 'yellow',

				bgNav: '#101828',
				bgCard: '#1E293B',
				bgSecondary: '#101828',

				accent: '#00D46A',
				accentText: '#00FF88',

				textPrimary: 'yellow',
				textSecondary: 'yellow',
				textMuted: 'yellow',
				textInactive: 'yellow',

				live: '#FF3B30',
				success: '#22C55E',

				label: 'yellow',
				inputText: 'yellow',
				inputPlaceholder: '#94A3B8',
				inputIcon: '#CBD5F5',
				inputBackground: '#0F172A',
				inputPrimary: '#00D46A',
				inputSercundary: '#00B4D8',

				surface: '#1E293B',
				onSurface: '#F1F5F9',

				error: '#EF4444',
				onError: 'yellow',
			},
		},
	},
	fonts: {
		default: { size: 14, family: fontFamily.regular },
		sizes: { xs: 10, sm: 12, base: 14, md: 16, lg: 18, xl: 20, xl2: 24, xl3: 32 },
		family: {
			regular: fontFamily.regular,
			medium: fontFamily.medium,
			semibold: fontFamily.semibold,
			bold: fontFamily.bold,
		},
	},
});
