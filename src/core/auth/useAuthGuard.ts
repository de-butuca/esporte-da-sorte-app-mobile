import { useCallback } from 'react';
import { useSessionStore } from '@/core/session/useSessionStore';
import { useAppNavigation } from '@/navigation/hooks';
import type { LoginVariant } from '@/stampd.config';
import { useAuthThemeStore } from './useAuthThemeStore';

/**
 * Auth guard for guest flow.
 * Returns a wrapper function that checks authentication before executing an action.
 * If not authenticated, sets the auth theme variant and redirects to Login screen.
 */
export function useAuthGuard(defaultVariant: LoginVariant = 'esportes') {
	const isAuthenticated = useSessionStore((s) => s.isAuthenticated);
	const { navigate } = useAppNavigation();
	const setVariant = useAuthThemeStore((s) => s.setVariant);

	const requireAuth = useCallback(
		(action: () => void, variant?: LoginVariant) => {
			if (isAuthenticated) {
				action();
			} else {
				setVariant(variant ?? defaultVariant);
				navigate('Login');
			}
		},
		[isAuthenticated, navigate, defaultVariant, setVariant],
	);

	return { isAuthenticated, requireAuth };
}
