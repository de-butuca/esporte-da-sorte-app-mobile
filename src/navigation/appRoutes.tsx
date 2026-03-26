import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import React from 'react';
// import { MainTabs } from './TabRoutes';
import { ButtonBase } from '@/components/Button';
import { useAppNavigation } from './hooks';
import { HeaderRouter } from '@/components/navigation/header/header';
import HomeScreen from '@/screens/home/view';
import GameHomeScreen from '@/screens/game-home/view';

const Stack = createNativeStackNavigator();

export function AppStack() {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_right',
			}}
		>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerShown: true,
					header: ({ options, back }) => <HeaderRouter title={options.title} back={back} />,
				}}
			/>
			<Stack.Screen
				name="GameHome"
				component={GameHomeScreen}
				options={{
					contentStyle: { backgroundColor: '#f8f9fc' },
					gestureEnabled: false,
				}}
			/>
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
