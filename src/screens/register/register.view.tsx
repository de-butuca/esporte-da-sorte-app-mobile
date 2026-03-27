import React, { useCallback, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily, lightColors } from '@/theme/design-tokens';
import { Controller } from 'react-hook-form';
import { useRegisterViewModel } from './register.viewmodel';
import { useAppNavigation } from '@/navigation/hooks';
import { FormFieldsProvider, FormScreen, useFormField } from '@/components/FormScreen';
import Logo from '@assets/images/logo-square.svg';
import {
	ArrowLeft,
	MessageSquare,
	User,
	Mail,
	Phone,
	Lock,
	Eye,
	EyeOff,
	AlertCircle,
} from 'lucide-react-native';
import type { PasswordStrength } from './register.types';

const STRENGTH_COLORS: Record<PasswordStrength, string> = {
	weak: lightColors.error,
	medium: lightColors.warning,
	strong: lightColors.success,
};

const STRENGTH_PROGRESS: Record<PasswordStrength, number> = {
	weak: 0.33,
	medium: 0.66,
	strong: 1,
};

function RegisterHeader() {
	const insets = useSafeAreaInsets();
	const { canGoBack, goBack } = useAppNavigation();

	return (
		<View style={[styles.header, { paddingTop: insets.top }]}>
			<View style={styles.headerRow}>
				{canGoBack() ? (
					<TouchableOpacity
						onPress={goBack}
						activeOpacity={0.7}
						hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
					>
						<ArrowLeft size={RFValue(20)} color="#FFFFFF" strokeWidth={2} />
					</TouchableOpacity>
				) : (
					<View style={{ width: RFValue(20) }} />
				)}
				<TouchableOpacity
					activeOpacity={0.7}
					hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
				>
					<MessageSquare size={RFValue(20)} color="#FFFFFF" strokeWidth={2} />
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
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const togglePassword = useCallback(() => setShowPassword((s) => !s), []);
	const toggleConfirmPassword = useCallback(
		() => setShowConfirmPassword((s) => !s),
		[],
	);

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

	return (
		<FormScreen header={<RegisterHeader />}>
			<View style={styles.content}>
				{/* Logo */}
				<View style={styles.logoContainer}>
					<Logo width={RFValue(100)} height={RFValue(34)} />
				</View>

				{/* Title */}
				<View style={styles.titleBlock}>
					<Text style={styles.title}>Criar conta</Text>
					<Text style={styles.subtitle}>
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
								<Text style={styles.label}>CPF</Text>
								<View
									style={[
										styles.inputWrapperWithIcon,
										fieldState.error && styles.inputError,
									]}
								>
									<View style={styles.inputIconWrap}>
										<User
											size={RFValue(16)}
											color="rgba(255,255,255,0.5)"
											strokeWidth={2}
										/>
									</View>
									<TextInput
										ref={cpfField.ref}
										returnKeyType={cpfField.returnKeyType}
										onSubmitEditing={cpfField.onSubmitEditing}
										blurOnSubmit={cpfField.blurOnSubmit}
										style={styles.inputWithIcon}
										placeholder="000.000.000-00"
										placeholderTextColor="rgba(255,255,255,0.5)"
										value={value}
										onChangeText={(text) => handleCpfChange(text, onChange)}
										keyboardType="numeric"
										cursorColor={lightColors.success}
									/>
								</View>
								{fieldState.error && (
									<ErrorMessage message={fieldState.error.message!} />
								)}
							</View>
						)}
					/>

					{/* Email */}
					<Controller
						control={control}
						name="email"
						render={({ field: { onChange, value }, fieldState }) => (
							<View style={styles.inputGroup}>
								<Text style={styles.label}>E-mail</Text>
								<View
									style={[
										styles.inputWrapperWithIcon,
										fieldState.error && styles.inputError,
									]}
								>
									<View style={styles.inputIconWrap}>
										<Mail
											size={RFValue(16)}
											color="rgba(255,255,255,0.5)"
											strokeWidth={2}
										/>
									</View>
									<TextInput
										ref={emailField.ref}
										returnKeyType={emailField.returnKeyType}
										onSubmitEditing={emailField.onSubmitEditing}
										blurOnSubmit={emailField.blurOnSubmit}
										style={styles.inputWithIcon}
										placeholder="seu@email.com"
										placeholderTextColor="rgba(255,255,255,0.5)"
										value={value}
										onChangeText={onChange}
										autoCapitalize="none"
										keyboardType="email-address"
										cursorColor={lightColors.success}
									/>
								</View>
								{fieldState.error && (
									<ErrorMessage message={fieldState.error.message!} />
								)}
							</View>
						)}
					/>

					{/* Phone */}
					<Controller
						control={control}
						name="phone"
						render={({ field: { onChange, value }, fieldState }) => (
							<View style={styles.inputGroup}>
								<Text style={styles.label}>Celular</Text>
								<View
									style={[
										styles.inputWrapperWithIcon,
										fieldState.error && styles.inputError,
									]}
								>
									<View style={styles.inputIconWrap}>
										<Phone
											size={RFValue(16)}
											color="rgba(255,255,255,0.5)"
											strokeWidth={2}
										/>
									</View>
									<TextInput
										ref={phoneField.ref}
										returnKeyType={phoneField.returnKeyType}
										onSubmitEditing={phoneField.onSubmitEditing}
										blurOnSubmit={phoneField.blurOnSubmit}
										style={styles.inputWithIcon}
										placeholder="(00) 00000-0000"
										placeholderTextColor="rgba(255,255,255,0.5)"
										value={value}
										onChangeText={(text) => handlePhoneChange(text, onChange)}
										keyboardType="phone-pad"
										cursorColor={lightColors.success}
									/>
								</View>
								{fieldState.error && (
									<ErrorMessage message={fieldState.error.message!} />
								)}
							</View>
						)}
					/>

					{/* Divider */}
					<View style={styles.divider} />

					{/* Password */}
					<Controller
						control={control}
						name="password"
						render={({ field: { onChange, value }, fieldState }) => (
							<View style={styles.inputGroup}>
								<Text style={styles.label}>Senha</Text>
								<View
									style={[
										styles.inputWrapperWithIcon,
										fieldState.error && styles.inputError,
									]}
								>
									<View style={styles.inputIconWrap}>
										<Lock
											size={RFValue(16)}
											color="rgba(255,255,255,0.5)"
											strokeWidth={2}
										/>
									</View>
									<TextInput
										ref={passwordField.ref}
										returnKeyType={passwordField.returnKeyType}
										onSubmitEditing={passwordField.onSubmitEditing}
										blurOnSubmit={passwordField.blurOnSubmit}
										style={styles.inputWithIcon}
										placeholder="Mínimo 6 caracteres"
										placeholderTextColor="rgba(255,255,255,0.5)"
										value={value}
										onChangeText={onChange}
										secureTextEntry={!showPassword}
										autoCapitalize="none"
										cursorColor={lightColors.success}
									/>
									<TouchableOpacity
										onPress={togglePassword}
										hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
									>
										{showPassword ? (
											<EyeOff
												size={RFValue(18)}
												color="rgba(255,255,255,0.5)"
												strokeWidth={2}
											/>
										) : (
											<Eye
												size={RFValue(18)}
												color="rgba(255,255,255,0.5)"
												strokeWidth={2}
											/>
										)}
									</TouchableOpacity>
								</View>
								{passwordStrength && (
									<View style={styles.strengthRow}>
										<View style={styles.strengthBarBg}>
											<View
												style={[
													styles.strengthBarFill,
													{
														backgroundColor:
															STRENGTH_COLORS[passwordStrength],
														width: `${STRENGTH_PROGRESS[passwordStrength] * 100}%`,
													},
												]}
											/>
										</View>
										<Text
											style={[
												styles.strengthText,
												{ color: STRENGTH_COLORS[passwordStrength] },
											]}
										>
											{passwordStrengthLabel}
										</Text>
									</View>
								)}
								{fieldState.error && (
									<ErrorMessage message={fieldState.error.message!} />
								)}
							</View>
						)}
					/>

					{/* Confirm Password */}
					<Controller
						control={control}
						name="confirmPassword"
						render={({ field: { onChange, value }, fieldState }) => (
							<View style={styles.inputGroup}>
								<Text style={styles.label}>Confirmar senha</Text>
								<View
									style={[
										styles.inputWrapperWithIcon,
										fieldState.error && styles.inputError,
									]}
								>
									<View style={styles.inputIconWrap}>
										<Lock
											size={RFValue(16)}
											color="rgba(255,255,255,0.5)"
											strokeWidth={2}
										/>
									</View>
									<TextInput
										ref={confirmPasswordField.ref}
										returnKeyType={confirmPasswordField.returnKeyType}
										onSubmitEditing={confirmPasswordField.onSubmitEditing}
										blurOnSubmit={confirmPasswordField.blurOnSubmit}
										style={styles.inputWithIcon}
										placeholder="Digite a senha novamente"
										placeholderTextColor="rgba(255,255,255,0.5)"
										value={value}
										onChangeText={onChange}
										secureTextEntry={!showConfirmPassword}
										autoCapitalize="none"
										cursorColor={lightColors.success}
									/>
									<TouchableOpacity
										onPress={toggleConfirmPassword}
										hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
									>
										{showConfirmPassword ? (
											<EyeOff
												size={RFValue(18)}
												color="rgba(255,255,255,0.5)"
												strokeWidth={2}
											/>
										) : (
											<Eye
												size={RFValue(18)}
												color="rgba(255,255,255,0.5)"
												strokeWidth={2}
											/>
										)}
									</TouchableOpacity>
								</View>
								{fieldState.error && (
									<ErrorMessage message={fieldState.error.message!} />
								)}
							</View>
						)}
					/>

					{/* Divider */}
					<View style={styles.divider} />

					{/* Terms checkbox */}
					<Controller
						control={control}
						name="acceptTerms"
						render={({ field: { onChange, value } }) => (
							<TouchableOpacity
								style={styles.checkboxRow}
								onPress={() => onChange(!value)}
								activeOpacity={0.7}
							>
								<View
									style={[
										styles.checkbox,
										value && styles.checkboxChecked,
									]}
								/>
								<Text style={styles.termsText}>
									Li e aceito os{' '}
									<Text style={styles.termsLink}>Termos de Uso</Text> e a{' '}
									<Text style={styles.termsLink}>Política de Privacidade</Text>
								</Text>
							</TouchableOpacity>
						)}
					/>

					{/* Error card */}
					{hasFormErrors && (
						<View style={styles.errorCard}>
							<AlertCircle
								size={RFValue(16)}
								color={lightColors.error}
								strokeWidth={2}
							/>
							<View style={styles.errorCardContent}>
								<Text style={styles.errorCardTitle}>
									Corrija os erros acima
								</Text>
								<Text style={styles.errorCardDesc}>
									Alguns campos precisam de atenção.
								</Text>
							</View>
						</View>
					)}
				</View>

				{/* Register button */}
				<TouchableOpacity
					style={[styles.primaryBtn, !isValid && styles.btnDisabled]}
					onPress={handleRegister}
					activeOpacity={0.8}
					disabled={isLoading || !isValid}
				>
					{isLoading ? (
						<ActivityIndicator color={lightColors.onPrimary} size="small" />
					) : (
						<Text style={styles.primaryBtnText}>Criar conta</Text>
					)}
				</TouchableOpacity>

				{/* Login link */}
				<TouchableOpacity
					onPress={navigateToLogin}
					activeOpacity={0.7}
					style={styles.loginLinkWrap}
				>
					<Text style={styles.loginLinkText}>
						Já tem uma conta?{' '}
						<Text style={styles.loginLinkBold}>Entrar</Text>
					</Text>
				</TouchableOpacity>
			</View>
		</FormScreen>
	);
}

