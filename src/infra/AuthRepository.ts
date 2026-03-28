import { loginReponse } from '@/domain/auth/AuthTypes';
import { IAuthRepository } from '@/domain/auth/IAuthRepository';

export class AuthRepository implements IAuthRepository {
	async login({ login }: { login: string }): Promise<loginReponse> {
		return new Promise((resolve) => {
			setTimeout(() => {
				return resolve({
					sucesso: true,
					data: { token: 'fake-token', user: { id: '1', name: 'Yuri Bueno' } },
					mensagem: 'Login realizado com sucesso!',
					status: 200,
				} as loginReponse);
			}, 1000);
		});
	}
	async logout(): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log(`Usuário deslogado com sucesso!`);
				resolve();
			}, 1000);
		});
	}
}
