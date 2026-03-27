import React from 'react';
import { StyleSheet, View } from 'react-native';

import { StampdUIProvider, ThemeMode, useStampdUI } from 'stampd/context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from './contexts/Toast/ToastProvider';
import { ApiRepositoryProvider } from './contexts/ApiRepositoryContext';
import { SidebarProvider } from './contexts/Sidebar/SidebarProvider';
import { config } from './stampd.config';

const queryClient = new QueryClient();

interface IAppProvidersProps {
	children: React.ReactNode;
}

export function AppProviders({ children }: IAppProvidersProps) {
	return (
		<GestureHandlerRootView style={styles.fill}>
			<SafeAreaProvider>
				<QueryClientProvider client={queryClient}>
					<StampdUIProvider config={config}>
						<NavigationContainer>
							<ApiRepositoryProvider>
								<ToastProvider>
									<SidebarProvider>
									<AppContent>{children}</AppContent>
								</SidebarProvider>
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
	const { themeMode } = useStampdUI();
	return (
		<View style={styles.fill}>
			<StatusBar style={themeMode == ThemeMode.LIGHT ? 'light' : 'light'} animated />
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	fill: { flex: 1 },
});
