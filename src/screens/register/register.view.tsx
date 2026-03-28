import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { Controller } from 'react-hook-form';
import { useRegisterViewModel } from './register.viewmodel';
import { useAppNavigation } from '@/navigation/hooks';
import { FormFieldsProvider, FormScreen, useFormField } from '@/components/FormScreen';
import { useAuthThemeStore } from '@/core/auth/useAuthThemeStore';
import Logo from '@assets/esporteDaSorteCompleto.svg';
import { ArrowLeft, MessageSquare, User, Mail, Phone, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react-native';
import type { PasswordStrength } from './register.types';

const STRENGTH_PROGRESS: Record<PasswordStrength, number> = {
	weak: 0.33,
	medium: 0.66,
	strong: 1,
};

function RegisterHeader() {
	const insets = useSafeAreaInsets();
	const { canGoBack, goBack, navigate } = useAppNavigation();
	const colors = useAuthThemeStore((s) => s.colors);

	return (
		<View style={[styles.header, { paddingTop: insets.top, backgroundColor: colors.bgNav }]}>
			<View style={styles.headerRow}>
				{canGoBack() ? (
					<TouchableOpacity onPress={goBack} activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
						<ArrowLeft size={RFValue(20)} color={colors.textPrimary} strokeWidth={2} />
					</TouchableOpacity>
				) : (
					<View style={{ width: RFValue(20) }} />
				)}
				<Logo width={149} height={16} />
				<TouchableOpacity onPress={() => navigate('Support')} activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
					<MessageSquare size={RFValue(20)} color={colors.textPrimary} strokeWidth={2} />
				</TouchableOpacity>
			</View>
		</View>
	);
}

/** Componente externo: fornece o contexto de campos */
export default function RegisterScreen() {
	return (
		<FormFieldsProvider fieldCount={5}>
			<RegisterForm />
		</FormFieldsProvider>
	);
}

/** Componente interno: usa useFormField (já dentro do Provider) */
function RegisterForm() {
	const colors = useAuthThemeStore((s) => s.colors);

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const togglePassword = useCallback(() => setShowPassword((s) => !s), []);
	const toggleConfirmPassword = useCallback(() => setShowConfirmPassword((s) => !s), []);

	const {
		control,
		errors,
		isLoading,
		isValid,
		hasFormErrors,
		passwordStrength,
		passwordStrengthLabel,
		handleRegister,
		handleCpfChange,
		handlePhoneChange,
		navigateToLogin,
	} = useRegisterViewModel();

	const cpfField = useFormField(0);
	const emailField = useFormField(1);
	const phoneField = useFormField(2);
	const passwordField = useFormField(3);
	const confirmPasswordField = useFormField(4, handleRegister);

	const strengthColors = useMemo(
		() => ({
			weak: colors.error,
			medium: '#FFA500',
			strong: colors.accent,
		}),
		[colors.error, colors.accent]
	);

	const dynamicColors = useMemo(
		() => ({
			inputBg: colors.bgCard,
			inputPlaceholder: colors.textMuted,
			divider: 'rgba(160,160,200,0.1)',
			strengthBarBg: colors.bgCard,
			checkboxBg: colors.bgCard,
			checkboxCheckedBg: colors.primary,
			primaryBtn: colors.primary,
			primaryBtnText: colors.textPrimary,
		}),
		[colors]
	);

	const currentStrengthColor = passwordStrength ? strengthColors[passwordStrength] : undefined;

	return (
		<FormScreen header={<RegisterHeader />} backgroundColor={colors.background}>
			<View style={styles.content}>
				{/* Title */}
				<View style={styles.titleBlock}>
					<Text style={[styles.title, { color: colors.textPrimary }]}>Criar conta</Text>
					<Text style={[styles.subtitle, { color: colors.textSecondary }]}>
						Preencha os dados abaixo para começar.
					</Text>
				</View>

				{/* Form */}
				<View style={styles.formBlock}>
					{/* CPF */}
					<Controller
						control={control}
						name="cpf"
						render={({ field: { onChange, value }, fieldState }) => (
							<View style={styles.inputGroup}>
								<Text style={[styles.label, { color: colors.textPrimary }]}>CPF</Text>
								<View
									style={[
										styles.inputWrapperWithIcon,
										{ backgroundColor: dynamicColors.inputBg },
										fieldState.error && { borderColor: colors.error },
									]}
								>
									<View style={styles.inputIconWrap}>
										<User size={RFValue(16)} color={dynamicColors.inputPlaceholder} strokeWidth={2} />
									</View>
									<TextInput
										ref={cpfField.ref}
										returnKeyType={cpfField.returnKeyType}
										onSubmitEditing={cpfField.onSubmitEditing}
										blurOnSubmit={cpfField.blurOnSubmit}
										style={[styles.inputWithIcon, { color: colors.textPrimary }]}
										placeholder="000.000.000-00"
										placeholderTextColor={dynamicColors.inputPlaceholder}
										value={value}
										onChangeText={(text) => handleCpfChange(text, onChange)}
										keyboardType="numeric"
										cursorColor={colors.accent}
									/>
								</View>
								{fieldState.error && <ErrorMessage message={fieldState.error.message!} color={colors.error} />}
							</View>
						)}
					/>

					{/* Email */}
					<Controller
						control={control}
						name="email"
						render={({ field: { onChange, value }, fieldState }) => (
							<View style={styles.inputGroup}>
								<Text style={[styles.label, { color: colors.textPrimary }]}>E-mail</Text>
								<View
									style={[
										styles.inputWrapperWithIcon,
										{ backgroundColor: dynamicColors.inputBg },
										fieldState.error && { borderColor: colors.error },
									]}
								>
									<View style={styles.inputIconWrap}>
										<Mail size={RFValue(16)} color={dynamicColors.inputPlaceholder} strokeWidth={2} />
									</View>
									<TextInput
										ref={emailField.ref}
										returnKeyType={emailField.returnKeyType}
										onSubmitEditing={emailField.onSubmitEditing}
										blurOnSubmit={emailField.blurOnSubmit}
										style={[styles.inputWithIcon, { color: colors.textPrimary }]}
										placeholder="seu@email.com"
										placeholderTextColor={dynamicColors.inputPlaceholder}
										value={value}
										onChangeText={onChange}
										autoCapitalize="none"
										keyboardType="email-address"
										cursorColor={colors.accent}
									/>
								</View>
								{fieldState.error && <ErrorMessage message={fieldState.error.message!} color={colors.error} />}
							</View>
						)}
					/>

					{/* Phone */}
					<Controller
						control={control}
						name="phone"
						render={({ field: { onChange, value }, fieldState }) => (
							<View style={styles.inputGroup}>
								<Text style={[styles.label, { color: colors.textPrimary }]}>Celular</Text>
								<View
									style={[
										styles.inputWrapperWithIcon,
										{ backgroundColor: dynamicColors.inputBg },
										fieldState.error && { borderColor: colors.error },
									]}
								>
									<View style={styles.inputIconWrap}>
										<Phone size={RFValue(16)} color={dynamicColors.inputPlaceholder} strokeWidth={2} />
									</View>
									<TextInput
										ref={phoneField.ref}
										returnKeyType={phoneField.returnKeyType}
										onSubmitEditing={phoneField.onSubmitEditing}
										blurOnSubmit={phoneField.blurOnSubmit}
										style={[styles.inputWithIcon, { color: colors.textPrimary }]}
										placeholder="(00) 00000-0000"
										placeholderTextColor={dynamicColors.inputPlaceholder}
										value={value}
										onChangeText={(text) => handlePhoneChange(text, onChange)}
										keyboardType="phone-pad"
										cursorColor={colors.accent}
									/>
								</View>
								{fieldState.error && <ErrorMessage message={fieldState.error.message!} color={colors.error} />}
							</View>
						)}
					/>

					{/* Divider */}
					<View style={[styles.divider, { backgroundColor: dynamicColors.divider }]} />

					{/* Password */}
					<Controller
						control={control}
						name="password"
						render={({ field: { onChange, value }, fieldState }) => (
							<View style={styles.inputGroup}>
								<Text style={[styles.label, { color: colors.textPrimary }]}>Senha</Text>
								<View
									style={[
										styles.inputWrapperWithIcon,
										{ backgroundColor: dynamicColors.inputBg },
										fieldState.error && { borderColor: colors.error },
									]}
								>
									<View style={styles.inputIconWrap}>
										<Lock size={RFValue(16)} color={dynamicColors.inputPlaceholder} strokeWidth={2} />
									</View>
									<TextInput
										ref={passwordField.ref}
										returnKeyType={passwordField.returnKeyType}
										onSubmitEditing={passwordField.onSubmitEditing}
										blurOnSubmit={passwordField.blurOnSubmit}
										style={[styles.inputWithIcon, { color: colors.textPrimary }]}
										placeholder="Mínimo 6 caracteres"
										placeholderTextColor={dynamicColors.inputPlaceholder}
										value={value}
										onChangeText={onChange}
										secureTextEntry={!showPassword}
										autoCapitalize="none"
										cursorColor={colors.accent}
									/>
									<TouchableOpacity onPress={togglePassword} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
										{showPassword ? (
											<EyeOff size={RFValue(18)} color={dynamicColors.inputPlaceholder} strokeWidth={2} />
										) : (
											<Eye size={RFValue(18)} color={dynamicColors.inputPlaceholder} strokeWidth={2} />
										)}
									</TouchableOpacity>
								</View>
								{passwordStrength && (
									<View style={styles.strengthRow}>
										<View style={[styles.strengthBarBg, { backgroundColor: dynamicColors.strengthBarBg }]}>
											<View
												style={[
													styles.strengthBarFill,
													{
														backgroundColor: currentStrengthColor,
														width: `${STRENGTH_PROGRESS[passwordStrength] * 100}%`,
													},
												]}
											/>
										</View>
										<Text style={[styles.strengthText, { color: currentStrengthColor }]}>{passwordStrengthLabel}</Text>
									</View>
								)}
								{fieldState.error && <ErrorMessage message={fieldState.error.message!} color={colors.error} />}
							</View>
						)}
					/>

					{/* Confirm Password */}
					<Controller
						control={control}
						name="confirmPassword"
						render={({ field: { onChange, value }, fieldState }) => (
							<View style={styles.inputGroup}>
								<Text style={[styles.label, { color: colors.textPrimary }]}>Confirmar senha</Text>
								<View
									style={[
										styles.inputWrapperWithIcon,
										{ backgroundColor: dynamicColors.inputBg },
										fieldState.error && { borderColor: colors.error },
									]}
								>
									<View style={styles.inputIconWrap}>
										<Lock size={RFValue(16)} color={dynamicColors.inputPlaceholder} strokeWidth={2} />
									</View>
									<TextInput
										ref={confirmPasswordField.ref}
										returnKeyType={confirmPasswordField.returnKeyType}
										onSubmitEditing={confirmPasswordField.onSubmitEditing}
										blurOnSubmit={confirmPasswordField.blurOnSubmit}
										style={[styles.inputWithIcon, { color: colors.textPrimary }]}
										placeholder="Digite a senha novamente"
										placeholderTextColor={dynamicColors.inputPlaceholder}
										value={value}
										onChangeText={onChange}
										secureTextEntry={!showConfirmPassword}
										autoCapitalize="none"
										cursorColor={colors.accent}
									/>
									<TouchableOpacity onPress={toggleConfirmPassword} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
										{showConfirmPassword ? (
											<EyeOff size={RFValue(18)} color={dynamicColors.inputPlaceholder} strokeWidth={2} />
										) : (
											<Eye size={RFValue(18)} color={dynamicColors.inputPlaceholder} strokeWidth={2} />
										)}
									</TouchableOpacity>
								</View>
								{fieldState.error && <ErrorMessage message={fieldState.error.message!} color={colors.error} />}
							</View>
						)}
					/>

					{/* Divider */}
					<View style={[styles.divider, { backgroundColor: dynamicColors.divider }]} />

					{/* Terms checkbox */}
					<Controller
						control={control}
						name="acceptTerms"
						render={({ field: { onChange, value } }) => (
							<TouchableOpacity style={styles.checkboxRow} onPress={() => onChange(!value)} activeOpacity={0.7}>
								<View
									style={[
										styles.checkbox,
										value && { backgroundColor: dynamicColors.checkboxCheckedBg },
										!value && { backgroundColor: dynamicColors.checkboxBg },
									]}
								/>
								<Text style={[styles.termsText, { color: colors.textSecondary }]}>
									Li e aceito os <Text style={[styles.termsLink, { color: colors.primary }]}>Termos de Uso</Text>{' '}
									e a <Text style={[styles.termsLink, { color: colors.primary }]}>Política de Privacidade</Text>
								</Text>
							</TouchableOpacity>
						)}
					/>

					{/* Error card */}
					{hasFormErrors && (
						<View style={[styles.errorCard, { backgroundColor: dynamicColors.inputBg, borderColor: colors.error }]}>
							<AlertCircle size={RFValue(16)} color={colors.error} strokeWidth={2} />
							<View style={styles.errorCardContent}>
								<Text style={[styles.errorCardTitle, { color: colors.error }]}>Corrija os erros acima</Text>
								<Text style={[styles.errorCardDesc, { color: colors.textSecondary }]}>
									Alguns campos precisam de atenção.
								</Text>
							</View>
						</View>
					)}
				</View>

				{/* Register button */}
				<TouchableOpacity
					style={[styles.primaryBtn, { backgroundColor: dynamicColors.primaryBtn }, !isValid && styles.btnDisabled]}
					onPress={handleRegister}
					activeOpacity={0.8}
					disabled={isLoading || !isValid}
				>
					{isLoading ? (
						<ActivityIndicator color={dynamicColors.primaryBtnText} size="small" />
					) : (
						<Text style={[styles.primaryBtnText, { color: dynamicColors.primaryBtnText }]}>Criar conta</Text>
					)}
				</TouchableOpacity>

				{/* Login link */}
				<TouchableOpacity onPress={navigateToLogin} activeOpacity={0.7} style={styles.loginLinkWrap}>
					<Text style={[styles.loginLinkText, { color: colors.textSecondary }]}>
						Já tem uma conta? <Text style={[styles.loginLinkBold, { color: colors.primary }]}>Entrar</Text>
					</Text>
				</TouchableOpacity>
			</View>
		</FormScreen>
	);
}

function ErrorMessage({ message, color }: { message: string; color: string }) {
	return (
		<View style={styles.errorRow}>
			<AlertCircle size={RFValue(12)} color={color} strokeWidth={2} />
			<Text style={[styles.errorText, { color }]}>{message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: RFValue(20),
		paddingBottom: RFValue(14),
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.15,
		shadowRadius: 12,
		elevation: 8,
	},
	headerRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: RFValue(14),
	},
	content: {
		gap: RFValue(20),
		paddingTop: 32,
	},
	logoContainer: {
		alignItems: 'center',
		paddingTop: RFValue(14),
	},
	titleBlock: {
		gap: RFValue(4),
	},
	title: {
		fontSize: RFValue(18),
		fontWeight: '700',
		lineHeight: RFValue(26),
		letterSpacing: -0.24,
	},
	subtitle: {
		fontSize: RFValue(12),
		fontWeight: '400',
		lineHeight: RFValue(18),
	},
	formBlock: {
		gap: RFValue(12),
	},
	inputGroup: {
		gap: RFValue(5),
	},
	label: {
		fontSize: RFValue(12),
		fontWeight: '600',
		lineHeight: RFValue(18),
	},
	inputWrapperWithIcon: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: RFValue(8),
		borderWidth: 2,
		borderColor: 'transparent',
		height: RFValue(42),
		paddingRight: RFValue(14),
	},
	inputIconWrap: {
		width: RFValue(40),
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputWithIcon: {
		flex: 1,
		fontSize: RFValue(14),
		fontWeight: '400',
		height: '100%',
	},
	divider: {
		height: 1,
	},
	strengthRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(6),
	},
	strengthBarBg: {
		flex: 1,
		height: RFValue(4),
		borderRadius: 9999,
		overflow: 'hidden',
	},
	strengthBarFill: {
		height: '100%',
		borderRadius: 9999,
	},
	strengthText: {
		fontSize: RFValue(10),
		fontWeight: '500',
		lineHeight: RFValue(14),
	},
	errorRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(4),
	},
	errorText: {
		fontSize: RFValue(11),
		fontWeight: '400',
		lineHeight: RFValue(16),
	},
	checkboxRow: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: RFValue(8),
	},
	checkbox: {
		width: RFValue(18),
		height: RFValue(18),
		borderRadius: RFValue(2),
		marginTop: RFValue(1),
	},
	termsText: {
		flex: 1,
		fontSize: RFValue(11),
		fontWeight: '500',
		lineHeight: RFValue(17),
	},
	termsLink: {
		fontWeight: '600',
	},
	errorCard: {
		flexDirection: 'row',
		borderWidth: 2,
		borderRadius: RFValue(10),
		padding: RFValue(16),
		gap: RFValue(10),
		alignItems: 'flex-start',
	},
	errorCardContent: {
		flex: 1,
		gap: RFValue(2),
	},
	errorCardTitle: {
		fontSize: RFValue(12),
		fontWeight: '600',
		lineHeight: RFValue(17),
	},
	errorCardDesc: {
		fontSize: RFValue(11),
		fontWeight: '400',
		lineHeight: RFValue(16),
	},
	primaryBtn: {
		height: RFValue(42),
		borderRadius: RFValue(10),
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnDisabled: {
		opacity: 0.5,
	},
	primaryBtnText: {
		fontSize: RFValue(14),
		fontWeight: '600',
		lineHeight: RFValue(20),
	},
	loginLinkWrap: {
		alignItems: 'center',
	},
	loginLinkText: {
		fontSize: RFValue(12),
		fontWeight: '400',
		lineHeight: RFValue(18),
	},
	loginLinkBold: {
		fontWeight: '600',
	},
});
