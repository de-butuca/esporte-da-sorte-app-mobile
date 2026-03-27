import { useSessionStore } from '../core/session/useSessionStore';
import { AppStack } from './appRoutes';

export function RootNavigator() {
	const isLoading = useSessionStore((s) => s.isLoading);
	const isAuthenticated = useSessionStore((s) => s.isAuthenticated);

	return <AppStack />;
}
