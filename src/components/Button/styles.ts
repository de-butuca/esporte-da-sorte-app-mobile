import { Styled } from '@/theme/useStyled';

const Container = Styled.TouchableOpacity({
	style: ({ theme }) => ({
		backgroundColor: theme.colors.primary,
		padding: theme.size.s4,
		width: '100%',
		borderRadius: theme.radius.roundedLg,
		alignItems: 'center',
		justifyContent: 'center',
		...theme.shadows.level2,
	}),
	attrs: {
		activeOpacity: 0.8,
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
