import { createNavigationContainerRef } from '@react-navigation/native';
import type { AppParamList } from './types';

export const navigationRef = createNavigationContainerRef<AppParamList>();

export function navigate<T extends keyof AppParamList>(screen: T, params?: AppParamList[T]) {
	if (!navigationRef.isReady()) return;
	navigationRef.navigate(screen as never, params as never);
}
