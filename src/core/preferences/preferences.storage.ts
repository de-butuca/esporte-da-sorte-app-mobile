import * as SecureStore from 'expo-secure-store';

const PREFS_KEY = 'app_preferences';

export interface AppPreferences {
	themeMode: string;
	highContrast: boolean;
	oddDisplayTypeCode?: string;
	notificationPreferences?: Record<string, boolean>;
}

export async function loadPreferences(): Promise<AppPreferences | null> {
	try {
		const raw = await SecureStore.getItemAsync(PREFS_KEY);
		if (!raw) return null;
		return JSON.parse(raw) as AppPreferences;
	} catch {
		return null;
	}
}

export async function savePreferences(prefs: Partial<AppPreferences>): Promise<void> {
	const current = await loadPreferences();
	const nextPreferences: AppPreferences = {
		themeMode: prefs.themeMode ?? current?.themeMode ?? 'light',
		highContrast: prefs.highContrast ?? current?.highContrast ?? false,
		oddDisplayTypeCode: prefs.oddDisplayTypeCode ?? current?.oddDisplayTypeCode,
		notificationPreferences: {
			...(current?.notificationPreferences ?? {}),
			...(prefs.notificationPreferences ?? {}),
		},
	};

	await SecureStore.setItemAsync(PREFS_KEY, JSON.stringify(nextPreferences));
}
