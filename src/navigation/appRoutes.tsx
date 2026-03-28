import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ButtonBase } from '@/components/Button';
import { useAppNavigation } from './hooks';
import { lightColors } from '@/stampd.config';
import HomeScreen from '@/screens/home/view';
import GameHomeScreen from '@/screens/game-home/view';
import LoginScreen from '@/screens/login/login.view';
import RegisterScreen from '@/screens/register/register.view';
import PromotionsScreen from '@/screens/promotions/view';
import SearchScreen from '@/screens/search/view';
import SearchGamesScreen from '@/screens/search-games/view';
import SupportScreen from '@/screens/support/view';
import SettingsScreen from '@/screens/settings/view';
import BolaoScreen from '@/screens/bolao/view';
import ReelsEsportesScreen from '@/screens/reelsEsportes/view';

const Stack = createNativeStackNavigator();

export function AppStack() {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_right',
				contentStyle: { backgroundColor: lightColors.background },
			}}
		>
			<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
			<Stack.Screen
				name="Search"
				component={SearchScreen}
				options={{
					headerShown: false,
					contentStyle: { backgroundColor: lightColors.background },
				}}
			/>
			<Stack.Screen
				name="Promotions"
				component={PromotionsScreen}
				options={{
					headerShown: false,
					contentStyle: { backgroundColor: lightColors.background },
				}}
			/>
			<Stack.Screen
				name="Support"
				component={SupportScreen}
				options={{
					headerShown: false,
					contentStyle: { backgroundColor: lightColors.background },
				}}
			/>
			<Stack.Screen
				name="GameHome"
				component={GameHomeScreen}
				options={{
					contentStyle: { backgroundColor: lightColors.background },
					gestureEnabled: false,
				}}
			/>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					headerShown: false,
					animation: 'slide_from_bottom',
				}}
			/>
			<Stack.Screen
				name="Register"
				component={RegisterScreen}
				options={{
					headerShown: false,
					animation: 'slide_from_right',
				}}
			/>
			<Stack.Screen
				name="SearchGames"
				component={SearchGamesScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Bolao"
				component={BolaoScreen}
				options={{
					headerShown: false,
					contentStyle: { backgroundColor: '#0B1120' },
				}}
			/>
			<Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
			<Stack.Screen name="ReelsEsportesScreen" component={ReelsEsportesScreen} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
}

export function createTestScreen(number: number) {
	return function TestScreen() {
		const { navigate } = useAppNavigation();
		return (
			<View style={testStyles.container}>
				<ButtonBase
					text="sada"
					onPress={() => {
						navigate('flapGame');
					}}
				/>
				<Text style={testStyles.title}>ESTA E UMA TELA DE {number}</Text>
				<Text style={testStyles.subtitle}>Componente criado dinamicamente</Text>
			</View>
		);
	};
}

const testStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: lightColors.background,
	},
	title: {
		fontSize: 24,
		color: lightColors.textPrimary,
	},
	subtitle: {
		fontSize: 16,
		color: lightColors.textMuted,
		marginTop: 10,
	},
});
