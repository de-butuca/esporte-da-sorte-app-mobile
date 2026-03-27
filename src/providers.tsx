import React from 'react';

import { StampdUIProvider, ThemeMode, useStampdUI } from 'stampd/context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from './contexts/Toast/ToastProvider';
import { fontFamily } from './theme/design-tokens';
import { ApiRepositoryProvider } from './contexts/ApiRepositoryContext';
import { config } from './stampd.config';

const queryClient = new QueryClient();

interface IAppProvidersProps {
	children: React.ReactNode;
}

export function AppProviders({ children }: IAppProvidersProps) {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaProvider>
				<QueryClientProvider client={queryClient}>
					<StampdUIProvider config={config}>
						<NavigationContainer>
							<ApiRepositoryProvider>
								<ToastProvider>
									<AppContent>{children}</AppContent>
								</ToastProvider>
							</ApiRepositoryProvider>
						</NavigationContainer>
					</StampdUIProvider>
				</QueryClientProvider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
}

function AppContent({ children }: IAppProvidersProps) {
	const { theme, themeMode } = useStampdUI();
	return (
		<>
			<StatusBar style={themeMode == ThemeMode.LIGHT ? 'light' : 'light'} animated />
			{children}
		</>
	);
}
