import { Styled } from 'stampd/styled';

export const InputContainer = Styled.View({
	style: {
		width: '100%',
	},
});

export const InputLabel = Styled.Text({
	style: ({ theme }) => ({
		fontSize: theme.fonts.sizes.base,
		color: theme.colors.label,
		marginBottom: theme.size.s2,
	}),
});

export const Body = Styled.View({
	style: ({ theme }) => ({
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: theme.size.s2,
		paddingHorizontal: theme.size.s3,
		backgroundColor: theme.colors.inputBackground,
	}),

	variants: {
		error: {
			true: ({ theme }) => ({
				borderColor: theme.colors.error,
			}),
			false: ({ theme }) => ({
				borderColor: theme.colors.inputPrimary,
			}),
		},

		disabled: {
			true: () => ({
				opacity: 0.5,
			}),
		},

		multiline: {
			true: {
				alignItems: 'flex-start',
				paddingVertical: 8,
			},
		},
	},
});

export const InputField = Styled.TextInput({
	style: ({ theme }) => ({
		flex: 1,
		fontSize: theme.fonts.sizes.base,
		color: theme.colors.inputText,
		paddingVertical: theme.size.s3,
	}),
});

export const ErrorContainer = Styled.View({
	style: {
		marginTop: 4,
	},
});

export const ErrorText = Styled.Text({
	style: ({ theme }) => ({
		fontSize: theme.fonts.sizes.xs,
		color: theme.colors.error,
	}),
});
