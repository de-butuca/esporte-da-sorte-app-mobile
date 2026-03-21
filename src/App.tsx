import { AppProviders } from './providers';
import { RootNavigator } from './navigation/RootNavigator';
import { VariantTestScreen } from './screens/teste';
import React, { useEffect } from 'react';
import MobileAds from 'react-native-google-mobile-ads';
import { AppInitializer } from './AppInitializer';

export default function App() {
	return (
		<AppProviders>
			{/* <VariantTestScreen /> */}
			<AppInitializer>
				<RootNavigator />
			</AppInitializer>
		</AppProviders>
	);
}
