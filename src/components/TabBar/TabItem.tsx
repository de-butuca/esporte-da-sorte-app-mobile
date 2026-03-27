import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import Animated, { useSharedValue, useDerivedValue, withSpring, withTiming, useAnimatedStyle } from 'react-native-reanimated'

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
	const translateY = useDerivedValue(() =>
		withSpring(isFocused ? -8 : 0)
	)
	const opacity = useDerivedValue(() =>
		withTiming(isFocused ? 1 : 0, { duration: 200 })
	)

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
