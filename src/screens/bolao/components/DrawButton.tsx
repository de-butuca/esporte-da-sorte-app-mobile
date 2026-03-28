import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily } from '@/stampd.config';

interface DrawButtonProps {
  isSelected: boolean;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function DrawButton({ isSelected, onPress }: DrawButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderColor: withTiming(isSelected ? '#00E878' : 'transparent', {
      duration: 150,
    }),
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.97, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 150 });
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.container,
        isSelected && styles.containerSelected,
        animatedStyle,
      ]}
    >
      <Text style={[styles.text, isSelected && styles.textSelected]}>
        EMP
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: RFValue(48),
    height: RFValue(44),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
    backgroundColor: '#1A2332',
  },
  containerSelected: {
    borderColor: '#00E878',
    backgroundColor: 'rgba(0,232,120,0.08)',
  },
  text: {
    fontFamily: fontFamily.bold,
    fontSize: RFValue(11),
    color: '#94A3B8',
    includeFontPadding: false,
  },
  textSelected: {
    color: '#00E878',
  },
});
