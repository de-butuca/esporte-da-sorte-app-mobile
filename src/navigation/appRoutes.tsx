import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import React from 'react';
// import { MainTabs } from './TabRoutes';
import { ButtonBase } from '@/components/Button';
import { useAppNavigation } from './hooks';
import { HeaderRouter } from '@/components/navigation/header/header';
import HomeScreen from '@/screens/home/view';

const Stack = createNativeStackNavigator();

export function AppStack() {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: true,
				animation: 'slide_from_right',
				header: ({ options, back, route }) => {
					return <HeaderRouter title={options.title} back={back} />;
				},
			}}
		>
			<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
}
export function createTestScreen(number: number) {
	return function TestScreen() {
		const { navigate } = useAppNavigation();
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#101010',
				}}
			>
				<ButtonBase
					text="sada"
					onPress={() => {
						navigate('flapGame');
					}}
				/>
				<Text style={{ fontSize: 24, color: '#fff' }}>ESTA É UMA TELA DE {number} 🚀</Text>

				<Text style={{ fontSize: 16, color: '#aaa', marginTop: 10 }}>Componente criado dinamicamente</Text>
			</View>
		);
	};
}
