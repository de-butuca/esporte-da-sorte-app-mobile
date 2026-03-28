import { useSessionStore } from '@/core/session/useSessionStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './login.schema';
import { LoginFormData } from './login.types';
import { useState } from 'react';
import { useToast } from '@/contexts/Toast/useToast';
import { useAppNavigation } from '@/navigation/hooks';

export function useLoginViewModel() {
	const signIn = useSessionStore((s) => s.signIn);
	const toastfy = useToast();
	const { goBack, canGoBack, navigate } = useAppNavigation();

	const [isLoading, setIsLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		watch,
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	});

	const emailValue = watch('email');
	const passwordValue = watch('password');
	const canSubmit = emailValue.length > 0 && passwordValue.length > 0;

	const onSubmit = async (data: LoginFormData) => {
		try {
			setIsLoading(true);

			// Fake login - sera substituido por API real
			const result = await fakeLogin(data.email, data.password);

			await signIn({
				user: result.user,
				token: result.token,
			});

			if (canGoBack()) {
				goBack();
			}
		} catch (e: any) {
			toastfy.error(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	const navigateToRegister = () => {
		navigate('Register');
	};

	return {
		control,
		errors,
		isLoading,
		isValid,
		canSubmit,
		handleLogin: handleSubmit(onSubmit),
		navigateToRegister,
	};
}

async function fakeLogin(email: string, password: string) {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return {
		token: 'fake-jwt-token',
		user: {
			id: '1',
			name: email,
		},
	};
}
