import * as SecureStore from 'expo-secure-store';
import { SessionUser } from './session.types';

export const USER_KEY = 'session_user';
export const TOKEN_KEY = 'session_token';

export async function loadSessionStore() {
	const [user, token] = await Promise.all([SecureStore.getItemAsync(USER_KEY), SecureStore.getItemAsync(TOKEN_KEY)]);

	if (!user || !token) return null;

	return {
		user: JSON.parse(user) as SessionUser,
		token,
	};
}

export async function getSessionToken() {
	return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function saveSessionStore(user: SessionUser, token: string) {
	await Promise.all([
		SecureStore.setItemAsync(USER_KEY, JSON.stringify(user)),
		SecureStore.setItemAsync(TOKEN_KEY, token),
	]);
}

export async function clearSessionStore() {
	await Promise.all([SecureStore.deleteItemAsync(USER_KEY), SecureStore.deleteItemAsync(TOKEN_KEY)]);
}
