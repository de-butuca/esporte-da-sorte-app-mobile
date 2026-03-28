import * as SecureStore from 'expo-secure-store';

const PREFS_KEY = 'app_preferences';

export interface AppPreferences {
	themeMode: string;
	highContrast: boolean;
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

export async function savePreferences(prefs: AppPreferences): Promise<void> {
	await SecureStore.setItemAsync(PREFS_KEY, JSON.stringify(prefs));
}
