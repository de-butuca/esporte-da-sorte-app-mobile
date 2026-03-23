import { AppProviders } from './providers';
import { RootNavigator } from './navigation/RootNavigator';
import { VariantTestScreen } from './screens/teste';
import React from 'react';
import { View } from 'react-native';
import { AppInitializer } from './AppInitializer';

export default function App() {
	return (
		<View style={{ flex: 1, backgroundColor: '#023697' }}>
			<AppInitializer>
				<AppProviders>
					{/* <VariantTestScreen /> */}
					<RootNavigator />
				</AppProviders>
			</AppInitializer>
		</View>
	);
}
