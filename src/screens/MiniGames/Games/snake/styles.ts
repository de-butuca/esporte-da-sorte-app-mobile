import { Styled } from '@/theme/useStyled';
const Container = Styled.View({
	style: ({ theme }) => ({
		backgroundColor: theme.colors.background,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}),
});

const Overlay = Styled.View({
	style: ({ theme }) => ({
		position: 'absolute',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	}),
});

const Header = Styled.View({
	style: ({ theme }) => ({
		height: theme.size.s12,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
	}),
});

const Body = Styled.View({
	style: ({ theme }) => ({
		position: 'relative',
		flex: 1,
		marginTop: 40,
		// justifyContent: 'center',
		// alignItems: 'center',
	}),
});

const TextHeader = Styled.Text({
	style: ({ theme }) => ({
		color: theme.colors.onBackground,
		fontSize: theme.typography.textBase,
	}),
});

const TextGameOver = Styled.Text({
	style: ({ theme }) => ({
		color: theme.colors.onBackground,
		fontSize: theme.typography.textXl,
	}),
});

export const SGS = { Container, Header, Body, TextHeader, TextGameOver, Overlay };
