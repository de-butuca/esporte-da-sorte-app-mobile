import { useCallback, useMemo, useState } from 'react';
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
import { fontFamily, type LoginThemeColors } from '@/stampd.config';
import { Controller } from 'react-hook-form';
import { useRegisterViewModel } from './register.viewmodel';
import { useAppNavigation } from '@/navigation/hooks';
import { FormFieldsProvider, FormScreen, useFormField } from '@/components/FormScreen';
import { useAuthThemeStore } from '@/core/auth/useAuthThemeStore';
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

function RegisterHeader({ colors }: { colors: LoginThemeColors }) {
	const insets = useSafeAreaInsets();
	const { canGoBack, goBack } = useAppNavigation();

	return (
		<View style={[styles.header, { backgroundColor: colors.bgSecondary, paddingTop: insets.top }]}>
			<View style={styles.headerRow}>
				{canGoBack() ? (
					<TouchableOpacity
						onPress={goBack}
						activeOpacity={0.7}
						hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
					>
						<ArrowLeft size={RFValue(20)} color={colors.textPrimary} strokeWidth={2} />
					</TouchableOpacity>
				) : (
					<View style={{ width: RFValue(20) }} />
				)}
				<TouchableOpacity
					activeOpacity={0.7}
					hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
				>
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

	const themed = useMemo(() => createThemedStyles(colors), [colors]);

	const strengthColors: Record<PasswordStrength, string> = useMemo(() => ({
		weak: colors.error,
		medium: colors.warning,
		strong: colors.success,
	}), [colors]);

	return (
		<FormScreen header={<RegisterHeader colors={colors} />} backgroundColor={colors.background}>
			<View style={styles.content}>
				{/* Logo */}
				<View style={styles.logoContainer}>
					<Logo width={RFValue(100)} height={RFValue(34)} />
				</View>

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
										themed.inputWrapperWithIcon,
										fieldState.error && themed.inputError,
									]}
								>
									<View style={styles.inputIconWrap}>
										<User
											size={RFValue(16)}
											color={colors.textDisabled}
											strokeWidth={2}
										/>
									</View>
									<TextInput
										ref={cpfField.ref}
										returnKeyType={cpfField.returnKeyType}
										onSubmitEditing={cpfField.onSubmitEditing}
										blurOnSubmit={cpfField.blurOnSubmit}
										style={[styles.inputWithIcon, { color: colors.textPrimary }]}
										placeholder="000.000.000-00"
										placeholderTextColor={colors.inputPlaceholder}
										value={value}
										onChangeText={(text) => handleCpfChange(text, onChange)}
										keyboardType="numeric"
										cursorColor={colors.primary}
									/>
								</View>
								{fieldState.error && (
									<ErrorMessage message={fieldState.error.message!} color={colors.error} />
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
								<Text style={[styles.label, { color: colors.textPrimary }]}>E-mail</Text>
								<View
									style={[
										themed.inputWrapperWithIcon,
										fieldState.error && themed.inputError,
									]}
								>
									<View style={styles.inputIconWrap}>
										<Mail
											size={RFValue(16)}
											color={colors.textDisabled}
											strokeWidth={2}
										/>
									</View>
									<TextInput
										ref={emailField.ref}
										returnKeyType={emailField.returnKeyType}
										onSubmitEditing={emailField.onSubmitEditing}
										blurOnSubmit={emailField.blurOnSubmit}
										style={[styles.inputWithIcon, { color: colors.textPrimary }]}
										placeholder="seu@email.com"
										placeholderTextColor={colors.inputPlaceholder}
										value={value}
										onChangeText={onChange}
										autoCapitalize="none"
										keyboardType="email-address"
										cursorColor={colors.primary}
									/>
								</View>
								{fieldState.error && (
									<ErrorMessage message={fieldState.error.message!} color={colors.error} />
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
								<Text style={[styles.label, { color: colors.textPrimary }]}>Celular</Text>
								<View
									style={[
										themed.inputWrapperWithIcon,
										fieldState.error && themed.inputError,
									]}
								>
									<View style={styles.inputIconWrap}>
										<Phone
											size={RFValue(16)}
											color={colors.textDisabled}
											strokeWidth={2}
										/>
									</View>
									<TextInput
										ref={phoneField.ref}
										returnKeyType={phoneField.returnKeyType}
										onSubmitEditing={phoneField.onSubmitEditing}
										blurOnSubmit={phoneField.blurOnSubmit}
										style={[styles.inputWithIcon, { color: colors.textPrimary }]}
										placeholder="(00) 00000-0000"
										placeholderTextColor={colors.inputPlaceholder}
										value={value}
										onChangeText={(text) => handlePhoneChange(text, onChange)}
										keyboardType="phone-pad"
										cursorColor={colors.primary}
									/>
								</View>
								{fieldState.error && (
									<ErrorMessage message={fieldState.error.message!} color={colors.error} />
								)}
							</View>
						)}
					/>

					{/* Divider */}
					<View style={[styles.divider, { backgroundColor: colors.border }]} />

					{/* Password */}
					<Controller
						control={control}
						name="password"
						render={({ field: { onChange, value }, fieldState }) => (
							<View style={styles.inputGroup}>
								<Text style={[styles.label, { color: colors.textPrimary }]}>Senha</Text>
								<View
									style={[
										themed.inputWrapperWithIcon,
										fieldState.error && themed.inputError,
									]}
								>
									<View style={styles.inputIconWrap}>
										<Lock
											size={RFValue(16)}
											color={colors.textDisabled}
											strokeWidth={2}
										/>
									</View>
									<TextInput
										ref={passwordField.ref}
										returnKeyType={passwordField.returnKeyType}
										onSubmitEditing={passwordField.onSubmitEditing}
										blurOnSubmit={passwordField.blurOnSubmit}
										style={[styles.inputWithIcon, { color: colors.textPrimary }]}
										placeholder="Mínimo 6 caracteres"
										placeholderTextColor={colors.inputPlaceholder}
										value={value}
										onChangeText={onChange}
										secureTextEntry={!showPassword}
										autoCapitalize="none"
										cursorColor={colors.primary}
									/>
									<TouchableOpacity
										onPress={togglePassword}
										hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
									>
										{showPassword ? (
											<EyeOff
												size={RFValue(18)}
												color={colors.textDisabled}
												strokeWidth={2}
											/>
										) : (
											<Eye
												size={RFValue(18)}
												color={colors.textDisabled}
												strokeWidth={2}
											/>
										)}
									</TouchableOpacity>
								</View>
								{passwordStrength && (
									<View style={styles.strengthRow}>
										<View style={[styles.strengthBarBg, { backgroundColor: colors.surface1 }]}>
											<View
												style={[
													styles.strengthBarFill,
													{
														backgroundColor: strengthColors[passwordStrength],
														width: `${STRENGTH_PROGRESS[passwordStrength] * 100}%`,
													},
												]}
											/>
										</View>
										<Text
											style={[
												styles.strengthText,
												{ color: strengthColors[passwordStrength] },
											]}
										>
											{passwordStrengthLabel}
										</Text>
									</View>
								)}
								{fieldState.error && (
									<ErrorMessage message={fieldState.error.message!} color={colors.error} />
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
								<Text style={[styles.label, { color: colors.textPrimary }]}>Confirmar senha</Text>
								<View
									style={[
										themed.inputWrapperWithIcon,
										fieldState.error && themed.inputError,
									]}
								>
									<View style={styles.inputIconWrap}>
										<Lock
											size={RFValue(16)}
											color={colors.textDisabled}
											strokeWidth={2}
										/>
									</View>
									<TextInput
										ref={confirmPasswordField.ref}
										returnKeyType={confirmPasswordField.returnKeyType}
										onSubmitEditing={confirmPasswordField.onSubmitEditing}
										blurOnSubmit={confirmPasswordField.blurOnSubmit}
										style={[styles.inputWithIcon, { color: colors.textPrimary }]}
										placeholder="Digite a senha novamente"
										placeholderTextColor={colors.inputPlaceholder}
										value={value}
										onChangeText={onChange}
										secureTextEntry={!showConfirmPassword}
										autoCapitalize="none"
										cursorColor={colors.primary}
									/>
									<TouchableOpacity
										onPress={toggleConfirmPassword}
										hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
									>
										{showConfirmPassword ? (
											<EyeOff
												size={RFValue(18)}
												color={colors.textDisabled}
												strokeWidth={2}
											/>
										) : (
											<Eye
												size={RFValue(18)}
												color={colors.textDisabled}
												strokeWidth={2}
											/>
										)}
									</TouchableOpacity>
								</View>
								{fieldState.error && (
									<ErrorMessage message={fieldState.error.message!} color={colors.error} />
								)}
							</View>
						)}
					/>

					{/* Divider */}
					<View style={[styles.divider, { backgroundColor: colors.border }]} />

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
										themed.checkbox,
										value && { backgroundColor: colors.primary },
									]}
								/>
								<Text style={[styles.termsText, { color: colors.textSecondary }]}>
									Li e aceito os{' '}
									<Text style={{ color: colors.primary }}>Termos de Uso</Text> e a{' '}
									<Text style={{ color: colors.primary }}>Política de Privacidade</Text>
								</Text>
							</TouchableOpacity>
						)}
					/>

					{/* Error card */}
					{hasFormErrors && (
						<View style={[styles.errorCard, { backgroundColor: colors.surface1, borderColor: colors.error }]}>
							<AlertCircle
								size={RFValue(16)}
								color={colors.error}
								strokeWidth={2}
							/>
							<View style={styles.errorCardContent}>
								<Text style={[styles.errorCardTitle, { color: colors.error }]}>
									Corrija os erros acima
								</Text>
								<Text style={[styles.errorCardDesc, { color: colors.textSecondary }]}>
									Alguns campos precisam de atenção.
								</Text>
							</View>
						</View>
					)}
				</View>

				{/* Register button */}
				<TouchableOpacity
					style={[themed.primaryBtn, !isValid && styles.btnDisabled]}
					onPress={handleRegister}
					activeOpacity={0.8}
					disabled={isLoading || !isValid}
				>
					{isLoading ? (
						<ActivityIndicator color={colors.onPrimary} size="small" />
					) : (
						<Text style={[styles.primaryBtnText, { color: colors.onPrimary }]}>Criar conta</Text>
					)}
				</TouchableOpacity>

				{/* Login link */}
				<TouchableOpacity
					onPress={navigateToLogin}
					activeOpacity={0.7}
					style={styles.loginLinkWrap}
				>
					<Text style={[styles.loginLinkText, { color: colors.textSecondary }]}>
						Já tem uma conta?{' '}
						<Text style={[styles.loginLinkBold, { color: colors.primary }]}>Entrar</Text>
					</Text>
				</TouchableOpacity>
			</View>
		</FormScreen>
	);
}

