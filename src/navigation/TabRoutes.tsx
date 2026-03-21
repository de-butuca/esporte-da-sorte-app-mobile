import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createTestScreen } from './AppRoutes';
import { AnimatedTabBar } from '@/components/TabBar/TabBar';
import MiniGamesScreen from '@/screens/MiniGames/home/Minigames.view';
import { PerfilScreen } from '@/screens/Perfil/Home/Perfil.view';
import { HeaderRouter } from '@/components/navigation/header/header';
const Tab = createBottomTabNavigator();
export function MainTabs() {
	return (
		<Tab.Navigator
			initialRouteName="Minigames"
			tabBar={(props) => <AnimatedTabBar {...props} />}
			screenOptions={{
				// headerShown: false,
				animation: 'none',
				header: ({ options, route }) => {
					return <HeaderRouter title={options.title} />;
				},
			}}
		>
			<Tab.Screen name="Minigames" component={MiniGamesScreen} options={{ title: 'Mini Games' }} />
			<Tab.Screen name="Leaderboards" component={createTestScreen(77)} />
			<Tab.Screen name="Info" component={createTestScreen(88)} />
			<Tab.Screen name="Profile" component={PerfilScreen} />
		</Tab.Navigator>
	);
}
