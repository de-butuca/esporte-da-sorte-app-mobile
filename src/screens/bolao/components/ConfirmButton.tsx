import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily } from '@/stampd.config';

interface ConfirmButtonProps {
  onPress: () => void;
  disabled?: boolean;
  completedCount: number;
  totalCount: number;
}

export function ConfirmButton({
  onPress,
  disabled,
  completedCount,
  totalCount,
}: ConfirmButtonProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['transparent', '#0B1120']}
        style={styles.gradient}
      />
      <View
        style={[styles.container, { paddingBottom: Math.max(insets.bottom, 20) }]}
      >
        <Pressable
          onPress={onPress}
          disabled={disabled}
          style={[styles.button, disabled && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>
            Confirmar Palpites ({completedCount}/{totalCount})
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  gradient: {
    height: 40,
  },
  container: {
    backgroundColor: '#0B1120',
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  button: {
    backgroundColor: '#00E878',
    height: RFValue(50),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    fontFamily: fontFamily.bold,
    fontSize: RFValue(14),
    color: '#0B1120',
    includeFontPadding: false,
  },
});
