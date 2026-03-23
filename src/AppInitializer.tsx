import {
	useFonts,
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
} from '@expo-google-fonts/inter';
import { useEffect, useState } from 'react';
import { useSessionStore } from './core/session/useSessionStore';
import * as SplashScreen from 'expo-splash-screen';

interface IAppInitializerProps {
	children: React.ReactNode;
}

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
	duration: 400,
	fade: true,
});

export function AppInitializer({ children }: IAppInitializerProps) {
	const [isReady, setIsReady] = useState(false);

	const { loadSession } = useSessionStore();

	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold,
	});

	useEffect(() => {
		async function init() {
			try {
				await loadSession();
			} catch (e) {
				console.warn(e);
			} finally {
				setIsReady(true);
			}
		}

		init();
	}, []);

	useEffect(() => {
		if (isReady && fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [isReady, fontsLoaded]);

	// trava render até tudo estar pronto
	if (!isReady || !fontsLoaded) {
		return null;
	}

	return children;
}
