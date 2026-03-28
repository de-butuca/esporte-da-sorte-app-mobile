import { create } from 'zustand';
import { SessionUser } from './session.types';
import { clearSessionStore, loadSessionStore, saveSessionStore } from './session.storage';

interface SessionState {
	user: SessionUser | null;
	token: string | null;
	isLoading: boolean;

	isAuthenticated: boolean;

	loadSession: () => Promise<boolean>;
	signIn: (data: { user: SessionUser; token: string }) => Promise<void>;
	signOut: () => Promise<void>;
}

export const useSessionStore = create<SessionState>((set) => {
	const setSession = (user: SessionUser | null, token: string | null) => {
		set({
			user,
			token,
			isAuthenticated: !!user && !!token,
		});
	};

	return {
		user: null,
		token: null,
		isLoading: true,
		isAuthenticated: false,

		async loadSession() {
			try {
				const store = await loadSessionStore();

				const user = store?.user ?? null;
				const token = store?.token ?? null;

				setSession(user, token);

				return !!user && !!token;
			} catch {
				setSession(null, null);
				return false;
			} finally {
				set({ isLoading: false });
			}
		},

		async signIn({ user, token }) {
			set({ isLoading: true });

			await saveSessionStore(user, token);

			setSession(user, token);

			set({ isLoading: false });
		},

		async signOut() {
			set({ isLoading: true });

			await clearSessionStore();

			setSession(null, null);

			set({ isLoading: false });
		},
	};
});
