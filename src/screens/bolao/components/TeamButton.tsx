import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily } from '@/stampd.config';
import type { Team } from '../bolao.types';
import { FLAGS } from '../flags';

interface TeamButtonProps {
  team: Team | string;
  isSelected: boolean;
  side: 'home' | 'away';
  onPress: () => void;
  disabled?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function TeamButton({
  team,
  isSelected,
  side,
  onPress,
  disabled,
}: TeamButtonProps) {
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

  const isPlaceholder = typeof team === 'string';
  const code = isPlaceholder ? team : team.code;
  const flagSource = isPlaceholder ? null : FLAGS[team.code];
  const isAway = side === 'away';

  const flagElement = flagSource ? (
    <Image source={flagSource} style={styles.flag} contentFit="cover" />
  ) : (
    <View style={styles.placeholderFlag}>
      <Text style={styles.placeholderText}>{code.charAt(0)}</Text>
    </View>
  );

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.container,
        isAway && styles.containerAway,
        isSelected && styles.containerSelected,
        animatedStyle,
      ]}
    >
      {!isAway && flagElement}
      <Text
        style={[styles.code, isSelected && styles.codeSelected]}
        numberOfLines={1}
      >
        {code}
      </Text>
      {isAway && flagElement}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: RFValue(44),
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
    backgroundColor: '#1A2332',
    gap: RFValue(6),
  },
  containerAway: {
    flexDirection: 'row-reverse',
  },
  containerSelected: {
    borderColor: '#00E878',
    backgroundColor: 'rgba(0,232,120,0.08)',
  },
  flag: {
    width: RFValue(24),
    height: RFValue(24),
    borderRadius: RFValue(12),
  },
  placeholderFlag: {
    width: RFValue(24),
    height: RFValue(24),
    borderRadius: RFValue(12),
    backgroundColor: '#243447',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontFamily: fontFamily.bold,
    fontSize: RFValue(11),
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  code: {
    fontFamily: fontFamily.bold,
    fontSize: RFValue(13),
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  codeSelected: {
    color: '#00E878',
  },
});
