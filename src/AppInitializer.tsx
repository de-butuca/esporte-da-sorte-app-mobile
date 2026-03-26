import {
	useFonts,
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
} from '@expo-google-fonts/inter';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSessionStore } from './core/session/useSessionStore';
import * as SplashScreen from 'expo-splash-screen';
import { hideNativeSplash } from './native/NativeSplash';

// Lazy import para evitar crash se Skia/Lottie não estiverem prontos
const AnimatedSplash = React.lazy(() => import('./components/AnimatedSplash'));

interface IAppInitializerProps {
	children: React.ReactNode;
}

export function AppInitializer({ children }: IAppInitializerProps) {
	const [isReady, setIsReady] = useState(false);
	const [splashDone, setSplashDone] = useState(false);
	const [splashError, setSplashError] = useState(false);
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

		// Safety: force skip splash after 6s if something fails
		const safety = setTimeout(() => {
			hideNativeSplash();
			SplashScreen.hideAsync().catch(() => {});
			setSplashDone(true);
		}, 6000);

		return () => clearTimeout(safety);
	}, []);

	if (!splashDone && !splashError) {
		return (
			<React.Suspense fallback={<View style={{ flex: 1, backgroundColor: '#023697' }} />}>
				<ErrorBoundary onError={() => { setSplashError(true); setSplashDone(true); hideNativeSplash(); }}>
					<AnimatedSplash
						onFinish={() => setSplashDone(true)}
						onReady={() => SplashScreen.hideAsync()}
					/>
				</ErrorBoundary>
			</React.Suspense>
		);
	}

	if (!isReady || !fontsLoaded) {
		return <View style={{ flex: 1, backgroundColor: '#023697' }} />;
	}

	return <>{children}</>;
}

// Simple error boundary
class ErrorBoundary extends React.Component<{ children: React.ReactNode; onError: () => void }> {
	componentDidCatch() {
		this.props.onError();
	}
	render() {
		return this.props.children;
	}
}
