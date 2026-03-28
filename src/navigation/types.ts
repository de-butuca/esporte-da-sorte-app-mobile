import type { RouteProp, ParamListBase } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
	Home: undefined;
	Search: { initialSportSlug?: string } | undefined;
	Promotions: undefined;
	Support: undefined;
	GameHome: undefined;
	SearchGames: undefined;
	Bolao: undefined;
	FaceVerification: undefined;
	FaceCapture: undefined;
	Login: undefined;
	Register: undefined;
	Propaganda: undefined;
	Settings: { tab?: string };
};

export type GamePages = {
	flapGame: undefined;
	snakeGame: undefined;
};

export type AppParamList = RootStackParamList & GamePages;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends AppParamList { }
	}
}

export type AppScreenProps<T extends keyof AppParamList> = NativeStackScreenProps<AppParamList, T>;

export type NavigationProps<T extends keyof AppParamList> = NativeStackNavigationProp<AppParamList, T>;

export type UseRouteParams<T extends keyof AppParamList> = RouteProp<AppParamList, T>;

export type AppNavigation = NativeStackNavigationProp<AppParamList>;
