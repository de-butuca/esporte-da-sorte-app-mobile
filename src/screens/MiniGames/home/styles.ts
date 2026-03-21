import { Styled } from '@/theme/useStyled';

const Container = Styled.View({
	style: ({ theme }) => ({
		flex: 1,

		gap: theme.size.s4,
	}),
});

const GameItem = Styled.TouchableOpacity({
	style: ({ theme }) => ({
		backgroundColor: theme.colors.error,
		width: '100%',
		padding: theme.size.s4,
		alignItems: 'center',
	}),
});

const Text = Styled.Text({
	style: ({ theme }) => ({
		color: theme.colors.onBackground,
		fontSize: theme.typography.textXl,
		fontFamily: theme.typography.fontFamily.default.medium,
	}),
});

export const MGS = { Text, Container, GameItem };
