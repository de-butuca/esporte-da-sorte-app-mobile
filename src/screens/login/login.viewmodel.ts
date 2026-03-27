import { useSessionStore } from '@/core/session/useSessionStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './login.schema';
import { LoginFormData, LoginMethod } from './login.types';
import { useState } from 'react';
import { useToast } from '@/contexts/Toast/useToast';
import { useAppNavigation } from '@/navigation/hooks';

export function useLoginViewModel() {
	const signIn = useSessionStore((s) => s.signIn);
	const toastfy = useToast();
	const { goBack, canGoBack } = useAppNavigation();

	const [loginMethod, setLoginMethod] = useState<LoginMethod>('usuario');
	const [isLoading, setIsLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			identifier: '',
			password: '',
			keepSession: false,
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			setIsLoading(true);

			// Fake login - sera substituido por API real
			const result = await fakeLogin(data.identifier, data.password);

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

	const getPlaceholder = () => {
		switch (loginMethod) {
			case 'usuario':
				return 'Usuario';
			case 'email':
				return 'E-mail';
			case 'cpf':
				return 'CPF';
		}
	};

	const getKeyboardType = () => {
		switch (loginMethod) {
			case 'email':
				return 'email-address' as const;
			case 'cpf':
				return 'numeric' as const;
			default:
				return 'default' as const;
		}
	};

	return {
		control,
		errors,
		isLoading,
		loginMethod,
		setLoginMethod,
		getPlaceholder,
		getKeyboardType,
		handleLogin: handleSubmit(onSubmit),
	};
}

async function fakeLogin(identifier: string, password: string) {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return {
		token: 'fake-jwt-token',
		user: {
			id: '1',
			name: identifier,
		},
	};
}
