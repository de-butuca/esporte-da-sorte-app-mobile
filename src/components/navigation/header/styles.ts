import { Styled } from 'stampd/styled';

const Container = Styled.View({
	style: ({ theme }) => ({
		width: '100%',
		position: 'relative',
		backgroundColor: theme.colors.background,
		height: 60,
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
	style: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
	},
});

const BodyStart = Styled.View({
	style: ({ theme }) => ({
		width: '25%',
		padding: theme.size.s4,
		justifyContent: 'center',
		alignItems: 'flex-start',
	}),
});

const BodyMiddle = Styled.View({
	style: {
		width: '50%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const BodyEnd = Styled.View({
	style: {
		width: '25%',
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
});

const Logo = Styled.Image({
	style: {
		height: 40,
		width: 40,
		backgroundColor: 'transparent',
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

export const HeaderStyles = { Logo, Container, Body, BodyStart, BodyMiddle, BodyEnd, ContainerBackIcon, Text };
