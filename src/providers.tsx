import React from 'react';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from './contexts/Toast/ToastProvider';
import { fontFamily } from './theme/design-tokens';
import { ApiRepositoryProvider } from './contexts/ApiRepositoryContext';

const queryClient = new QueryClient();

interface IAppProvidersProps {
	children: React.ReactNode;
}

export function AppProviders({ children }: IAppProvidersProps) {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaProvider>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider fontDefault={fontFamily.medium}>
						<NavigationContainer>
							<ApiRepositoryProvider>
								<ToastProvider>
									<AppContent>{children}</AppContent>
								</ToastProvider>
							</ApiRepositoryProvider>
						</NavigationContainer>
					</ThemeProvider>
				</QueryClientProvider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
}

function AppContent({ children }: IAppProvidersProps) {
	const { isDark, theme } = useTheme();

	return (
		<View style={{ flex: 1 }}>
			<StatusBar style={isDark ? 'light' : 'dark'} translucent />
			{children}
		</View>
	);
}
