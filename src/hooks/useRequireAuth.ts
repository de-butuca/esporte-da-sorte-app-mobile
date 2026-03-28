import { useCallback } from 'react';
import { useSessionStore } from '@/core/session/useSessionStore';
import { useAppNavigation } from '@/navigation/hooks';

type GameCategory = 'casino' | 'sports' | 'live';

const AUTH_REQUIRED_CATEGORIES: GameCategory[] = ['casino', 'live'];

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
