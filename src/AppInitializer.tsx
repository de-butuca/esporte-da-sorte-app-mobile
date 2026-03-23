import {
	useFonts,
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
} from '@expo-google-fonts/inter';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSessionStore } from './core/session/useSessionStore';
import * as SplashScreen from 'expo-splash-screen';
import AnimatedSplash from './components/AnimatedSplash';

interface IAppInitializerProps {
	children: React.ReactNode;
}

export function AppInitializer({ children }: IAppInitializerProps) {
	const [isReady, setIsReady] = useState(false);
	const [splashDone, setSplashDone] = useState(false);
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

	if (!splashDone) {
		return (
			<AnimatedSplash
				onFinish={() => setSplashDone(true)}
				onReady={() => SplashScreen.hideAsync()}
			/>
		);
	}

	if (!isReady || !fontsLoaded) {
		// Tela azul enquanto carrega (mesmo fundo da splash)
		return <View style={{ flex: 1, backgroundColor: '#023697' }} />;
	}

	return children;
}
