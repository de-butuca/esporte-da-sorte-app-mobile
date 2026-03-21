import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle } from 'react-native-reanimated'

import { stylesTabBar } from './styles'

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

export type TabIconComponent = React.ComponentType<{
	size?: number
	color?: string
	strokeWidth?: number
}>

export interface TabItemProps extends TouchableOpacityProps {
	label: string
	isFocused: boolean
	icon: TabIconComponent
}

export function TabItem({ label, isFocused, onPress, icon: Icon }: TabItemProps) {
	const translateY = useSharedValue(isFocused ? -8 : 0)
	const opacity = useSharedValue(isFocused ? 1 : 0)

	React.useEffect(() => {
		translateY.value = withSpring(isFocused ? -8 : 0)
		opacity.value = withTiming(isFocused ? 1 : 0, { duration: 200 })
	}, [isFocused, translateY, opacity])

	const iconStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
	}))

	const labelStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}))

	return (
		<AnimatedTouchable style={stylesTabBar.tab} onPress={onPress}>
			<Animated.View style={iconStyle}>
				<Icon size={24} strokeWidth={2.5} color={isFocused ? '#FFD700' : '#8E8E93'} />
			</Animated.View>

			<Animated.Text style={[stylesTabBar.label]}>{label}</Animated.Text>
		</AnimatedTouchable>
	)
}
