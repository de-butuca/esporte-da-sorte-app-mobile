import { useCallback } from 'react';
import { useSessionStore } from '@/core/session/useSessionStore';
import { useAppNavigation } from '@/navigation/hooks';

type GameCategory = 'casino' | 'sports' | 'live';

const AUTH_REQUIRED_CATEGORIES: GameCategory[] = ['casino', 'live'];

/**
 * Middleware de autenticação para fluxo convidado.
 *
 * Retorna uma função `guardNavigation` que verifica se o usuário
 * está autenticado antes de executar a ação. Caso não esteja e a
 * categoria exija login (ex: casino, live), redireciona para a
 * tela de Login.
 *
 * Uso:
 * ```ts
 * const { guardNavigation } = useRequireAuth();
 *
 * // Ao clicar em um jogo de cassino:
 * guardNavigation('casino', () => {
 *   navigation.navigate('GameHome', { gameId: '123' });
 * });
 * ```
 */
export function useRequireAuth() {
	const isAuthenticated = useSessionStore((s) => s.isAuthenticated);
	const navigation = useAppNavigation();

	const guardNavigation = useCallback(
		(category: GameCategory, onAuthorized: () => void) => {
			if (isAuthenticated || !AUTH_REQUIRED_CATEGORIES.includes(category)) {
				onAuthorized();
				return;
			}

			navigation.navigate('Login');
		},
		[isAuthenticated, navigation],
	);

	const requireAuth = useCallback(
		(onAuthorized: () => void) => {
			if (isAuthenticated) {
				onAuthorized();
				return;
			}

			navigation.navigate('Login');
		},
		[isAuthenticated, navigation],
	);

	return {
		isAuthenticated,
		guardNavigation,
		requireAuth,
	};
}
