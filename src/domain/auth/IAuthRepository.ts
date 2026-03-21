import { loginReponse } from './AuthTypes';

export interface IAuthRepository {
	login({ login }: { login: string }): Promise<loginReponse>;
	logout(): Promise<void>;
}
