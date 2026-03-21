import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/View';
import { Text, View } from 'react-native';
import React from 'react';
import { MainTabs } from './TabRoutes';
import { ButtonBase } from '@/components/Button';
import { useAppNavigation } from './hooks';
import { SnakeGameScreen } from '@/screens/MiniGames/Games/snake/Game';
import { HeaderRouter } from '@/components/navigation/header/header';
import { PropagandaScreen } from '@/screens/propaganda';

const Stack = createNativeStackNavigator();

export function AppStack() {
	return (
		<Stack.Navigator
			initialRouteName="MainTabs"
			screenOptions={{
				headerShown: true,
				animation: 'slide_from_right',
				header: ({ options, back, route }) => {
					return <HeaderRouter title={options.title} back={back} />;
				},
			}}
		>
			<Stack.Screen name="MainTabs" component={MainTabs} />
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen
				name="Propaganda"
				component={PropagandaScreen}
				options={{ headerShown: false, animation: 'fade', presentation: 'transparentModal' }}
			/>
			<Stack.Screen name="snakeGame" component={SnakeGameScreen} options={{ title: 'Snake Game' }} />
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
