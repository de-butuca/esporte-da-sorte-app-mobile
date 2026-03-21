import { useApiRepository } from '@/contexts/ApiRepositoryContext';
import { useSessionStore } from '@/core/session/useSessionStore';

interface LoginUseCaseParams {
	login: string;
}

export function useLoginUseCase() {
	const { AuthRepository } = useApiRepository();
	const { signIn } = useSessionStore();

	return async function execute(params: LoginUseCaseParams) {
		const response = await AuthRepository.login({
			login: params.login,
		});

		if (!response.sucesso) throw new Error(response.mensagem);

		await signIn({
			user: response.data.user,
			token: response.data.token,
		});

		return true;
	};
}
