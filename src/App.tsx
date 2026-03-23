import { AppProviders } from './providers';
import { RootNavigator } from './navigation/RootNavigator';
import { VariantTestScreen } from './screens/teste';
import React, { useEffect } from 'react';
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
