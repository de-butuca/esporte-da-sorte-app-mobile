import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from './register.schema';
import { RegisterFormData, PasswordStrength } from './register.types';
import { useState } from 'react';
import { useToast } from '@/contexts/Toast/useToast';
import { useAppNavigation } from '@/navigation/hooks';

function formatCpf(value: string): string {
	const digits = value.replace(/\D/g, '').slice(0, 11);
	if (digits.length <= 3) return digits;
	if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
	if (digits.length <= 9)
		return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
	return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function formatPhone(value: string): string {
	const digits = value.replace(/\D/g, '').slice(0, 11);
	if (digits.length <= 2) return digits.length > 0 ? `(${digits}` : '';
	if (digits.length <= 7)
		return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
	return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function getPasswordStrength(password: string): PasswordStrength | null {
	if (password.length === 0) return null;
	if (password.length < 6) return 'weak';

	let score = 0;
	if (/[a-z]/.test(password)) score++;
	if (/[A-Z]/.test(password)) score++;
	if (/\d/.test(password)) score++;
	if (/[^a-zA-Z0-9]/.test(password)) score++;
	if (password.length >= 10) score++;

	if (score <= 2) return 'weak';
	if (score <= 3) return 'medium';
	return 'strong';
}

const STRENGTH_LABELS: Record<PasswordStrength, string> = {
	weak: 'Fraca',
	medium: 'Média',
	strong: 'Forte',
};

export function useRegisterViewModel() {
	const toastfy = useToast();
	const { goBack, canGoBack, navigate } = useAppNavigation();

	const [isLoading, setIsLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		watch,
		setValue,
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
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

	const passwordValue = watch('password');
	const passwordStrength = getPasswordStrength(passwordValue);
	const passwordStrengthLabel = passwordStrength
		? STRENGTH_LABELS[passwordStrength]
		: null;

	const hasFormErrors = Object.keys(errors).length > 0;

	const onSubmit = async (data: RegisterFormData) => {
		try {
			setIsLoading(true);

			// Fake register - sera substituido por API real
			await new Promise((resolve) => setTimeout(resolve, 1500));

			toastfy.success('Conta criada com sucesso!');

			navigate('FaceVerification');
		} catch (e: any) {
			toastfy.error(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCpfChange = (text: string, onChange: (value: string) => void) => {
		onChange(formatCpf(text));
	};

	const handlePhoneChange = (
		text: string,
		onChange: (value: string) => void,
	) => {
		onChange(formatPhone(text));
	};

	const navigateToLogin = () => {
		if (canGoBack()) {
			goBack();
		} else {
			navigate('Login');
		}
	};

	return {
		control,
		errors,
		isLoading,
		isValid,
		hasFormErrors,
		passwordStrength,
		passwordStrengthLabel,
		handleRegister: handleSubmit(onSubmit),
		handleCpfChange,
		handlePhoneChange,
		navigateToLogin,
	};
}
