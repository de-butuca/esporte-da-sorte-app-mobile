import React, { useState } from "react"
import { TextInputProps, TouchableOpacity } from "react-native"
import { Eye, EyeOff } from "lucide-react-native"

import { useTheme } from "@/theme/ThemeContext"
import { InputContainer, InputLabel, Body, InputField, ErrorContainer, ErrorText } from "./styles"

interface InputTextProps extends TextInputProps {
	label?: string
	error?: string
	disabled?: boolean
	labelColor?: "INPUT_LABEL_WHITE" | "INPUT_LABEL_BLACK"
	isLoading?: boolean
}

export function InputText({
	label,
	error,
	value,
	disabled,
	secureTextEntry,
	multiline = false,
	numberOfLines,
	labelColor = "INPUT_LABEL_WHITE",
	isLoading = false,
	...rest
}: InputTextProps) {
	const { theme } = useTheme()

	const [secure, setSecure] = useState(secureTextEntry)

	const colors = theme.colors

	return (
		<InputContainer>
			{label && <InputLabel>{label}</InputLabel>}

			<Body
				error={!!error ? "true" : "false"}
				disabled={disabled ? "true" : undefined}
				multiline={multiline ? "true" : undefined}
			>
				<InputField
					value={value}
					secureTextEntry={secure}
					multiline={multiline}
					numberOfLines={numberOfLines}
					textAlignVertical={multiline ? "top" : "center"}
					editable={!disabled}
					cursorColor={colors.inputText}
					autoCapitalize="none"
					{...rest}
				/>

				{secureTextEntry && !multiline && (
					<TouchableOpacity onPress={() => setSecure(!secure)}>
						{secure ? (
							<EyeOff color={colors.inputIcon} size={theme.size.s6} />
						) : (
							<Eye color={colors.inputIcon} size={theme.size.s6} />
						)}
					</TouchableOpacity>
				)}
			</Body>

			{error && (
				<ErrorContainer>
					<ErrorText>{error}</ErrorText>
				</ErrorContainer>
			)}
		</InputContainer>
	)
}
