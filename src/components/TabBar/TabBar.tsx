import React, { useCallback } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, useDerivedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { stylesTabBar } from './styles';
import { TAB_ITEMS, TAB_WIDTH } from './const';
import { TabItem } from './TabItem';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export function AnimatedTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
	const nameRoute = state.routeNames[state.index];
	const indexPage = TAB_ITEMS.findIndex((r) => r.path == nameRoute);

	const translateX = useDerivedValue(() =>
		withSpring(indexPage * TAB_WIDTH, { damping: 42, stiffness: 1600 })
	);

	const indicatorStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	return (
		<View style={stylesTabBar.container}>
			<Animated.View style={[stylesTabBar.indicator, indicatorStyle]} />

			{TAB_ITEMS.map((route, index: number) => {
				const isFocused = indexPage === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.path as string,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.path);
					}
				};

				return (
					<TabItem key={route.path} label={route.title} icon={route.icon} isFocused={isFocused} onPress={onPress} />
				);
			})}
		</View>
	);
}
