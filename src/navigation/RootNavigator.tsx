import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';

import { ActivityIndicator, View } from 'react-native';
import { useSessionStore } from '../core/session/useSessionStore';
import { AuthStack } from './AuthRoutes';
import { AppStack } from './AppRoutes';

export function RootNavigator() {
	const { isLoading, isAuthenticated } = useSessionStore();

	// if (isLoading) {
	// 	return (
	// 		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
	// 			<ActivityIndicator size="large" />
	// 		</View>
	// 	)
	// }

	// return <AppStack />

	return isAuthenticated ? <AppStack /> : <AuthStack />;
}
