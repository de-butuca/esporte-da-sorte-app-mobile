import { Styled } from '@/theme/useStyled';
const Container = Styled.View({
	style: ({ theme }) => ({
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
	}),
});

const Background = Styled.TouchableOpacity({
	style: ({ theme }) => ({
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: 'black',
		opacity: 0.8,
	}),
});

const Content = Styled.View({
	style: ({ theme }) => ({
		width: '80%',
		height: '80%',
		backgroundColor: theme.colors.surface,
	}),
});

const TextHeader = Styled.Text({
	style: ({ theme }) => ({
		color: theme.colors.onBackground,
		fontSize: theme.typography.textBase,
	}),
});

export const PS = { Container, Content, Background, TextHeader };
