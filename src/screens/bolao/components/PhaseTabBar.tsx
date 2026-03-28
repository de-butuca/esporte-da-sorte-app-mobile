import React, { useEffect, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Lock } from 'lucide-react-native';
import { fontFamily } from '@/stampd.config';
import type { PhaseId, PhaseTab } from '../bolao.types';

interface PhaseTabBarProps {
  activePhase: PhaseId;
  onPhaseChange: (phase: PhaseId) => void;
  phases: PhaseTab[];
  phaseCounts: Record<PhaseId, { total: number; completed: number }>;
}

export function PhaseTabBar({
  activePhase,
  onPhaseChange,
  phases,
}: PhaseTabBarProps) {
  const scrollRef = useRef<ScrollView>(null);
  const layouts = useRef<Record<string, { x: number; w: number }>>({});
  const scrollW = useRef(0);

  useEffect(() => {
    const p = layouts.current[activePhase];
    if (!p || !scrollRef.current) return;
    scrollRef.current.scrollTo({
      x: Math.max(0, p.x - scrollW.current / 2 + p.w / 2),
      animated: true,
    });
  }, [activePhase]);

  return (
    <View style={styles.root}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
        onLayout={(e) => {
          scrollW.current = e.nativeEvent.layout.width;
        }}
      >
        {phases.map((p) => {
          const active = p.id === activePhase;
          const locked = !!p.locked;
          return (
            <View
              key={p.id}
              onLayout={(e) => {
                layouts.current[p.id] = {
                  x: e.nativeEvent.layout.x,
                  w: e.nativeEvent.layout.width,
                };
              }}
            >
              <TouchableOpacity
                activeOpacity={locked ? 1 : 0.7}
                onPress={() => {
                  if (!locked) onPhaseChange(p.id);
                }}
                style={[
                  styles.pill,
                  active && !locked && styles.pillActive,
                  locked && styles.pillLocked,
                ]}
              >
                {locked && <Lock size={12} color="#475569" />}
                <Text
                  style={[
                    styles.text,
                    active && !locked && styles.textActive,
                    locked && styles.textLocked,
                  ]}
                >
                  {p.shortLabel}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 8,
  },
  content: {
    paddingHorizontal: 16,
    gap: 8,
  },
  pill: {
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#1A2332',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  pillActive: {
    backgroundColor: '#00E878',
  },
  pillLocked: {
    backgroundColor: '#101828',
    opacity: 0.6,
  },
  text: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    lineHeight: 20,
    color: '#94A3B8',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  textActive: {
    color: '#0B1120',
  },
  textLocked: {
    color: '#475569',
  },
});
