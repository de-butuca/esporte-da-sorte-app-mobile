import { useFonts, Orbitron_400Regular, Orbitron_500Medium, Orbitron_700Bold } from '@expo-google-fonts/orbitron';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import MobileAds from 'react-native-google-mobile-ads';
import { useSessionStore } from './core/session/useSessionStore';

interface IAppInitializerProps {
	children: React.ReactNode;
}

export function AppInitializer({ children }: IAppInitializerProps) {
	const { loadSession } = useSessionStore();
	const [fontsLoaded] = useFonts({
		Orbitron_400Regular,
		Orbitron_500Medium,
		Orbitron_700Bold,
	});

	function ConfigureAD() {
		MobileAds()
			.initialize()
			.then((status) => {
				console.log('MobileAds inicializado:', status);
			});
	}

	useEffect(() => {
		loadSession();
		ConfigureAD();
	}, []);

	if (!fontsLoaded)
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>carregando app</Text>
			</View>
		);

	return children;
}
