import React from 'react';
import { StyleSheet, View } from 'react-native';

import { StampdUIProvider } from 'stampd/context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from './contexts/Toast/ToastProvider';
import { ApiRepositoryProvider } from './contexts/ApiRepositoryContext';
import { SidebarProvider } from './contexts/Sidebar/SidebarProvider';
import { SessionProvider } from './contexts/SessionContext';
import { config } from './stampd.config';
import { navigationRef } from './navigation/rootNavigation';

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
						<NavigationContainer ref={navigationRef}>
							<ApiRepositoryProvider>
								<ToastProvider>
									<SidebarProvider>
										<SessionProvider>
											<AppContent>{children}</AppContent>
										</SessionProvider>
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
	return (
		<View style={styles.fill}>
			<StatusBar style="light" animated />
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	fill: { flex: 1 },
});
