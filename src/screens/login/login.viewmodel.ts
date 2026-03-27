import { useSessionStore } from '@/core/session/useSessionStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './login.schema';
import { LoginFormData } from './login.types';
import { useState } from 'react';
import { useToast } from '@/contexts/Toast/useToast';
import { useLoginUseCase } from '@/useCases/Auth/LoginUseCase';

export function useLoginViewModel() {
	const LoginUseCase = useLoginUseCase();
	const toastfy = useToast();

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (data: LoginFormData) => {
		try {
			setIsLoading(true);

			await LoginUseCase({
				login: data.email,
			});
		} catch (e: any) {
			toastfy.error(e.message);
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
