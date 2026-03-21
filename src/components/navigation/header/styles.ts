import { Styled } from '@/theme/useStyled';
const Container = Styled.View({
	style: ({ theme }) => ({
		width: '100%',
		position: 'relative',
		backgroundColor: theme.colors.background,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
	}),
});
const ContainerBackIcon = Styled.TouchableOpacity({
	style: ({ theme }) => ({
		position: 'absolute',
		left: theme.size.s4,
		top: '50%',
		transform: [{ translateY: -21 }],
	}),
});

const Body = Styled.View({
	style: ({ theme }) => ({
		alignItems: 'center',
		justifyContent: 'center',
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

export const HeaderStyles = { Container, Body, ContainerBackIcon, Text };
