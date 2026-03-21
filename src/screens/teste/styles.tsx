import { useTheme } from "@/theme/ThemeContext"
import { Styled } from "@/theme/useStyled"
import { TouchableOpacity } from "react-native"

export const Box = Styled.View({
	style: {
		padding: 20,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},

	variants: {
		douglas: {
			paodoce: {
				backgroundColor: "#3b82f6",
			},

			secondary: {
				backgroundColor: "#10b981",
			},

			danger: ({ theme }) => ({ backgroundColor: theme.colors.error }),
		},

		size: {
			sm: {
				width: 120,
				height: 60,
			},

			md: {
				width: 180,
				height: 80,
			},

			lg: {
				width: 240,
				height: 100,
			},
		},
	},
})

// TEXTO com variants
export const Label = Styled.Text({
	style: {
		color: "white",
		fontWeight: "bold",
	},

	variants: {
		size: {
			sm: {
				fontSize: 14,
			},

			md: {
				fontSize: 18,
			},

			lg: {
				fontSize: 24,
			},
		},
	},
})

// BOTÃO
export const Button = Styled.TouchableOpacity({
	style: ({ theme }) => ({ padding: theme.size.s10, borderRadius: 10, backgroundColor: "#111", marginTop: 20 }),

	attrs: { activeOpacity: 1 },
})

function Button2(params: any) {
	const { theme } = useTheme()

	const stylesVariants: any = []

	for (const variantName in params.variants) {
		const variantValue = params[variantName]

		if (!variantValue) continue

		const variantStyle = params.variants[variantName][variantValue]

		if (variantStyle) {
			stylesVariants.push(variantStyle)
		}
	}

	return (
		<TouchableOpacity
			style={[
				{
					padding: theme.size.s10,
					borderRadius: 10,
					backgroundColor: "#111",
					marginTop: 20,
				},
				...stylesVariants,
			]}
			{...{ activeOpacity: 1 }}
		/>
	)
}

// TEXTO BOTÃO
export const ButtonText = Styled.Text({
	style: {
		color: "white",
		fontSize: 16,
	},
})
