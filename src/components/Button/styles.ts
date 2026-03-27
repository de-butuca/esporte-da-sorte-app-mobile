import { shadows } from '@/theme/design-tokens';
import { Styled } from 'stampd/styled';

const Container = Styled.TouchableOpacity({
	style: ({ theme }) => ({
		backgroundColor: theme.colors.primary,
		borderRadius: theme.radius.roundedLg,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'flex-start',
		...shadows.level2,
	}),
	attrs: {
		activeOpacity: 0.8,
	},
	variants: {
		size: {
			sm: ({ theme }) => ({ paddingHorizontal: theme.size.s4, paddingVertical: theme.size.s2 }),
			md: () => ({}),
			lg: () => ({}),
			full: ({ theme }) => ({ padding: theme.size.s4, width: '100%' }),
		},
	},
});

const Text = Styled.Text({
	style: ({ theme }) => ({
		color: theme.colors.onPrimary,
		fontSize: theme.fonts.sizes.base,
		fontFamily: theme.fonts.family.bold,
	}),
});

export const BBS = { container: Container, Text };
