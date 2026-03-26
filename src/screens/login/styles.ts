import { Styled } from 'stampd/styled';

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
	style: {
		height: '90%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const Footer = Styled.View({
	style: {
		height: '10%',
	},
});

const Logo = Styled.Image({
	style: {
		height: 240,
		width: '100%',
	},
	attrs: {
		resizeMode: 'contain',
	},
});

const Text = Styled.Text({
	style: ({ theme }) => ({
		color: theme.colors.onBackground,
		fontSize: theme.fonts.sizes.xl3,
	}),
});

export const SL = { Text, Footer, Body, Background, Logo };
