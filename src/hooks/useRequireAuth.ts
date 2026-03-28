import { useCallback } from 'react';
import { useSessionStore } from '@/core/session/useSessionStore';
import { navigate } from '@/navigation/rootNavigation';
import type { LoginVariant } from '@/stampd.config';
import { useAuthThemeStore } from '@/core/auth/useAuthThemeStore';

type GameCategory = 'casino' | 'sports' | 'live';

const AUTH_REQUIRED_CATEGORIES: GameCategory[] = ['casino', 'live'];

const CATEGORY_TO_VARIANT: Record<GameCategory, LoginVariant> = {
	casino: 'cassino',
	live: 'cassino',
	sports: 'esportes',
};


export function useRequireAuth() {
	const isAuthenticated = useSessionStore((s) => s.isAuthenticated);
	const setVariant = useAuthThemeStore((s) => s.setVariant);

	const guardNavigation = useCallback(
		(category: GameCategory, onAuthorized: () => void) => {
			if (isAuthenticated || !AUTH_REQUIRED_CATEGORIES.includes(category)) {
				onAuthorized();
				return;
			}

			setVariant(CATEGORY_TO_VARIANT[category]);
			navigate('Login');
		},
		[isAuthenticated, setVariant],
	);

	const requireAuth = useCallback(
		(onAuthorized: () => void, variant: LoginVariant = 'esportes') => {
			if (isAuthenticated) {
				onAuthorized();
				return;
			}

			setVariant(variant);
			navigate('Login');
		},
		[isAuthenticated, setVariant],
	);

	return {
		isAuthenticated,
		guardNavigation,
		requireAuth,
	};
}
