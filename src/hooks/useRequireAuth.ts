import { useCallback } from 'react';
import { useSessionStore } from '@/core/session/useSessionStore';
import { useAppNavigation } from '@/navigation/hooks';
import type { LoginVariant } from '@/stampd.config';
import { useAuthThemeStore } from '@/core/auth/useAuthThemeStore';

type GameCategory = 'casino' | 'sports' | 'live';

const AUTH_REQUIRED_CATEGORIES: GameCategory[] = ['casino', 'live'];

const CATEGORY_TO_VARIANT: Record<GameCategory, LoginVariant> = {
	casino: 'cassino',
	live: 'cassino',
	sports: 'esportes',
};

/**
 * Middleware de autenticação para fluxo convidado.
 *
 * Retorna uma função `guardNavigation` que verifica se o usuário
 * está autenticado antes de executar a ação. Caso não esteja e a
 * categoria exija login (ex: casino, live), redireciona para a
 * tela de Login com o tema correspondente.
 */
export function useRequireAuth() {
	const isAuthenticated = useSessionStore((s) => s.isAuthenticated);
	const navigation = useAppNavigation();
	const setVariant = useAuthThemeStore((s) => s.setVariant);

	const guardNavigation = useCallback(
		(category: GameCategory, onAuthorized: () => void) => {
			if (isAuthenticated || !AUTH_REQUIRED_CATEGORIES.includes(category)) {
				onAuthorized();
				return;
			}

			setVariant(CATEGORY_TO_VARIANT[category]);
			navigation.navigate('Login');
		},
		[isAuthenticated, navigation, setVariant],
	);

	const requireAuth = useCallback(
		(onAuthorized: () => void, variant: LoginVariant = 'esportes') => {
			if (isAuthenticated) {
				onAuthorized();
				return;
			}

			setVariant(variant);
			navigation.navigate('Login');
		},
		[isAuthenticated, navigation, setVariant],
	);

	return {
		isAuthenticated,
		guardNavigation,
		requireAuth,
	};
}
