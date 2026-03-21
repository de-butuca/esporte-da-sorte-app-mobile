import { Alert } from 'react-native';
import { useSessionStore } from '@/core/session/useSessionStore';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './login.schema';
import { LoginFormData } from './login.types';
import { useState } from 'react';
import { useToast } from '@/contexts/Toast/useToast';
import { useLoginUseCase } from '@/useCases/Auth/LoginUseCase';

//
// 2️⃣ ViewModel
//
export function useLoginViewModel() {
	const signIn = useSessionStore((s) => s.signIn);
	const LoginUseCase = useLoginUseCase();

	const toastfy = useToast();
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			login: '',
		},
	});

	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (data: LoginFormData) => {
		try {
			setIsLoading(true);

			await LoginUseCase({
				login: data.login,
			});
		} catch (e: any) {
			toastfy.error(e.message);
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		control,
		errors,
		isSubmitting,
		handleLogin: handleSubmit(onSubmit),
		isLoading,
	};
}

//
// Fake API
//
async function fakeLogin(login: string) {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	if (login === 'drailer') {
		return {
			token: 'fake-jwt-token',
			user: {
				id: '1',
				name: 'Admin',
				email: login,
			},
		};
	}

	throw new Error('Invalid credentials');
}
