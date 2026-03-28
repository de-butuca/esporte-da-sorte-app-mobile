import { createTheme } from 'stampd/theme';

export const lightColors = {
	primary: '#023697',
	onPrimary: 'black',

	secondary: '#625B71',
	onSecondary: '#FFFFFF',

	background: '#01003A',
	onBackground: '#FFFFFF',

	bgNav: '#02003D',
	bgCard: '#0A0F2E',

	accent: '#38E67D',
	accentText: '#37E67D',

	textPrimary: '#FFFFFF',
	textSecondary: '#F0F0F0',
	textMuted: '#A0A0B0',
	textInactive: '#6B6B8A',

	live: '#FF3B3B',

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

export const darkColors = lightColors;

export const fontFamily = {
	regular: 'Inter_400Regular',
	medium: 'Inter_500Medium',
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
		highContrast: { colors: { background: '#000' } },
	},
	fonts: {
		default: { size: 14, family: fontFamily.regular },
		sizes: { xs: 10, sm: 12, base: 14, md: 16, lg: 18, xl: 20, xl2: 24, xl3: 32 },
		family: {
			regular: fontFamily.regular,
			medium: fontFamily.medium,
			bold: fontFamily.bold,
		},
	},
});
