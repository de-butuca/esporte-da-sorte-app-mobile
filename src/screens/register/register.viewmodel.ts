import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import {
	IConfigService,
	MockConfigService,
} from '../../../backend/services/config.service';
import { CustomerResponse, TraderPasswordValidation, TraderRegisterField } from '../../../backend/models/config.models';
import { createRegisterSchema, extractDigits, getPasswordRequirementsLabel } from './register.schema';
import {
	RegisterContractConfig,
	RegisterCustomerLookupViewModel,
	RegisterFormData,
	PasswordStrength,
} from './register.types';
import { useToast } from '@/contexts/Toast/useToast';
import { useAppNavigation } from '@/navigation/hooks';

const configService: IConfigService = new MockConfigService();

const REGISTER_CONTEXT = {
	domain: 'esportes-da-sorte',
	channel: 'm',
} as const;

const PASSWORD_STRENGTH_LABELS: Record<PasswordStrength, string> = {
	weak: 'Fraca',
	medium: 'Media',
	strong: 'Forte',
};

async function getRegisterContractData() {
	const [registerFieldsResponse, passwordValidationResponse] = await Promise.all([
		configService.getTraderRegisterFields(REGISTER_CONTEXT.domain, REGISTER_CONTEXT.channel),
		configService.getTraderPasswordValidation(REGISTER_CONTEXT.domain),
	]);

	return {
		registerFields: registerFieldsResponse.data ?? [],
		passwordValidation: passwordValidationResponse.data,
	};
}

