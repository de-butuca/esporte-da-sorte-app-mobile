import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigation, RootStackParamList, UseRouteParams } from './types'

export function useAppNavigation() {
	return useNavigation<AppNavigation>()
}

export function useAppRoute<T extends keyof RootStackParamList>() {
	return useRoute<UseRouteParams<T>>()
}
