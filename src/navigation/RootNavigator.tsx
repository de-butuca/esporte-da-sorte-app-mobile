import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';

import { ActivityIndicator, View } from 'react-native';
import { useSessionStore } from '../core/session/useSessionStore';
import { AppStack } from './AppRoutes';

export function RootNavigator() {
	const { isLoading, isAuthenticated } = useSessionStore();

	return <AppStack />;
}
