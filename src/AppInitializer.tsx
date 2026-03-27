import {
	useFonts,
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
} from '@expo-google-fonts/inter';
import React, { useEffect, useState } from 'react';
import { InteractionManager, Platform, StyleSheet, View } from 'react-native';
import { useSessionStore } from './core/session/useSessionStore';
import { lightColors } from './theme/design-tokens';
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
	const loadSession = useSessionStore((s) => s.loadSession);

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
				if (__DEV__) console.warn(e);
			} finally {
				setIsReady(true);
			}

			InteractionManager.runAfterInteractions(async () => {
				if (Platform.OS === 'android') {
					await requestNotificationPermissions();
					setupAppLifecycleNotifications();
				}
			});
		}

		init();

		return () => {
			if (Platform.OS === 'android') {
				cleanupNotifications();
			}
		};
	}, [loadSession]);

	if (!splashDone && !splashError) {
		return (
			<AnimatedSplash
				onFinish={() => setSplashDone(true)}
			/>
		);
	}

	if (!isReady || !fontsLoaded) {
		return <View style={styles.loading} />;
	}

	return <>{children}</>;
}

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		backgroundColor: lightColors.background,
	},
});

// Simple error boundary
class ErrorBoundary extends React.Component<{ children: React.ReactNode; onError: () => void }> {
	componentDidCatch() {
		this.props.onError();
	}
	render() {
		return this.props.children;
	}
}
