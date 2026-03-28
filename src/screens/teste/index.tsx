import { Styled } from 'stampd/styled';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonText, Label, Box, Button } from './styles';

export function VariantTestScreen() {
	const variants = ['paodoce', 'secondary', 'danger'] as const;
	const sizes = ['sm', 'md', 'lg'] as const;

	const [variantIndex, setVariantIndex] = useState(0);
	const [sizeIndex, setSizeIndex] = useState(0);

	const changeVariant = useCallback(() => {
		setVariantIndex((prev) => (prev + 1) % variants.length);
		setSizeIndex((prev) => (prev + 1) % sizes.length);
	}, []);

	const variant = variants[variantIndex];
	const size = sizes[sizeIndex];

	return (
		<View style={styles.container}>
			<Box douglas={variant} size="md">
				<Label size={size}>
					{variant.toUpperCase()} - {size.toUpperCase()}
				</Label>
			</Box>

			<Button onPress={changeVariant}>
				<ButtonText>Mudar Variant</ButtonText>
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