function formatCpf(value: string): string {
	const digits = extractDigits(value).slice(0, 11);
	if (digits.length <= 3) return digits;
	if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
	if (digits.length <= 9) {
		return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
	}

	return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function formatPhone(value: string): string {
	const digits = extractDigits(value).slice(0, 11);
	if (digits.length <= 2) return digits.length > 0 ? `(${digits}` : '';
	if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
	return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function getPasswordStrength(password: string, contract: RegisterContractConfig): PasswordStrength | null {
	if (password.length === 0) return null;
	if (password.length < contract.passwordLength) return 'weak';

	let score = 0;
	if (/[a-z]/.test(password)) score += 1;
	if (/[A-Z]/.test(password)) score += 1;
	if (/\d/.test(password)) score += 1;
	if (/[^a-zA-Z0-9]/.test(password)) score += 1;
	if (password.length >= contract.passwordLength + 2) score += 1;

	if (score <= 2) return 'weak';
	if (score <= 3) return 'medium';
	return 'strong';
}

function mapRegisterContract(
	registerFields: TraderRegisterField[],
	passwordValidation?: TraderPasswordValidation,
): RegisterContractConfig {
	const activeFields = registerFields
		.filter((field) => field.isActive === 1)
		.map((field) => field.fieldName)
		.filter((fieldName): fieldName is string => Boolean(fieldName));

	return {
		passwordLength: passwordValidation?.passwordLength ?? 6,
		requireLowerCase: Boolean(passwordValidation?.isLowerCase),
		requireUpperCase: Boolean(passwordValidation?.isUpperCase),
		requireDigit: Boolean(passwordValidation?.isDigit),
		disallowOnlyDigit: Boolean(passwordValidation?.isOnlyDigit),
		activeVisualFields: {
			cpf: activeFields.includes('cpfNumber'),
			email: activeFields.includes('email'),
			phone: activeFields.includes('phone'),
			password: activeFields.includes('password'),
		},
		requiresUsername: activeFields.includes('username'),
		requiresLookupProfile:
			activeFields.includes('firstName') || activeFields.includes('surname') || activeFields.includes('birthdate'),
		unsupportedActiveFields: activeFields.filter(
			(fieldName) => !['cpfNumber', 'email', 'phone', 'password', 'firstName', 'surname', 'birthdate'].includes(fieldName),
		),
	};
}

function buildCpfLookup(customer?: CustomerResponse): RegisterCustomerLookupViewModel | null {
	if (!customer?.firstName && !customer?.surname) return null;

	return {
		fullName: [customer.firstName, customer.secondName, customer.surname].filter(Boolean).join(' '),
		birthdate: customer.birthdate,
	};
}

function buildDerivedUsername(email: string) {
	const [localPart = 'usuario'] = email.trim().toLowerCase().split('@');
	const normalized = localPart.replace(/[^a-z0-9._-]/g, '').slice(0, 20);
	return normalized || 'usuario';
}

export function useRegisterViewModel() {
	const toastfy = useToast();
	const { goBack, canGoBack, navigate } = useAppNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const [isCheckingCpf, setIsCheckingCpf] = useState(false);
	const [isCheckingEmail, setIsCheckingEmail] = useState(false);
	const [cpfLookup, setCpfLookup] = useState<RegisterCustomerLookupViewModel | null>(null);

	const contractQuery = useQuery({
		queryKey: ['register-contract', REGISTER_CONTEXT.domain, REGISTER_CONTEXT.channel],
		queryFn: getRegisterContractData,
	});

	const contractConfig = useMemo(
		() => mapRegisterContract(contractQuery.data?.registerFields ?? [], contractQuery.data?.passwordValidation),
		[contractQuery.data?.passwordValidation, contractQuery.data?.registerFields],
	);

	const schema = useMemo(() => createRegisterSchema(contractConfig), [contractConfig]);

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		watch,
		setError,
		clearErrors,
		getValues,
		trigger,
	} = useForm<RegisterFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			cpf: '',
			email: '',
			phone: '',
			password: '',
			confirmPassword: '',
			acceptTerms: false,
		},
		mode: 'onChange',
	});

	useEffect(() => {
		void trigger();
	}, [schema, trigger]);

	const passwordValue = watch('password');
	const passwordStrength = getPasswordStrength(passwordValue, contractConfig);
	const passwordStrengthLabel = passwordStrength ? PASSWORD_STRENGTH_LABELS[passwordStrength] : null;
	const hasFormErrors = Object.keys(errors).length > 0;
	const canSubmit = isValid && !contractQuery.isLoading && !isCheckingCpf && !isCheckingEmail;

	const validateCpfWithMock = useCallback(
		async (rawCpf: string, shouldLookupProfile = true) => {
			const cpfDigits = extractDigits(rawCpf);
			if (!cpfDigits || cpfDigits.length < 11) return false;

			setIsCheckingCpf(true);

			try {
				const validationResponse = await configService.isValidCpf(cpfDigits);
				if (!validationResponse.success) {
					setCpfLookup(null);
					setError('cpf', { type: 'manual', message: 'Nao foi possivel validar o CPF informado' });
					return false;
				}

				clearErrors('cpf');

				if (shouldLookupProfile || contractConfig.requiresLookupProfile) {
					const customerResponse = await configService.getCustomerByCpfNumber(cpfDigits);
					const customerLookup = buildCpfLookup(customerResponse.data);
					setCpfLookup(customerLookup);

					if (contractConfig.requiresLookupProfile && !customerLookup) {
						setError('cpf', {
							type: 'manual',
							message: 'O contrato atual exige dados de perfil que nao vieram do lookup de CPF',
						});
						return false;
					}
				}

				return true;
			} catch {
				setCpfLookup(null);
				setError('cpf', { type: 'manual', message: 'Erro ao validar o CPF com o mock' });
				return false;
			} finally {
				setIsCheckingCpf(false);
			}
		},
		[clearErrors, contractConfig.requiresLookupProfile, setError],
	);

	const validateEmailWithMock = useCallback(
		async (email: string) => {
			if (!email.trim()) return false;

			setIsCheckingEmail(true);

			try {
				const validationResponse = await configService.isValidUserEmail(email.trim().toLowerCase());
				if (!validationResponse.success) {
					setError('email', { type: 'manual', message: 'Este e-mail nao passou na validacao do mock' });
					return false;
				}

				clearErrors('email');
				return true;
			} catch {
				setError('email', { type: 'manual', message: 'Erro ao validar o e-mail com o mock' });
				return false;
			} finally {
				setIsCheckingEmail(false);
			}
		},
		[clearErrors, setError],
	);

	const validateDerivedUsername = useCallback(
		async (email: string) => {
			if (!contractConfig.requiresUsername) return true;

			try {
				const usernameResponse = await configService.isValidUsername(buildDerivedUsername(email));
				if (!usernameResponse.success) {
					setError('email', {
						type: 'manual',
						message: 'Nao foi possivel validar o username derivado do e-mail',
					});
					return false;
				}

				return true;
			} catch {
				setError('email', {
					type: 'manual',
					message: 'Erro ao validar o username derivado do e-mail',
				});
				return false;
			}
		},
		[contractConfig.requiresUsername, setError],
	);

	const onSubmit = async (data: RegisterFormData) => {
		try {
			setIsLoading(true);

			const [cpfIsValid, emailIsValid, usernameIsValid] = await Promise.all([
				validateCpfWithMock(data.cpf),
				validateEmailWithMock(data.email),
				validateDerivedUsername(data.email),
			]);

			if (!cpfIsValid || !emailIsValid || !usernameIsValid) return;

			const preparedRegisterPayload = {
				cpfNumber: extractDigits(data.cpf),
				email: data.email.trim().toLowerCase(),
				phone: extractDigits(data.phone),
				password: data.password,
				username: contractConfig.requiresUsername ? buildDerivedUsername(data.email) : undefined,
				firstName: cpfLookup?.fullName.split(' ')[0],
				surname: cpfLookup?.fullName.split(' ').slice(1).join(' ') || undefined,
				birthdate: cpfLookup?.birthdate,
				acceptedTerms: data.acceptTerms,
			};

			await new Promise((resolve) => setTimeout(resolve, 1200));

			if (__DEV__) {
				console.log('register-payload-ready', preparedRegisterPayload);
			}

			toastfy.success('Cadastro validado com sucesso!');

			if (canGoBack()) {
				goBack();
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Nao foi possivel concluir o cadastro';
			toastfy.error(message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCpfChange = (text: string, onChange: (value: string) => void) => {
		onChange(formatCpf(text));
	};

	const handlePhoneChange = (text: string, onChange: (value: string) => void) => {
		onChange(formatPhone(text));
	};

	const navigateToLogin = () => {
		if (canGoBack()) {
			goBack();
			return;
		}

		navigate('Login');
	};

	return {
		control,
		errors,
		isLoading,
		isConfigLoading: contractQuery.isLoading,
		isValid,
		canSubmit,
		hasFormErrors,
		passwordStrength,
		passwordStrengthLabel,
		passwordHint: getPasswordRequirementsLabel(contractConfig),
		passwordPlaceholder: `Minimo ${contractConfig.passwordLength} caracteres`,
		configWarning: contractQuery.isError
			? 'Nao foi possivel carregar todas as regras do contrato. O formulario segue com fallback local.'
			: null,
		cpfLookupLabel: cpfLookup
			? `${cpfLookup.fullName}${cpfLookup.birthdate ? ` • nascimento ${cpfLookup.birthdate}` : ''}`
			: null,
		isCheckingCpf,
		isCheckingEmail,
		unsupportedContractFields: contractConfig.unsupportedActiveFields,
		handleRegister: handleSubmit(onSubmit),
		handleCpfChange,
		handlePhoneChange,
		handleCpfBlur: async (value: string) => {
			await validateCpfWithMock(value);
		},
		handleEmailBlur: async (value: string) => {
			await validateEmailWithMock(value);
		},
		navigateToLogin,
	};
}
