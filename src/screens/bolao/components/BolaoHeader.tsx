import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { lightColors, fontFamily } from '@/stampd.config';

interface BolaoHeaderProps {
  completedPicks: number;
  totalMatches: number;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export function BolaoHeader({ completedPicks, totalMatches }: BolaoHeaderProps) {
  const insets = useSafeAreaInsets();
  const percentage = totalMatches > 0 ? Math.round((completedPicks / totalMatches) * 100) : 0;
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    const targetWidth = totalMatches > 0 ? (completedPicks / totalMatches) * 100 : 0;
    progressWidth.value = withTiming(targetWidth, { duration: 300 });
  }, [completedPicks, totalMatches, progressWidth]);

  const animatedBarStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%` as any,
  }));

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <Text style={styles.title}>{'\u26BD'} Bol\u00E3o Copa 2026</Text>
      <View style={styles.subtitleRow}>
        <Text style={styles.subtitle}>
          {completedPicks}/{totalMatches} palpites
        </Text>
        <Text style={styles.subtitle}>{percentage}%</Text>
      </View>
      <View style={styles.progressTrack}>
        <AnimatedView style={[styles.progressFill, animatedBarStyle]}>
          <LinearGradient
            colors={[lightColors.accent, '#00B4D8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </AnimatedView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: RFValue(18),
    color: lightColors.textPrimary,
    marginBottom: 8,
  },
  subtitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: fontFamily.medium,
    fontSize: RFValue(12),
    color: lightColors.textMuted,
  },
  progressTrack: {
    height: 6,
    borderRadius: 9999,
    backgroundColor: '#1A2744',
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 9999,
    overflow: 'hidden',
  },
});
