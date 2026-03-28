import { AppProviders } from './providers';
import { RootNavigator } from './navigation/RootNavigator';
import React from 'react';
import { AppInitializer } from './AppInitializer';

export default function App() {
	return (
		<AppProviders>
			<AppInitializer>
				<RootNavigator />
			</AppInitializer>
		</AppProviders>
	);
}
