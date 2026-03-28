import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  Animated,
} from "react-native";
import { SportradarLMT } from "@/components/SportradarLMT";
import {
  ChevronLeft,
  Share2,
  MoreVertical,
  ChevronDown,
  Info,
} from "lucide-react-native";
import { useAppNavigation } from "@/navigation/hooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fontFamily } from "@/stampd.config";
import Logo from "@assets/esporteDaSorteCompleto.svg";

const FLAG_BRA = "🇧🇷";
const FLAG_FRA = "🇫🇷";

const BG = "#0B1120";
const SURFACE1 = "#1A2332";
const SURFACE2 = "#243447";
const NAV_BG = "#101828";
const TEXT_PRIMARY = "#FFFFFF";
const TEXT_SECONDARY = "#94A3B8";
const TEXT_MUTED = "#475569";
const ACCENT = "#00E878";
const LIVE = "#FF3B30";

function StatItem({ icon, value }: { icon: string; value: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function OddsButton({ label, odds }: { label: string; odds: string }) {
  return (
    <Pressable style={styles.oddsButton}>
      <Text style={styles.oddsLabel}>{label}</Text>
      <Text style={styles.oddsValue}>{odds}</Text>
    </Pressable>
  );
}

export default function GameHomeScreen() {
  const insets = useSafeAreaInsets();
  const topInset = insets.top;
  const navigation = useAppNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeTab, setActiveTab] = useState("Principais");

  const HEADER_THRESHOLD = topInset + 44 + 130;

  const navOpacity = scrollY.interpolate({
    inputRange: [HEADER_THRESHOLD - 40, HEADER_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const navTranslateY = scrollY.interpolate({
    inputRange: [HEADER_THRESHOLD - 40, HEADER_THRESHOLD],
    outputRange: [-10, 0],
    extrapolate: "clamp",
  });

  const tabs = ["Principais", "Gols", "Escalações", "Campo"];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        bounces={false}
      >
        <View style={[styles.topBarWrap, { paddingTop: topInset }]}>
          <View style={styles.topBar}>
            <Pressable style={styles.topBtn} onPress={() => navigation.goBack()}>
              <ChevronLeft size={14} color={TEXT_PRIMARY} />
            </Pressable>
            <Logo width={149} height={16} />
            <View style={styles.topBarRight}>
              <Pressable style={styles.topBtn}>
                <Share2 size={15} color={TEXT_PRIMARY} />
              </Pressable>
              <Pressable style={styles.topBtn}>
                <MoreVertical size={14} color={TEXT_PRIMARY} />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.matchCard}>
          <View style={styles.timeBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.timeBadgeText}>73:06</Text>
          </View>

          <View style={styles.teamsRow}>
            <View style={styles.teamSide}>
              <Text style={styles.teamName}>Brasil</Text>
              <Text style={styles.flagEmoji}>{FLAG_BRA}</Text>
            </View>

            <Text style={styles.scoreText}>0 - 2</Text>

            <View style={styles.teamSide}>
              <Text style={styles.flagEmoji}>{FLAG_FRA}</Text>
              <Text style={styles.teamName}>França</Text>
            </View>
          </View>

          <Text style={styles.goalScorers}>⚽ 32' K. Mbappe   65' H. Ekitike</Text>

          <View style={styles.statsRow}>
            <StatItem icon="🟨" value="2-1" />
            <StatItem icon="🟥" value="0-1" />
            <StatItem icon="🚩" value="3-2" />
            <StatItem icon="⚽" value="11-7" />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>xG</Text>
              <Text style={styles.statValue}>0.73-1.29</Text>
            </View>
          </View>
        </View>

        <SportradarLMT
          matchId="67613698"
          height={280}
          backgroundColor={SURFACE1}
        />

        <View style={[styles.bottomTabsRow, { marginTop: 12 }]}>
          {tabs.map((t) => (
            <Pressable
              key={t}
              style={[styles.bottomTab, activeTab === t && styles.bottomTabActive]}
              onPress={() => setActiveTab(t)}
            >
              <Text style={[styles.bottomTabText, activeTab === t && styles.bottomTabTextActive]}>
                {t}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.marketsSection}>
          <View style={styles.marketCard}>
            <View style={styles.marketCardHeader}>
              <Text style={styles.marketCardTitle}>Resultado Final</Text>
              <View style={styles.marketCardActions}>
                <Info size={14} color={TEXT_MUTED} />
                <ChevronDown size={16} color={TEXT_SECONDARY} />
              </View>
            </View>
            <View style={styles.oddsRow}>
              <OddsButton label="Brasil" odds="2.10" />
              <OddsButton label="Empate" odds="3.40" />
              <OddsButton label="França" odds="3.60" />
            </View>
          </View>

          <View style={styles.marketCard}>
            <View style={styles.marketCardHeader}>
              <View style={styles.marketTitleRow}>
                <View style={styles.popularTag}>
                  <Text style={styles.popularTxt}>POPULAR</Text>
                </View>
                <Text style={styles.marketCardTitle}>Total de Gols</Text>
              </View>
              <ChevronDown size={16} color={TEXT_SECONDARY} />
            </View>
            <View style={styles.oddsRow}>
              <OddsButton label="Acima 2.5" odds="1.85" />
              <OddsButton label="Abaixo 2.5" odds="2.05" />
            </View>
          </View>

          <View style={styles.marketCard}>
            <View style={styles.marketCardHeader}>
              <Text style={styles.marketCardTitle}>Ambas Marcam</Text>
              <ChevronDown size={16} color={TEXT_SECONDARY} />
            </View>
            <View style={styles.oddsRow}>
              <OddsButton label="Sim" odds="1.75" />
              <OddsButton label="Não" odds="2.15" />
            </View>
          </View>

          <View style={styles.marketCard}>
            <View style={styles.marketCardHeader}>
              <View style={styles.marketTitleRow}>
                <View style={styles.newTag}>
                  <Text style={styles.newTxt}>NOVO</Text>
                </View>
                <Text style={styles.marketCardTitle}>Handicap Asiático</Text>
              </View>
              <ChevronDown size={16} color={TEXT_SECONDARY} />
            </View>
            <View style={styles.oddsRow}>
              <OddsButton label="Brasil -0.5" odds="2.30" />
              <OddsButton label="França +0.5" odds="1.65" />
            </View>
          </View>

          <View style={styles.marketCard}>
            <View style={styles.marketCardHeader}>
              <Text style={styles.marketCardTitle}>Total de Escanteios</Text>
              <ChevronDown size={16} color={TEXT_SECONDARY} />
            </View>
            <View style={styles.oddsRow}>
              <OddsButton label="Acima 8.5" odds="1.90" />
              <OddsButton label="Abaixo 8.5" odds="1.95" />
            </View>
          </View>

          <View style={styles.marketCard}>
            <View style={styles.marketCardHeader}>
              <Text style={styles.marketCardTitle}>Próximo Gol</Text>
              <ChevronDown size={16} color={TEXT_SECONDARY} />
            </View>
            <View style={styles.oddsRow}>
              <OddsButton label="Brasil" odds="1.85" />
              <OddsButton label="Nenhum" odds="5.50" />
              <OddsButton label="França" odds="2.40" />
            </View>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </Animated.ScrollView>

      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.stickyNav,
          {
            height: topInset + 46,
            paddingTop: topInset,
            opacity: navOpacity,
            transform: [{ translateY: navTranslateY }],
          },
        ]}
      >
        <View style={[StyleSheet.absoluteFill, { backgroundColor: NAV_BG }]} />
        <Pressable style={styles.topBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={14} color={TEXT_PRIMARY} />
        </Pressable>
        <View style={styles.navMatchInfo}>
          <View style={styles.navTeam}>
            <Text style={styles.navFlag}>{FLAG_BRA}</Text>
            <Text style={styles.navTeamName}>BRA</Text>
          </View>
          <View style={styles.navScoreWrap}>
            <Text style={styles.navScore}>0 - 2</Text>
            <View style={styles.navTimeBadge}>
              <Text style={styles.navTimeText}>2T • 73'</Text>
            </View>
          </View>
          <View style={styles.navTeam}>
            <Text style={styles.navTeamName}>FRA</Text>
            <Text style={styles.navFlag}>{FLAG_FRA}</Text>
          </View>
        </View>
        <View style={{ width: 36 }} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },
  scrollView: {
    flex: 1,
  },
  topBarWrap: {
    backgroundColor: NAV_BG,
    paddingHorizontal: 16,
    paddingBottom: 14,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  topBar: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingTop: 14,
  },
  topBarRight: { flexDirection: "row", gap: 10 },
  topBtn: {
    width: 36, height: 36, borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center", justifyContent: "center",
  },
  matchCard: {
    backgroundColor: SURFACE1,
    paddingHorizontal: 16, paddingVertical: 16,
    alignItems: "center", gap: 10,
  },
  timeBadge: {
    backgroundColor: LIVE,
    paddingHorizontal: 14, paddingVertical: 4, borderRadius: 12,
    flexDirection: "row", alignItems: "center", gap: 6,
  },
  liveDot: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: TEXT_PRIMARY,
  },
  timeBadgeText: {
    fontFamily: fontFamily.bold, fontSize: 12, color: TEXT_PRIMARY,
  },
  teamsRow: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 16,
  },
  teamSide: {
    flexDirection: "row", alignItems: "center", gap: 8,
  },
  flagEmoji: { fontSize: 28 },
  teamName: {
    fontFamily: fontFamily.bold, fontSize: 16, color: TEXT_PRIMARY,
  },
  scoreText: {
    fontFamily: fontFamily.bold, fontSize: 32, color: TEXT_PRIMARY,
    letterSpacing: 2,
  },
  goalScorers: {
    fontFamily: fontFamily.medium, fontSize: 11, color: TEXT_SECONDARY,
  },
  statsRow: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 16, paddingVertical: 8,
    borderTopWidth: 1, borderTopColor: "rgba(148,163,184,0.1)",
    width: "100%",
  },
  statItem: {
    flexDirection: "row", alignItems: "center", gap: 3,
  },
  statIcon: { fontSize: 12 },
  statLabel: {
    fontFamily: fontFamily.bold, fontSize: 10, color: TEXT_SECONDARY,
  },
  statValue: {
    fontFamily: fontFamily.bold, fontSize: 12, color: TEXT_PRIMARY,
  },
  bottomTabsRow: {
    flexDirection: "row",
    backgroundColor: SURFACE1,
    paddingHorizontal: 16, paddingVertical: 12,
    gap: 6,
  },
  bottomTab: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 20,
  },
  bottomTabActive: {
    backgroundColor: ACCENT,
  },
  bottomTabText: {
    fontFamily: fontFamily.semibold, fontSize: 12, color: TEXT_SECONDARY,
  },
  bottomTabTextActive: {
    color: BG,
  },
  marketsSection: {
    paddingHorizontal: 12, paddingTop: 12, gap: 8,
  },
  marketCard: {
    backgroundColor: SURFACE1,
    borderRadius: 12, padding: 16, gap: 12,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.1)",
  },
  marketCardHeader: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
  },
  marketCardTitle: {
    fontFamily: fontFamily.bold, fontSize: 15, color: TEXT_PRIMARY,
  },
  marketCardActions: {
    flexDirection: "row", alignItems: "center", gap: 10,
  },
  marketTitleRow: {
    flexDirection: "row", alignItems: "center", gap: 8,
  },
  popularTag: {
    backgroundColor: "rgba(148,163,184,0.1)",
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4,
  },
  popularTxt: {
    fontFamily: fontFamily.bold, fontSize: 9, color: TEXT_SECONDARY,
    letterSpacing: 0.5, textTransform: "uppercase",
  },
  newTag: {
    backgroundColor: "rgba(0,232,120,0.1)",
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4,
  },
  newTxt: {
    fontFamily: fontFamily.bold, fontSize: 9, color: ACCENT,
    letterSpacing: 0.5, textTransform: "uppercase",
  },
  oddsRow: { flexDirection: "row", gap: 8 },
  oddsButton: {
    flex: 1, height: 52, borderRadius: 12,
    backgroundColor: SURFACE2,
    alignItems: "center", justifyContent: "center",
  },
  oddsLabel: { fontFamily: fontFamily.medium, fontSize: 10, color: TEXT_SECONDARY },
  oddsValue: {
    fontFamily: fontFamily.bold, fontSize: 15, color: ACCENT,
  },
  stickyNav: {
    position: "absolute", top: 0, left: 0, right: 0,
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", paddingHorizontal: 24,
    zIndex: 10,
  },
  navMatchInfo: {
    flexDirection: "row", alignItems: "center", gap: 12,
  },
  navTeam: {
    flexDirection: "row", alignItems: "center", gap: 6,
  },
  navFlag: { fontSize: 18 },
  navTeamName: {
    fontFamily: fontFamily.bold, fontSize: 13, color: TEXT_PRIMARY,
  },
  navScoreWrap: {
    alignItems: "center", gap: 2,
  },
  navScore: {
    fontFamily: fontFamily.bold, fontSize: 16, color: TEXT_PRIMARY,
  },
  navTimeBadge: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6,
  },
  navTimeText: {
    fontFamily: fontFamily.bold, fontSize: 9, color: TEXT_PRIMARY, letterSpacing: 0.5,
  },
});
