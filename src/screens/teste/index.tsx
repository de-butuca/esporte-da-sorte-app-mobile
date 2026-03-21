import { Styled } from "@/theme/useStyled"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { ButtonText, Label, Box, Button } from "./styles"

// BOX com variants

export function VariantTestScreen() {
	const variants = ["paodoce", "secondary", "danger"] as const
	const sizes = ["sm", "md", "lg"] as const

	const [variantIndex, setVariantIndex] = useState(0)
	const [sizeIndex, setSizeIndex] = useState(0)

	function changeVariant() {
		setVariantIndex((prev) => (prev + 1) % variants.length)
		setSizeIndex((prev) => (prev + 1) % sizes.length)
	}

	const variant = variants[variantIndex]
	const size = sizes[sizeIndex]

	useEffect(() => {
		return () => {}
	}, [])

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Box douglas={variant} size="md">
				<Label size={size}>
					{variant.toUpperCase()} - {size.toUpperCase()}
				</Label>
			</Box>

			<Button onPress={changeVariant}>
				<ButtonText>Mudar Variant</ButtonText>
			</Button>
		</View>
	)
}
