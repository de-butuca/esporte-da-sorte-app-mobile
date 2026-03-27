import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	TextInputProps,
} from 'react-native';
import { Eye, EyeOff, AlertCircle } from 'lucide-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ui } from './theme';

interface InputProps extends Omit<TextInputProps, 'style'> {
	label?: string;
	placeholder?: string;
	type?: 'text' | 'email' | 'password';
	icon?: React.ReactNode;
	iconPosition?: 'leading' | 'trailing';
	helperText?: string;
	errorText?: string;
	maxLength?: number;
}

export function Input({
	label,
	placeholder,
	type = 'text',
	icon,
	iconPosition = 'leading',
	helperText,
	errorText,
	maxLength,
	value,
	onChangeText,
	...rest
}: InputProps) {
	const [focused, setFocused] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const hasError = !!errorText;

	const isPassword = type === 'password';
	const keyboardType = type === 'email' ? 'email-address' : 'default';

	return (
		<View style={styles.wrapper}>
			{label && <Text style={styles.label}>{label}</Text>}

			<View
				style={[
					styles.container,
					focused && styles.focused,
					hasError && styles.error,
				]}
			>
				{icon && iconPosition === 'leading' && (
					<View style={styles.iconWrap}>{icon}</View>
				)}

				<TextInput
					style={styles.input}
					placeholder={placeholder}
					placeholderTextColor={ui.colors.textDisabled}
					secureTextEntry={isPassword && !showPassword}
					keyboardType={keyboardType}
					maxLength={maxLength}
					value={value}
					onChangeText={onChangeText}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					cursorColor={ui.colors.primary}
					selectionColor={ui.colors.primary}
					{...rest}
				/>

				{isPassword && (
					<TouchableOpacity
						style={styles.iconWrap}
						onPress={() => setShowPassword(!showPassword)}
						accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
					>
						{showPassword ? (
							<EyeOff size={RFValue(18)} color={ui.colors.textSecondary} />
						) : (
							<Eye size={RFValue(18)} color={ui.colors.textSecondary} />
						)}
					</TouchableOpacity>
				)}

				{icon && iconPosition === 'trailing' && !isPassword && (
					<View style={styles.iconWrap}>{icon}</View>
				)}

				{hasError && !isPassword && (
					<View style={styles.iconWrap}>
						<AlertCircle size={RFValue(18)} color={ui.colors.error} />
					</View>
				)}
			</View>

			<View style={styles.footer}>
				{hasError ? (
					<Text style={styles.errorText}>{errorText}</Text>
				) : helperText ? (
					<Text style={styles.helperText}>{helperText}</Text>
				) : (
					<View />
				)}
				{maxLength != null && (
					<Text style={styles.counter}>
						{(value?.length ?? 0)}/{maxLength}
					</Text>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		gap: RFValue(6),
	},
	label: {
		fontFamily: ui.font.medium,
		fontSize: ui.fontSize.sm,
		color: ui.colors.textSecondary,
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: ui.colors.surface1,
		borderRadius: ui.radius.md,
		borderWidth: 2,
		borderColor: 'transparent',
		paddingHorizontal: RFValue(12),
		height: ui.size.lg,
	},
	focused: {
		borderColor: ui.colors.primary,
	},
	error: {
		borderColor: ui.colors.error,
	},
	input: {
		flex: 1,
		fontFamily: ui.font.regular,
		fontSize: ui.fontSize.base,
		color: ui.colors.textPrimary,
		paddingVertical: 0,
	},
	iconWrap: {
		marginHorizontal: RFValue(4),
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	helperText: {
		fontFamily: ui.font.regular,
		fontSize: ui.fontSize.xs,
		color: ui.colors.textSecondary,
	},
	errorText: {
		fontFamily: ui.font.regular,
		fontSize: ui.fontSize.xs,
		color: ui.colors.error,
	},
	counter: {
		fontFamily: ui.font.regular,
		fontSize: ui.fontSize.xs,
		color: ui.colors.textSecondary,
	},
});
