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
import AnimatedSplash from './components/AnimatedSplash';
import {
	requestNotificationPermissions,
	setupAppLifecycleNotifications,
	cleanupNotifications,
} from './core/services/notifications';

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
				await requestNotificationPermissions();
				setupAppLifecycleNotifications();
			} catch (e) {
				console.warn(e);
			} finally {
				setIsReady(true);
			}
		}

		init();

		return () => {
			cleanupNotifications();
		};
	}, []);

	if (!splashDone && !splashError) {
		return (
			<AnimatedSplash
				onFinish={() => setSplashDone(true)}
			/>
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
