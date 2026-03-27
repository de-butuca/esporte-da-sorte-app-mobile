import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, Dimensions, Pressable, StyleSheet } from 'react-native';
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Sidebar } from '@/components/Sidebar';
import { SidebarContext } from './SidebarContext';

const SIDEBAR_WIDTH = Dimensions.get('window').width * 0.78;
const DURATION_OPEN = 280;
const DURATION_CLOSE = 220;

export function SidebarProvider({ children }: { children: React.ReactNode }) {
	const [visible, setVisible] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const translateX = useSharedValue(-SIDEBAR_WIDTH);
	const backdropOpacity = useSharedValue(0);

	const open = useCallback(() => {
		setVisible(true);
		setIsOpen(true);
		translateX.value = withTiming(0, { duration: DURATION_OPEN });
		backdropOpacity.value = withTiming(1, { duration: DURATION_OPEN });
	}, [translateX, backdropOpacity]);

	const close = useCallback(() => {
		setIsOpen(false);
		translateX.value = withTiming(-SIDEBAR_WIDTH, { duration: DURATION_CLOSE });
		backdropOpacity.value = withTiming(0, { duration: DURATION_CLOSE }, () => {
			runOnJS(setVisible)(false);
		});
	}, [translateX, backdropOpacity]);

	useEffect(() => {
		if (!isOpen) return;
		const sub = BackHandler.addEventListener('hardwareBackPress', () => {
			close();
			return true;
		});
		return () => sub.remove();
	}, [isOpen, close]);

	const panelStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	const backdropStyle = useAnimatedStyle(() => ({
		opacity: backdropOpacity.value,
	}));

	return (
		<SidebarContext.Provider value={{ open, close, isOpen }}>
			{children}
			{visible && (
				<>
					<Animated.View
						style={[styles.backdrop, backdropStyle]}
						pointerEvents={isOpen ? 'auto' : 'none'}
					>
						<Pressable style={StyleSheet.absoluteFill} onPress={close} />
					</Animated.View>
					<Animated.View style={[styles.panel, { width: SIDEBAR_WIDTH }, panelStyle]}>
						<Sidebar onClose={close} />
					</Animated.View>
				</>
			)}
		</SidebarContext.Provider>
	);
}

const styles = StyleSheet.create({
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.55)',
		zIndex: 100,
	},
	panel: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		zIndex: 101,
	},
});