function ErrorMessage({ message }: { message: string }) {
	return (
		<View style={styles.errorRow}>
			<AlertCircle
				size={RFValue(12)}
				color={lightColors.error}
				strokeWidth={2}
			/>
			<Text style={styles.errorText}>{message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: lightColors.bgSecondary,
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
	},
	logoContainer: {
		alignItems: 'center',
		paddingTop: RFValue(14),
	},
	titleBlock: {
		gap: RFValue(4),
	},
	title: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(18),
		lineHeight: RFValue(26),
		letterSpacing: -0.24,
		color: lightColors.textPrimary,
	},
	subtitle: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(18),
		color: lightColors.textSecondary,
	},
	formBlock: {
		gap: RFValue(12),
	},
	inputGroup: {
		gap: RFValue(5),
	},
	label: {
		fontFamily: fontFamily.semibold,
		fontSize: RFValue(12),
		lineHeight: RFValue(18),
		color: lightColors.textPrimary,
	},
	inputWrapperWithIcon: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#1A2332',
		borderRadius: RFValue(8),
		borderWidth: 2,
		borderColor: 'transparent',
		height: RFValue(42),
		paddingRight: RFValue(14),
	},
	inputError: {
		borderColor: lightColors.error,
	},
	inputIconWrap: {
		width: RFValue(40),
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputWithIcon: {
		flex: 1,
		fontFamily: fontFamily.regular,
		fontSize: RFValue(14),
		color: lightColors.textPrimary,
		height: '100%',
	},
	divider: {
		height: 1,
		backgroundColor: 'rgba(148,163,184,0.1)',
	},
	strengthRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(6),
	},
	strengthBarBg: {
		flex: 1,
		height: RFValue(4),
		backgroundColor: '#1A2332',
		borderRadius: 9999,
		overflow: 'hidden',
	},
	strengthBarFill: {
		height: '100%',
		borderRadius: 9999,
	},
	strengthText: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(10),
		lineHeight: RFValue(14),
	},
	errorRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(4),
	},
	errorText: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(11),
		lineHeight: RFValue(16),
		color: lightColors.error,
	},
	checkboxRow: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: RFValue(8),
	},
	checkbox: {
		width: RFValue(18),
		height: RFValue(18),
		backgroundColor: '#1A2332',
		borderRadius: RFValue(2),
		marginTop: RFValue(1),
	},
	checkboxChecked: {
		backgroundColor: lightColors.primary,
	},
	termsText: {
		flex: 1,
		fontFamily: fontFamily.medium,
		fontSize: RFValue(11),
		lineHeight: RFValue(17),
		color: lightColors.textSecondary,
	},
	termsLink: {
		color: lightColors.primary,
	},
	errorCard: {
		flexDirection: 'row',
		backgroundColor: '#1A2332',
		borderWidth: 2,
		borderColor: lightColors.error,
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
		fontFamily: fontFamily.semibold,
		fontSize: RFValue(12),
		lineHeight: RFValue(17),
		color: lightColors.error,
	},
	errorCardDesc: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(11),
		lineHeight: RFValue(16),
		color: lightColors.textSecondary,
	},
	primaryBtn: {
		backgroundColor: lightColors.primary,
		height: RFValue(42),
		borderRadius: RFValue(10),
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnDisabled: {
		opacity: 0.5,
	},
	primaryBtnText: {
		fontFamily: fontFamily.semibold,
		fontSize: RFValue(14),
		lineHeight: RFValue(20),
		color: lightColors.onPrimary,
	},
	loginLinkWrap: {
		alignItems: 'center',
	},
	loginLinkText: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(18),
		color: lightColors.textSecondary,
	},
	loginLinkBold: {
		fontFamily: fontFamily.semibold,
		color: lightColors.primary,
	},
});
