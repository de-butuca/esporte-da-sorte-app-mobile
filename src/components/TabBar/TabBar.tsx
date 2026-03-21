import React from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { stylesTabBar } from './styles';
import { TAB_ITEMS, TAB_WIDTH } from './const';
import { TabItem } from './TabItem';
import { Gamepad2, Trophy, Info, User } from 'lucide-react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export function AnimatedTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
	const nameRoute = state.routeNames[state.index];
	const indexPage = TAB_ITEMS.findIndex((r) => r.path == nameRoute);

	const translateX = useSharedValue(indexPage * TAB_WIDTH);

	React.useEffect(() => {
		translateX.value = withSpring(indexPage * TAB_WIDTH, {
			damping: 42,
			stiffness: 1600,
		});
	}, [indexPage]);

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
