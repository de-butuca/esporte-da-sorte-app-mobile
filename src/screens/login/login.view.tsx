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
import { useLoginViewModel } from './login.viewmodel';
import { useAppNavigation } from '@/navigation/hooks';
import { FormFieldsProvider, FormScreen, useFormField } from '@/components/FormScreen';
import Logo from '@assets/images/logo-square.svg';
import { ArrowLeft, MessageSquare, Eye, EyeOff } from 'lucide-react-native';

function LoginHeader() {
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
export default function LoginScreen() {
	return (
		<FormFieldsProvider fieldCount={2}>
			<LoginForm />
		</FormFieldsProvider>
	);
}

/** Componente interno: usa useFormField (já dentro do Provider) */
function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const togglePassword = useCallback(() => setShowPassword((s) => !s), []);

	const {
		control,
		isLoading,
		canSubmit,
		handleLogin,
		navigateToRegister,
	} = useLoginViewModel();

	const emailField = useFormField(0);
	const passwordField = useFormField(1, handleLogin);

	return (
		<FormScreen header={<LoginHeader />}>
			<View style={styles.content}>
				{/* Logo */}
				<View style={styles.logoContainer}>
					<Logo width={RFValue(100)} height={RFValue(34)} />
				</View>

				{/* Title */}
				<View style={styles.titleBlock}>
					<Text style={styles.title}>Entrar</Text>
					<Text style={styles.subtitle}>
						Acesse sua conta para apostar em segundos.
					</Text>
				</View>

				{/* Form */}
				<View style={styles.formBlock}>
					{/* Email */}
					<Controller
						control={control}
						name="email"
						render={({ field: { onChange, value, onBlur }, fieldState }) => (
							<View style={styles.inputGroup}>
								<Text style={styles.label}>Email</Text>
								<View
									style={[
										styles.inputWrapper,
										fieldState.isTouched &&
											!fieldState.error &&
											value.length > 0 &&
											styles.inputFocused,
										fieldState.error && styles.inputError,
									]}
								>
									<TextInput
										ref={emailField.ref}
										returnKeyType={emailField.returnKeyType}
										onSubmitEditing={emailField.onSubmitEditing}
										blurOnSubmit={emailField.blurOnSubmit}
										style={styles.input}
										placeholder="Digite seu email"
										placeholderTextColor="rgba(255,255,255,0.5)"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										autoCapitalize="none"
										keyboardType="email-address"
										cursorColor={lightColors.success}
									/>
								</View>
								{fieldState.error && (
									<Text style={styles.errorText}>
										{fieldState.error.message}
									</Text>
								)}
							</View>
						)}
					/>

					{/* Password */}
					<View>
						<Controller
							control={control}
							name="password"
							render={({ field: { onChange, value, onBlur }, fieldState }) => (
								<View style={styles.inputGroup}>
									<Text style={styles.label}>Senha</Text>
									<View
										style={[
											styles.inputWrapper,
											fieldState.isTouched &&
												!fieldState.error &&
												value.length > 0 &&
												styles.inputFocused,
											fieldState.error && styles.inputError,
										]}
									>
										<TextInput
											ref={passwordField.ref}
											returnKeyType={passwordField.returnKeyType}
											onSubmitEditing={passwordField.onSubmitEditing}
											blurOnSubmit={passwordField.blurOnSubmit}
											style={styles.input}
											placeholder="Digite sua senha"
											placeholderTextColor="rgba(255,255,255,0.5)"
											value={value}
											onChangeText={onChange}
											onBlur={onBlur}
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
									{fieldState.error && (
										<Text style={styles.errorText}>
											{fieldState.error.message}
										</Text>
									)}
								</View>
							)}
						/>
						<TouchableOpacity
							activeOpacity={0.7}
							style={styles.forgotBtn}
						>
							<Text style={styles.forgotText}>Esqueci minha senha</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* Login button */}
				<TouchableOpacity
					style={[styles.primaryBtn, !canSubmit && styles.btnDisabled]}
					onPress={handleLogin}
					activeOpacity={0.8}
					disabled={isLoading || !canSubmit}
				>
					{isLoading ? (
						<ActivityIndicator color={lightColors.onPrimary} size="small" />
					) : (
						<Text style={styles.primaryBtnText}>Entrar</Text>
					)}
				</TouchableOpacity>

				{/* Divider */}
				<View style={styles.dividerRow}>
					<View style={styles.dividerLine} />
					<Text style={styles.dividerText}>ou</Text>
					<View style={styles.dividerLine} />
				</View>

				{/* Register button */}
				<TouchableOpacity
					style={styles.outlineBtn}
					onPress={navigateToRegister}
					activeOpacity={0.8}
				>
					<Text style={styles.outlineBtnText}>Criar conta</Text>
				</TouchableOpacity>

				{/* Footer */}
				<View style={styles.footer}>
					<Text style={styles.footerText}>
						Jogo responsável · Proibido para menores de 18 anos.
					</Text>
					<Text style={styles.footerLinks}>
						Termos de Uso  ·  Política de Privacidade
					</Text>
				</View>
			</View>
		</FormScreen>
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
		gap: RFValue(22),
	},
	logoContainer: {
		alignItems: 'center',
		paddingTop: RFValue(16),
	},
	titleBlock: {
		gap: RFValue(4),
	},
	title: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(18),
		color: lightColors.textPrimary,
	},
	subtitle: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
		color: lightColors.textSecondary,
	},
	formBlock: {
		gap: RFValue(20),
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
	inputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#1A2332',
		borderRadius: RFValue(8),
		borderWidth: 2,
		borderColor: 'transparent',
		height: RFValue(42),
		paddingHorizontal: RFValue(14),
	},
	inputFocused: {
		borderWidth: 1,
		borderColor: lightColors.success,
	},
	inputError: {
		borderWidth: 2,
		borderColor: lightColors.error,
	},
	input: {
		flex: 1,
		fontFamily: fontFamily.regular,
		fontSize: RFValue(14),
		color: lightColors.textPrimary,
		height: '100%',
	},
	errorText: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(11),
		color: lightColors.error,
	},
	forgotBtn: {
		alignSelf: 'flex-end',
		marginTop: RFValue(10),
	},
	forgotText: {
		fontFamily: fontFamily.semibold,
		fontSize: RFValue(11),
		color: lightColors.primary,
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
		fontSize: RFValue(13),
		lineHeight: RFValue(18),
		color: lightColors.onPrimary,
	},
	dividerRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(12),
	},
	dividerLine: {
		flex: 1,
		height: 1,
		backgroundColor: 'rgba(128,128,153,0.2)',
	},
	dividerText: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(11),
		color: '#808099',
	},
	outlineBtn: {
		height: RFValue(42),
		borderRadius: RFValue(10),
		borderWidth: 2,
		borderColor: lightColors.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	outlineBtnText: {
		fontFamily: fontFamily.semibold,
		fontSize: RFValue(13),
		lineHeight: RFValue(18),
		color: lightColors.primary,
	},
	footer: {
		gap: RFValue(4),
		alignItems: 'center',
	},
	footerText: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(10),
		color: lightColors.textSecondary,
		opacity: 0.5,
		textAlign: 'center',
	},
	footerLinks: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(10),
		color: lightColors.primary,
		opacity: 0.6,
		textAlign: 'center',
	},
});
