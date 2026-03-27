import { Styled } from 'stampd/styled';

const ContainerView = Styled.View({
	style: ({ theme }) => ({
		flex: 1,

		backgroundColor: theme.colors.background,
	}),
});

const ContainerKeyboardAvoidingView = Styled.KeyboardAvoidingView({
	style: ({ theme }) => ({
		flex: 1,

		backgroundColor: theme.colors.background,
	}),
});

const ContainerScrollView = Styled.ScrollView({
	style: ({ theme }) => ({
		flex: 1,
		backgroundColor: theme.colors.background,
	}),
});
export const BPS = {
	View: ContainerView,
	KeyboardAvoidingView: ContainerKeyboardAvoidingView,
	ScrollView: ContainerScrollView,
};
