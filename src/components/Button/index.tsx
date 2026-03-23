import React from 'react';
import { ActivityIndicator } from 'react-native';
import { BBS } from './styles';
import { useTheme } from '@/theme/ThemeContext';

interface ButtonBaseProps {
	text: string;
	isLoading?: boolean;
	disabled?: boolean;
	size?: 'sm' | 'md' | 'lg' | 'full';
	onPress: () => void;
}

export function ButtonBase({ text, isLoading = false, disabled = false, onPress, size = 'full' }: ButtonBaseProps) {
	const isDisabled = disabled || isLoading;
	const { theme } = useTheme();
	return (
		<BBS.container
			size={size}
			onPress={onPress}
			disabled={isDisabled}
			accessibilityState={{ disabled: isDisabled, busy: isLoading }}
		>
			{isLoading ? <ActivityIndicator color={theme.colors.onPrimary} size={30} /> : <BBS.Text>{text}</BBS.Text>}
		</BBS.container>
	);
}
