import { AppParamList } from '@/navigation/types';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

interface ResetState {
	index: number;
	routes: { name: keyof AppParamList; params: any }[];
}

export function useResetToHome(props: ResetState) {
	const navigation = useNavigation();

	const resetToHome = useCallback(() => {
		navigation.dispatch(
			CommonActions.reset(
				props ?? {
					index: 0,
					routes: [{ name: 'Home' }],
				}
			)
		);
	}, [navigation]);

	return resetToHome;
}
