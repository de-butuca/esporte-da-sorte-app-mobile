import { Styled } from '@/theme/useStyled';

const Container = Styled.TouchableOpacity({
	style: ({ theme }) => ({
		backgroundColor: theme.colors.primary,
		borderRadius: theme.radius.roundedLg,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'flex-start',
		...theme.shadows.level2,
	}),
	attrs: {
		activeOpacity: 0.8,
	},
	variants: {
		size: {
			sm: ({ theme }) => ({ paddingHorizontal: theme.size.s4, paddingVertical: theme.size.s2 }),
			md: ({ theme }) => ({}),
			lg: ({ theme }) => ({}),
			full: ({ theme }) => ({ padding: theme.size.s4, width: '100%' }),
		},
	},
});

const Text = Styled.Text({
	style: ({ theme }) => ({
		color: theme.colors.onPrimary,
		fontSize: theme.typography.textBase,
		fontFamily: theme.typography.fontFamily.default.bold,
	}),
});

export const BBS = { container: Container, Text };
