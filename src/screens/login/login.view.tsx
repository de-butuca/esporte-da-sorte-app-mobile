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
import { useLoginViewModel } from './login.viewmodel';
import { useAppNavigation } from '@/navigation/hooks';
import { FormFieldsProvider, FormScreen, useFormField } from '@/components/FormScreen';
import { useAuthThemeStore } from '@/core/auth/useAuthThemeStore';
import Logo from '@assets/images/logo-square.svg';
import { ArrowLeft, MessageSquare, Eye, EyeOff } from 'lucide-react-native';

function LoginHeader({ colors }: { colors: LoginThemeColors }) {
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

export default function LoginScreen() {
	return (
		<FormFieldsProvider fieldCount={2}>
			<LoginForm />
		</FormFieldsProvider>
	);
}

function LoginForm() {
	const colors = useAuthThemeStore((s) => s.colors);

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

	const themed = useMemo(() => createThemedStyles(colors), [colors]);

	return (
		<FormScreen header={<LoginHeader colors={colors} />} backgroundColor={colors.background}>
			<View style={styles.content}>
				<View style={styles.logoContainer}>
					<Logo width={RFValue(100)} height={RFValue(34)} />
				</View>

				<View style={styles.titleBlock}>
					<Text style={[styles.title, { color: colors.textPrimary }]}>Entrar</Text>
					<Text style={[styles.subtitle, { color: colors.textSecondary }]}>
						Acesse sua conta para apostar em segundos.
					</Text>
				</View>

				<View style={styles.formBlock}>
					<Controller
						control={control}
						name="email"
						render={({ field: { onChange, value, onBlur }, fieldState }) => (
							<View style={styles.inputGroup}>
								<Text style={[styles.label, { color: colors.textPrimary }]}>Email</Text>
								<View
									style={[
										themed.inputWrapper,
										fieldState.isTouched &&
										!fieldState.error &&
										value.length > 0 &&
										themed.inputFocused,
										fieldState.error && themed.inputError,
									]}
								>
									<TextInput
										ref={emailField.ref}
										returnKeyType={emailField.returnKeyType}
										onSubmitEditing={emailField.onSubmitEditing}
										blurOnSubmit={emailField.blurOnSubmit}
										style={[styles.input, { color: colors.textPrimary }]}
										placeholder="Digite seu email"
										placeholderTextColor={colors.inputPlaceholder}
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										autoCapitalize="none"
										keyboardType="email-address"
										cursorColor={colors.primary}
									/>
								</View>
								{fieldState.error && (
									<Text style={[styles.errorText, { color: colors.error }]}>
										{fieldState.error.message}
									</Text>
								)}
							</View>
						)}
					/>

					<View>
						<Controller
							control={control}
							name="password"
							render={({ field: { onChange, value, onBlur }, fieldState }) => (
								<View style={styles.inputGroup}>
									<Text style={[styles.label, { color: colors.textPrimary }]}>Senha</Text>
									<View
										style={[
											themed.inputWrapper,
											fieldState.isTouched &&
											!fieldState.error &&
											value.length > 0 &&
											themed.inputFocused,
											fieldState.error && themed.inputError,
										]}
									>
										<TextInput
											ref={passwordField.ref}
											returnKeyType={passwordField.returnKeyType}
											onSubmitEditing={passwordField.onSubmitEditing}
											blurOnSubmit={passwordField.blurOnSubmit}
											style={[styles.input, { color: colors.textPrimary }]}
											placeholder="Digite sua senha"
											placeholderTextColor={colors.inputPlaceholder}
											value={value}
											onChangeText={onChange}
											onBlur={onBlur}
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
									{fieldState.error && (
										<Text style={[styles.errorText, { color: colors.error }]}>
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
							<Text style={[styles.forgotText, { color: colors.primary }]}>Esqueci minha senha</Text>
						</TouchableOpacity>
					</View>
				</View>

				<TouchableOpacity
					style={[themed.primaryBtn, !canSubmit && styles.btnDisabled]}
					onPress={handleLogin}
					activeOpacity={0.8}
					disabled={isLoading || !canSubmit}
				>
					{isLoading ? (
						<ActivityIndicator color={colors.onPrimary} size="small" />
					) : (
						<Text style={[styles.primaryBtnText, { color: colors.onPrimary }]}>Entrar</Text>
					)}
				</TouchableOpacity>

				<View style={styles.dividerRow}>
					<View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
					<Text style={[styles.dividerText, { color: colors.textDisabled }]}>ou</Text>
					<View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
				</View>

				<TouchableOpacity
					style={[styles.outlineBtn, { borderColor: colors.primary }]}
					onPress={navigateToRegister}
					activeOpacity={0.8}
				>
					<Text style={[styles.outlineBtnText, { color: colors.primary }]}>Criar conta</Text>
				</TouchableOpacity>

				<View style={styles.footer}>
					<Text style={[styles.footerText, { color: colors.textSecondary }]}>
						Jogo responsável · Proibido para menores de 18 anos.
					</Text>
					<Text style={[styles.footerLinks, { color: colors.primary }]}>
						Termos de Uso  ·  Política de Privacidade
					</Text>
				</View>
			</View>
		</FormScreen>
	);
}

function createThemedStyles(colors: LoginThemeColors) {
	return StyleSheet.create({
		inputWrapper: {
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: colors.inputBackground,
			borderRadius: RFValue(8),
			borderWidth: 2,
			borderColor: 'transparent',
			height: RFValue(42),
			paddingHorizontal: RFValue(14),
		},
		inputFocused: {
			borderWidth: 1,
			borderColor: colors.inputFocusBorder,
		},
		inputError: {
			borderWidth: 2,
			borderColor: colors.inputErrorBorder,
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
	},
	subtitle: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(12),
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
	},
	input: {
		flex: 1,
		fontFamily: fontFamily.regular,
		fontSize: RFValue(14),
		height: '100%',
	},
	errorText: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(11),
	},
	forgotBtn: {
		alignSelf: 'flex-end',
		marginTop: RFValue(10),
	},
	forgotText: {
		fontFamily: fontFamily.semibold,
		fontSize: RFValue(11),
	},
	btnDisabled: {
		opacity: 0.5,
	},
	primaryBtnText: {
		fontFamily: fontFamily.semibold,
		fontSize: RFValue(13),
		lineHeight: RFValue(18),
	},
	dividerRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(12),
	},
	dividerLine: {
		flex: 1,
		height: 1,
	},
	dividerText: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(11),
	},
	outlineBtn: {
		height: RFValue(42),
		borderRadius: RFValue(10),
		borderWidth: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	outlineBtnText: {
		fontFamily: fontFamily.semibold,
		fontSize: RFValue(13),
		lineHeight: RFValue(18),
	},
	footer: {
		gap: RFValue(4),
		alignItems: 'center',
	},
	footerText: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(10),
		opacity: 0.5,
		textAlign: 'center',
	},
	footerLinks: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(10),
		opacity: 0.6,
		textAlign: 'center',
	},
});