const STRENGTH_PROGRESS: Record<PasswordStrength, number> = {
	weak: 0.33,
	medium: 0.66,
	strong: 1,
};

function ErrorMessage({ message, color }: { message: string; color: string }) {
	return (
		<View style={styles.errorRow}>
			<AlertCircle
				size={RFValue(12)}
				color={color}
				strokeWidth={2}
			/>
			<Text style={[styles.errorText, { color }]}>{message}</Text>
		</View>
	);
}

function createThemedStyles(colors: LoginThemeColors) {
	return StyleSheet.create({
		inputWrapperWithIcon: {
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: colors.inputBackground,
			borderRadius: RFValue(8),
			borderWidth: 2,
			borderColor: 'transparent',
			height: RFValue(42),
			paddingRight: RFValue(14),
		},
		inputError: {
			borderColor: colors.inputErrorBorder,
		},
		checkbox: {
			width: RFValue(18),
			height: RFValue(18),
			backgroundColor: colors.surface1,
			borderRadius: RFValue(2),
			marginTop: RFValue(1),
		},
		primaryBtn: {
			backgroundColor: colors.primary,
			height: RFValue(42),
			borderRadius: RFValue(10),
			alignItems: 'center',
			justifyContent: 'center',
		},
	});
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
	},
	subtitle: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(18),
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
	},
	checkboxRow: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: RFValue(8),
	},
	termsText: {
		flex: 1,
		fontFamily: fontFamily.medium,
		fontSize: RFValue(11),
		lineHeight: RFValue(17),
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
		fontFamily: fontFamily.semibold,
		fontSize: RFValue(12),
		lineHeight: RFValue(17),
	},
	errorCardDesc: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(11),
		lineHeight: RFValue(16),
	},
	btnDisabled: {
		opacity: 0.5,
	},
	primaryBtnText: {
		fontFamily: fontFamily.semibold,
		fontSize: RFValue(14),
		lineHeight: RFValue(20),
	},
	loginLinkWrap: {
		alignItems: 'center',
	},
	loginLinkText: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		lineHeight: RFValue(18),
	},
	loginLinkBold: {
		fontFamily: fontFamily.semibold,
	},
});
