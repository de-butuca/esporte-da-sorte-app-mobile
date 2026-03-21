import LoginScreen from '@/screens/login/login.view'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Text, View } from 'react-native'

const Stack = createNativeStackNavigator()

export function AuthStack() {
	return (
		<Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" options={{ presentation: 'formSheet' }} component={LoginScreen} />
		</Stack.Navigator>
	)
}
