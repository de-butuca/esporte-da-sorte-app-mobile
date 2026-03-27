import { AppProviders } from './providers';
import { RootNavigator } from './navigation/RootNavigator';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppInitializer } from './AppInitializer';
import { lightColors } from './stampd.config';

export default function App() {
	return (
		<View style={styles.root}>
			<AppInitializer>
				<AppProviders>
					<RootNavigator />
				</AppProviders>
			</AppInitializer>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: lightColors.primary,
	},
});
