import { Styled } from '@/theme/useStyled';
const Background = Styled.ImageBackground({
	style: ({ theme }) => ({
		flex: 1,
		padding: theme.size.s4,
	}),
	attrs: {
		resizeMode: 'cover',
	},
});
const Body = Styled.View({
	style: ({ theme }) => ({
		// backgroundColor: theme.colors.error,
		height: '90%',
		alignItems: 'center',
		justifyContent: 'center',
	}),
});

const Footer = Styled.View({
	style: ({ theme }) => ({
		height: '10%',
	}),
});

const Logo = Styled.Image({
	style: ({ theme }) => ({
		height: 240,
		width: '100%',
		// backgroundColor: 'red',
		// marginBottom: 40,
	}),
	attrs: {
		resizeMode: 'contain',
	},
});

const Text = Styled.Text({
	style: ({ theme }) => ({
		color: theme.colors.onBackground,
		fontSize: theme.typography.text3xl,
	}),
});

export const SL = { Text, Footer, Body, Background, Logo };
