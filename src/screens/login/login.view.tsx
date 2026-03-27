import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
	ScrollView,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller } from 'react-hook-form';
import { Eye, EyeOff, ArrowLeft, Mail, Lock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLoginViewModel } from './login.viewmodel';
import { useAppNavigation } from '@/navigation/hooks';

export default function LoginScreen() {
	const { handleLogin, control, isLoading, errors } = useLoginViewModel();
	const insets = useSafeAreaInsets();
	const navigation = useAppNavigation();
	const [securePassword, setSecurePassword] = useState(true);

	return (
		<View style={[styles.root, { paddingTop: insets.top }]}>
			<KeyboardAvoidingView
				style={styles.flex}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<ScrollView
					contentContainerStyle={styles.scrollContent}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					{/* Header with back button */}
					<TouchableOpacity
						style={styles.backButton}
						onPress={() => navigation.goBack()}
						activeOpacity={0.7}
					>
						<ArrowLeft color="#FFFFFF" size={RFValue(22)} />
					</TouchableOpacity>

					{/* Logo / Brand area */}
					<View style={styles.brandArea}>
						<LinearGradient
							colors={['#023397', '#38E67D']}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={styles.logoGradient}
						>
							<Text style={styles.logoText}>ES</Text>
						</LinearGradient>
						<Text style={styles.brandTitle}>Esportes da Sorte</Text>
						<Text style={styles.brandSubtitle}>
							Entre na sua conta para continuar
						</Text>
					</View>

					{/* Form card */}
					<View style={styles.formCard}>
						{/* Email input */}
						<View style={styles.fieldGroup}>
							<Text style={styles.label}>E-mail</Text>
							<Controller
								control={control}
								name="email"
								render={({ field: { onChange, value, onBlur }, fieldState }) => (
									<View
										style={[
											styles.inputContainer,
											fieldState.error && styles.inputError,
											fieldState.isTouched && !fieldState.error && value
												? styles.inputFocused
												: null,
										]}
									>
										<Mail
											color={fieldState.error ? '#FF3B3B' : '#808099'}
											size={RFValue(18)}
										/>
										<TextInput
											style={styles.input}
											value={value}
											onChangeText={onChange}
											onBlur={onBlur}
											placeholder="Digite seu e-mail"
											placeholderTextColor="#808099"
											keyboardType="email-address"
											autoCapitalize="none"
											autoComplete="email"
											cursorColor="#38E67D"
										/>
									</View>
								)}
							/>
							{errors.email && (
								<Text style={styles.errorText}>{errors.email.message}</Text>
							)}
						</View>

						{/* Password input */}
						<View style={styles.fieldGroup}>
							<Text style={styles.label}>Senha</Text>
							<Controller
								control={control}
								name="password"
								render={({ field: { onChange, value, onBlur }, fieldState }) => (
									<View
										style={[
											styles.inputContainer,
											fieldState.error && styles.inputError,
										]}
									>
										<Lock
											color={fieldState.error ? '#FF3B3B' : '#808099'}
											size={RFValue(18)}
										/>
										<TextInput
											style={styles.input}
											value={value}
											onChangeText={onChange}
											onBlur={onBlur}
											placeholder="Digite sua senha"
											placeholderTextColor="#808099"
											secureTextEntry={securePassword}
											autoCapitalize="none"
											cursorColor="#38E67D"
										/>
										<TouchableOpacity
											onPress={() => setSecurePassword(!securePassword)}
											hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
										>
											{securePassword ? (
												<EyeOff color="#808099" size={RFValue(18)} />
											) : (
												<Eye color="#808099" size={RFValue(18)} />
											)}
										</TouchableOpacity>
									</View>
								)}
							/>
							{errors.password && (
								<Text style={styles.errorText}>{errors.password.message}</Text>
							)}
						</View>

						{/* Forgot password */}
						<TouchableOpacity style={styles.forgotButton} activeOpacity={0.7}>
							<Text style={styles.forgotText}>Esqueceu a senha?</Text>
						</TouchableOpacity>

						{/* Login button */}
						<TouchableOpacity
							style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
							onPress={handleLogin}
							disabled={isLoading}
							activeOpacity={0.8}
						>
							<LinearGradient
								colors={['#37E67D', '#1EB45A']}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 0 }}
								style={styles.loginGradient}
							>
								{isLoading ? (
									<ActivityIndicator color="#02003D" size={RFValue(20)} />
								) : (
									<Text style={styles.loginButtonText}>Entrar</Text>
								)}
							</LinearGradient>
						</TouchableOpacity>

						{/* Divider */}
						<View style={styles.dividerRow}>
							<View style={styles.dividerLine} />
							<Text style={styles.dividerText}>ou</Text>
							<View style={styles.dividerLine} />
						</View>

						{/* Guest button */}
						<TouchableOpacity
							style={styles.ghostButton}
							onPress={() => navigation.goBack()}
							activeOpacity={0.8}
						>
							<Text style={styles.ghostButtonText}>Continuar como convidado</Text>
						</TouchableOpacity>
					</View>

					{/* Register link */}
					<View style={styles.registerRow}>
						<Text style={styles.registerText}>Ainda não tem conta? </Text>
						<TouchableOpacity activeOpacity={0.7}>
							<Text style={styles.registerLink}>Cadastre-se</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#080B1A',
	},
	flex: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
		paddingHorizontal: RFValue(24),
		paddingBottom: RFValue(32),
	},
	backButton: {
		width: RFValue(40),
		height: RFValue(40),
		borderRadius: RFValue(10),
		backgroundColor: '#0F0C50',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: RFValue(12),
	},
	brandArea: {
		alignItems: 'center',
		marginTop: RFValue(32),
		marginBottom: RFValue(36),
	},
	logoGradient: {
		width: RFValue(64),
		height: RFValue(64),
		borderRadius: RFValue(16),
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: RFValue(16),
	},
	logoText: {
		fontSize: RFValue(24),
		fontFamily: 'Inter_700Bold',
		color: '#FFFFFF',
	},
	brandTitle: {
		fontSize: RFValue(26),
		fontFamily: 'Inter_700Bold',
		color: '#FFFFFF',
		marginBottom: RFValue(8),
	},
	brandSubtitle: {
		fontSize: RFValue(14),
		fontFamily: 'Inter_400Regular',
		color: '#A0A0B0',
	},
	formCard: {
		backgroundColor: '#0F0C50',
		borderRadius: RFValue(16),
		padding: RFValue(24),
		gap: RFValue(16),
	},
	fieldGroup: {
		gap: RFValue(6),
	},
	label: {
		fontSize: RFValue(13),
		fontFamily: 'Inter_600SemiBold',
		color: '#F0F0F0',
		marginLeft: RFValue(2),
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#01003A',
		borderRadius: RFValue(10),
		borderWidth: 1,
		borderColor: '#282564',
		paddingHorizontal: RFValue(14),
		height: RFValue(48),
		gap: RFValue(10),
	},
	inputFocused: {
		borderColor: '#37E67D',
		borderWidth: 2,
	},
	inputError: {
		borderColor: '#FF3B3B',
		borderWidth: 2,
	},
	input: {
		flex: 1,
		fontSize: RFValue(14),
		fontFamily: 'Inter_400Regular',
		color: '#FFFFFF',
		paddingVertical: 0,
	},
	errorText: {
		fontSize: RFValue(11),
		fontFamily: 'Inter_500Medium',
		color: '#FF3B3B',
		marginLeft: RFValue(2),
	},
	forgotButton: {
		alignSelf: 'flex-end',
	},
	forgotText: {
		fontSize: RFValue(13),
		fontFamily: 'Inter_500Medium',
		color: '#37E67D',
	},
	loginButton: {
		borderRadius: RFValue(10),
		overflow: 'hidden',
		marginTop: RFValue(4),
	},
	loginButtonDisabled: {
		opacity: 0.6,
	},
	loginGradient: {
		paddingVertical: RFValue(14),
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: RFValue(10),
	},
	loginButtonText: {
		fontSize: RFValue(14),
		fontFamily: 'Inter_700Bold',
		color: '#02003D',
	},
	dividerRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: RFValue(12),
	},
	dividerLine: {
		flex: 1,
		height: 1,
		backgroundColor: '#282564',
	},
	dividerText: {
		fontSize: RFValue(12),
		fontFamily: 'Inter_400Regular',
		color: '#808099',
	},
	ghostButton: {
		borderRadius: RFValue(10),
		borderWidth: 1.5,
		borderColor: '#38E67D',
		paddingVertical: RFValue(14),
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
	ghostButtonText: {
		fontSize: RFValue(14),
		fontFamily: 'Inter_600SemiBold',
		color: '#38E67D',
	},
	registerRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: RFValue(24),
	},
	registerText: {
		fontSize: RFValue(13),
		fontFamily: 'Inter_400Regular',
		color: '#A0A0B0',
	},
	registerLink: {
		fontSize: RFValue(13),
		fontFamily: 'Inter_700Bold',
		color: '#38E67D',
	},
});
