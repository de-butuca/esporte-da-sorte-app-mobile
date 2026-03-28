import { useCallback } from 'react';
import { useSessionStore } from '@/core/session/useSessionStore';
import { useAppNavigation } from '@/navigation/hooks';

export function useAuthGuard() {
	const isAuthenticated = useSessionStore((s) => s.isAuthenticated);
	const { navigate } = useAppNavigation();

	const requireAuth = useCallback(
		(action: () => void) => {
			if (isAuthenticated) {
				action();
			} else {
				navigate('Login');
			}
		},
		[isAuthenticated, navigate],
	);

	return { isAuthenticated, requireAuth };
}
