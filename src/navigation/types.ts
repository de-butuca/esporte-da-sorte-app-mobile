import type { RouteProp, ParamListBase } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

// páginas principais
export type RootStackParamList = {
	Home: undefined;
	Search: { initialSportSlug?: string } | undefined;
	Promotions: undefined;
	Support: undefined;
	GameHome: undefined;
	Login: undefined;
	Propaganda: undefined;
	Settings: { tab?: string };
};

// páginas de jogos
export type GamePages = {
	flapGame: undefined;
	snakeGame: undefined;
};

// junta tudo
export type AppParamList = RootStackParamList & GamePages;

// registra globalmente (IMPORTANTE)
declare global {
	namespace ReactNavigation {
		interface RootParamList extends AppParamList {}
	}
}

// props reutilizáveis
export type AppScreenProps<T extends keyof AppParamList> = NativeStackScreenProps<AppParamList, T>;

export type NavigationProps<T extends keyof AppParamList> = NativeStackNavigationProp<AppParamList, T>;

export type UseRouteParams<T extends keyof AppParamList> = RouteProp<AppParamList, T>;

export type AppNavigation = NativeStackNavigationProp<AppParamList>;
