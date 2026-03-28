import React, { useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { fontFamily } from '@/stampd.config';
import { useBolaoStore } from './bolao.store';
import { ALL_PHASES, GROUPS, getMatchesByPhase } from './bolao.data';
import { PhaseTabBar } from './components/PhaseTabBar';
import { GroupMatchCard } from './components/GroupMatchCard';
import { KnockoutMatchCard } from './components/KnockoutMatchCard';
import { ConfirmButton } from './components/ConfirmButton';
import type { Match, PhaseId, PickResult } from './bolao.types';
import { useAppNavigation } from '@/navigation/hooks';
import { useAuthGuard } from '@/core/auth/useAuthGuard';
import { ChevronLeft, Share2 } from 'lucide-react-native';
import LogoExtenso from '@assets/esportesDaSorteExtensoVerde.svg';

const BG = '#0B1120';
const TOTAL_MATCHES = 48;
const GROUP_PHASE_IDS: PhaseId[] = ['rod1', 'rod2', 'rod3'];

const ItemSeparator = () => <View style={styles.separator} />;

export default function BolaoScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();
  const picks = useBolaoStore((s) => s.picks);
  const activePhase = useBolaoStore((s) => s.activePhase);
  const setActivePhase = useBolaoStore((s) => s.setActivePhase);
  const togglePick = useBolaoStore((s) => s.togglePick);
  const { requireAuth } = useAuthGuard();

  const isGroupPhase = GROUP_PHASE_IDS.includes(activePhase);
  const completedCount = Object.keys(picks).length;
  const percentage = TOTAL_MATCHES > 0 ? Math.round((completedCount / TOTAL_MATCHES) * 100) : 0;

  const progressWidth = useSharedValue(0);
  const targetProgress = TOTAL_MATCHES > 0 ? (completedCount / TOTAL_MATCHES) * 100 : 0;
  progressWidth.value = withTiming(targetProgress, { duration: 300 });

  const animatedBarStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%` as any,
  }));

  const handlePhaseChange = useCallback(
    (phase: PhaseId) => {
      setActivePhase(phase);
    },
    [setActivePhase],
  );

  const phaseCounts = useMemo(() => {
    const counts = {} as Record<PhaseId, { total: number; completed: number }>;
    ALL_PHASES.forEach((phase) => {
      const matches = getMatchesByPhase(phase.id);
      counts[phase.id] = {
        total: matches.length,
        completed: matches.filter((m) => m.id in picks).length,
      };
    });
    return counts;
  }, [picks]);

  const handlePick = useCallback(
    (matchId: string, pick: PickResult) => {
      togglePick(matchId, pick as string);
    },
    [togglePick],
  );

  const handleConfirm = useCallback(() => {
    requireAuth(() => {
    });
  }, [requireAuth]);

  const groupsWithMatches = useMemo(() => {
    if (!isGroupPhase) return [];
    return GROUPS.map((group) => ({
      ...group,
      matches: group.matches.filter((m) => m.phase === activePhase),
    })).filter((g) => g.matches.length > 0);
  }, [activePhase, isGroupPhase]);

  const knockoutMatches = useMemo(() => {
    if (isGroupPhase) return [];
    return getMatchesByPhase(activePhase);
  }, [activePhase, isGroupPhase]);

  const renderGroupCard = useCallback(
    ({ item: group }: { item: typeof groupsWithMatches[number] }) => (
      <View style={styles.cardWrapper}>
        <View style={styles.groupCard}>
          <View style={styles.groupHeader}>
            <View style={styles.sectionAccent} />
            <Text style={styles.sectionTitle}>{group.name}</Text>
          </View>
          {group.matches.map((match, index) => (
            <View key={match.id}>
              {index > 0 && <View style={styles.matchDivider} />}
              <GroupMatchCard match={match} currentPick={picks[match.id]} onPick={handlePick} />
            </View>
          ))}
        </View>
      </View>
    ),
    [picks, handlePick],
  );

  const renderKnockoutItem = useCallback(
    ({ item }: { item: Match }) => (
      <View style={styles.cardWrapper}>
        <KnockoutMatchCard
          match={item}
          currentPick={picks[item.id]}
          onPick={handlePick}
          phaseId={activePhase}
        />
      </View>
    ),
    [picks, handlePick, activePhase],
  );

  const groupKeyExtractor = useCallback((item: typeof groupsWithMatches[number]) => item.code, []);
  const knockoutKeyExtractor = useCallback((item: Match) => item.id, []);

  return (
    <View style={styles.container}>
      <View style={[styles.topArea, { paddingTop: insets.top + 8 }]}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ChevronLeft size={14} color="#fff" />
          </TouchableOpacity>

          <LogoExtenso width={RFValue(140)} height={RFValue(24)} />

          <TouchableOpacity
            style={styles.iconBtn}
            activeOpacity={0.7}
          >
            <Share2 size={15} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.progressSection}>
          <Text style={styles.bolaoTitle}>Bolão da Copa</Text>
          <Text style={styles.progressLabel}>{percentage}%</Text>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, animatedBarStyle]}>
              <LinearGradient
                colors={['#00E878', '#00B4D8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          </View>
        </View>
      </View>

      <PhaseTabBar
        activePhase={activePhase}
        onPhaseChange={handlePhaseChange}
        phases={ALL_PHASES}
        phaseCounts={phaseCounts}
      />

      <View style={styles.listContainer}>
        {isGroupPhase ? (
          <FlatList
            data={groupsWithMatches}
            keyExtractor={groupKeyExtractor}
            renderItem={renderGroupCard}
            ItemSeparatorComponent={ItemSeparator}
            contentContainerStyle={[styles.listContent, { paddingBottom: RFValue(120) + insets.bottom }]}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            windowSize={5}
          />
        ) : (
          <FlatList
            data={knockoutMatches}
            keyExtractor={knockoutKeyExtractor}
            renderItem={renderKnockoutItem}
            ItemSeparatorComponent={ItemSeparator}
            contentContainerStyle={[styles.listContent, { paddingBottom: RFValue(120) + insets.bottom }]}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            windowSize={5}
          />
        )}
      </View>

      <ConfirmButton
        onPress={handleConfirm}
        completedCount={completedCount}
        totalCount={TOTAL_MATCHES}
        disabled={completedCount < TOTAL_MATCHES}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  topArea: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressSection: {
    gap: 4,
  },
  bolaoTitle: {
    fontFamily: fontFamily.bold,
    fontSize: RFValue(18),
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  progressLabel: {
    fontFamily: fontFamily.medium,
    fontSize: RFValue(11),
    color: '#94A3B8',
    includeFontPadding: false,
  },
  progressTrack: {
    height: 5,
    borderRadius: 9999,
    backgroundColor: '#1A2332',
    overflow: 'hidden',
  },
  progressFill: {
    height: 5,
    borderRadius: 9999,
    overflow: 'hidden',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingTop: 4,
  },
  cardWrapper: {
    paddingHorizontal: 16,
  },
  groupCard: {
    backgroundColor: '#243447',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.2)',
    borderRadius: 12,
    padding: 14,
    gap: 0,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionAccent: {
    width: 3,
    height: RFValue(14),
    backgroundColor: '#00E878',
    borderRadius: 2,
    marginRight: 8,
  },
  sectionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: RFValue(13),
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  matchDivider: {
    height: 1,
    backgroundColor: 'rgba(148,163,184,0.12)',
    marginVertical: 12,
  },
  separator: {
    height: 16,
  },
});
