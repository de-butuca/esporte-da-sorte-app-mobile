import React, { useCallback, useMemo, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	ActivityIndicator,
	Switch,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily, lightColors } from '@/stampd.config';
import { Controller } from 'react-hook-form';
import { useLoginViewModel } from './login.viewmodel';
import { useAppNavigation } from '@/navigation/hooks';
import { LoginMethod } from './login.types';
import Logo from '@assets/images/logo-square.svg';
import {
	X,
	HelpCircle,
	User,
	AtSign,
	CreditCard,
	Eye,
	EyeOff,
} from 'lucide-react-native';

const LOGIN_METHODS: { key: LoginMethod; label: string; icon: typeof User }[] = [
	{ key: 'usuario', label: 'Usuario', icon: User },
	{ key: 'email', label: 'E-mail', icon: AtSign },
	{ key: 'cpf', label: 'CPF', icon: CreditCard },
];

const ICON_COLOR = lightColors.textInactive;
const TRACK_COLORS = { false: '#282564', true: lightColors.accent };

export default function LoginScreen() {
	const insets = useSafeAreaInsets();
	const { canGoBack, goBack } = useAppNavigation();
	const [showPassword, setShowPassword] = useState(false);
	const togglePassword = useCallback(() => setShowPassword(s => !s), []);

	const {
		control,
		errors,
		isLoading,
		loginMethod,
		setLoginMethod,
		getPlaceholder,
		getKeyboardType,
		handleLogin,
	} = useLoginViewModel();

	const containerStyle = useMemo(
		() => [styles.container, { paddingTop: insets.top + RFValue(10) }],
		[insets.top],
	);
	const bottomCtaStyle = useMemo(
		() => [styles.bottomCta, { paddingBottom: insets.bottom + RFValue(16) }],
		[insets.bottom],
	);

	return (
		<KeyboardAvoidingView
			style={styles.root}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			<View style={containerStyle}>
				{/* Top bar */}
				<View style={styles.topBar}>
					<TouchableOpacity style={styles.topBarBtn} activeOpacity={0.7}>
						<HelpCircle size={RFValue(22)} color={lightColors.textMuted} strokeWidth={1.8} />
					</TouchableOpacity>
					{canGoBack() && (
						<TouchableOpacity
							style={styles.topBarBtn}
							activeOpacity={0.7}
							onPress={goBack}
						>
							<X size={RFValue(22)} color={lightColors.textMuted} strokeWidth={1.8} />
						</TouchableOpacity>
					)}
				</View>

				{/* Logo */}
				<View style={styles.logoContainer}>
					<Logo width={RFValue(140)} height={RFValue(48)} />
				</View>

				<ScrollView
					style={styles.scroll}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
				>
					{/* Login ID label */}
					<Text style={styles.sectionLabel}>Login ID</Text>

					{/* Method tabs */}
					<View style={styles.methodTabs}>
						{LOGIN_METHODS.map((method) => {
							const isActive = loginMethod === method.key;
							const Icon = method.icon;
							return (
								<TouchableOpacity
									key={method.key}
									style={[styles.methodTab, isActive && styles.methodTabActive]}
									onPress={() => setLoginMethod(method.key)}
									activeOpacity={0.7}
								>
									<Icon
										size={RFValue(14)}
										color={isActive ? lightColors.bgNav : lightColors.textMuted}
										strokeWidth={2}
									/>
									<Text
										style={[
											styles.methodTabText,
											isActive && styles.methodTabTextActive,
										]}
									>
										{method.label}
									</Text>
								</TouchableOpacity>
							);
						})}
					</View>

					{/* Identifier input */}
					<Controller
						control={control}
						name="identifier"
						render={({ field: { onChange, value }, fieldState }) => (
							<View style={styles.inputGroup}>
								<View
									style={[
										styles.inputWrapper,
										fieldState.error && styles.inputError,
									]}
								>
									<User
										size={RFValue(18)}
										color={ICON_COLOR}
										strokeWidth={1.8}
										style={styles.inputIcon}
									/>
									<TextInput
										style={styles.input}
										placeholder={getPlaceholder()}
										placeholderTextColor={ICON_COLOR}
										value={value}
										onChangeText={onChange}
										autoCapitalize="none"
										keyboardType={getKeyboardType()}
										cursorColor={lightColors.accent}
									/>
								</View>
								{fieldState.error ? (
									<Text style={styles.errorText}>{fieldState.error.message}</Text>
								) : (
									<Text style={styles.helperText}>
										Escolha seu metodo preferido para fazer login: Usuario, E-mail
										ou CPF
									</Text>
								)}
							</View>
						)}
					/>

					{/* Password input */}
					<Controller
						control={control}
						name="password"
						render={({ field: { onChange, value }, fieldState }) => (
							<View style={styles.inputGroup}>
								<View
									style={[
										styles.inputWrapper,
										fieldState.error && styles.inputError,
									]}
								>
									<TextInput
										style={[styles.input, styles.inputNoIcon]}
										placeholder="Senha"
										placeholderTextColor={ICON_COLOR}
										value={value}
										onChangeText={onChange}
										secureTextEntry={!showPassword}
										autoCapitalize="none"
										cursorColor={lightColors.accent}
									/>
									<TouchableOpacity
										onPress={togglePassword}
										style={styles.eyeBtn}
										activeOpacity={0.7}
									>
										{showPassword ? (
											<EyeOff size={RFValue(18)} color={ICON_COLOR} strokeWidth={1.8} />
										) : (
											<Eye size={RFValue(18)} color={ICON_COLOR} strokeWidth={1.8} />
										)}
									</TouchableOpacity>
								</View>
								{fieldState.error && (
									<Text style={styles.errorText}>{fieldState.error.message}</Text>
								)}
							</View>
						)}
					/>

					{/* Forgot password */}
					<TouchableOpacity activeOpacity={0.7} style={styles.forgotBtn}>
						<Text style={styles.forgotText}>Esqueceu a senha?</Text>
					</TouchableOpacity>

					{/* Keep session */}
					<Controller
						control={control}
						name="keepSession"
						render={({ field: { onChange, value } }) => (
							<View style={styles.keepSessionRow}>
								<Text style={styles.keepSessionText}>
									Manter a minha sessao ativa
								</Text>
								<Switch
									value={value}
									onValueChange={onChange}
									trackColor={TRACK_COLORS}
									thumbColor={lightColors.textPrimary}
								/>
							</View>
						)}
					/>

					{/* Login button */}
					<TouchableOpacity
						style={[styles.loginBtn, isLoading && styles.loginBtnDisabled]}
						onPress={handleLogin}
						activeOpacity={0.8}
						disabled={isLoading}
					>
						{isLoading ? (
							<ActivityIndicator color={lightColors.bgNav} size="small" />
						) : (
							<Text style={styles.loginBtnText}>INICIAR SESSAO</Text>
						)}
					</TouchableOpacity>
				</ScrollView>

				{/* Bottom register CTA */}
				<View style={bottomCtaStyle}>
					<TouchableOpacity style={styles.registerBtn} activeOpacity={0.8}>
						<Text style={styles.registerText}>
							Novo membro? <Text style={styles.registerTextBold}>Entre aqui</Text>
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: lightColors.background,
	},
	container: {
		flex: 1,
	},
	topBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: RFValue(16),
		paddingVertical: RFValue(12),
	},
	topBarBtn: {
		padding: RFValue(4),
	},
	logoContainer: {
		alignItems: 'center',
		paddingVertical: RFValue(16),
	},
	scroll: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: RFValue(24),
		paddingTop: RFValue(24),
	},
	sectionLabel: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(18),
		color: lightColors.textPrimary,
		marginBottom: RFValue(12),
	},
	methodTabs: {
		flexDirection: 'row',
		gap: RFValue(8),
		marginBottom: RFValue(20),
	},
	methodTab: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(6),
		paddingHorizontal: RFValue(14),
		paddingVertical: RFValue(8),
		borderRadius: RFValue(50),
		borderWidth: 1,
		borderColor: '#282564',
		backgroundColor: 'transparent',
	},
	methodTabActive: {
		backgroundColor: lightColors.accent,
		borderColor: lightColors.accent,
	},
	methodTabText: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(12),
		color: lightColors.textMuted,
	},
	methodTabTextActive: {
		color: lightColors.bgNav,
		fontFamily: fontFamily.bold,
	},
	inputGroup: {
		marginBottom: RFValue(16),
	},
	inputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: lightColors.bgCard,
		borderRadius: RFValue(10),
		borderWidth: 1,
		borderColor: '#282564',
		height: RFValue(48),
		paddingHorizontal: RFValue(16),
	},
	inputError: {
		borderColor: lightColors.live,
		borderWidth: 2,
	},
	inputIcon: {
		marginRight: RFValue(12),
	},
	input: {
		flex: 1,
		fontFamily: fontFamily.regular,
		fontSize: RFValue(14),
		color: lightColors.textPrimary,
		height: '100%',
	},
	inputNoIcon: {
		paddingLeft: 0,
	},
	eyeBtn: {
		padding: RFValue(4),
		marginLeft: RFValue(8),
	},
	helperText: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(11),
		color: lightColors.textInactive,
		marginTop: RFValue(8),
		lineHeight: RFValue(16),
	},
	errorText: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(11),
		color: lightColors.live,
		marginTop: RFValue(6),
	},
	forgotBtn: {
		alignSelf: 'flex-start',
		marginBottom: RFValue(16),
	},
	forgotText: {
		fontFamily: fontFamily.medium,
		fontSize: RFValue(13),
		color: lightColors.accent,
	},
	keepSessionRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: RFValue(24),
	},
	keepSessionText: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(13),
		color: lightColors.textPrimary,
	},
	loginBtn: {
		backgroundColor: lightColors.accent,
		borderRadius: RFValue(10),
		height: RFValue(50),
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: RFValue(24),
	},
	loginBtnDisabled: {
		opacity: 0.6,
	},
	loginBtnText: {
		fontFamily: fontFamily.bold,
		fontSize: RFValue(14),
		color: lightColors.bgNav,
		letterSpacing: 1,
	},
	bottomCta: {
		paddingHorizontal: RFValue(24),
	},
	registerBtn: {
		backgroundColor: lightColors.bgCard,
		borderRadius: RFValue(10),
		height: RFValue(50),
		alignItems: 'center',
		justifyContent: 'center',
	},
	registerText: {
		fontFamily: fontFamily.regular,
		fontSize: RFValue(14),
		color: lightColors.textMuted,
	},
	registerTextBold: {
		fontFamily: fontFamily.bold,
		color: lightColors.accent,
	},
});
