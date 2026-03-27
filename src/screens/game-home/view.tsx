import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { SportradarLMT } from "@/components/SportradarLMT";
import {
  ChevronLeft,
  Share2,
  MoreVertical,
  ChevronDown,
  Info,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FLAG_BRA = "🇧🇷";
const FLAG_FRA = "🇫🇷";

/* ───────── Stat item ───────── */
function StatItem({ icon, value }: { icon: string; value: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

/* ───────── Odds button ───────── */
function OddsButton({ label, odds }: { label: string; odds: string }) {
  return (
    <Pressable style={styles.oddsButton}>
      <Text style={styles.oddsLabel}>{label}</Text>
      <Text style={styles.oddsValue}>{odds}</Text>
    </Pressable>
  );
}

/* ───────── Main screen ───────── */
export default function GameHomeScreen() {
  const insets = useSafeAreaInsets();
  const topInset = insets.top;
  const navigation = useNavigation();
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
        {/* ── Top bar (azul) ── */}
        <View style={[styles.topBarWrap, { paddingTop: topInset }]}>
          <View style={styles.topBar}>
            <Pressable style={styles.topBtn} onPress={() => navigation.goBack()}>
              <ChevronLeft size={14} color="#fff" />
            </Pressable>
            <View style={styles.topBarRight}>
              <Pressable style={styles.topBtn}>
                <Share2 size={15} color="#fff" />
              </Pressable>
              <Pressable style={styles.topBtn}>
                <MoreVertical size={14} color="#fff" />
              </Pressable>
            </View>
          </View>
        </View>

        {/* ── Match info card (branco) ── */}
        <View style={styles.matchCard}>
          {/* Time badge */}
          <View style={styles.timeBadge}>
            <Text style={styles.timeBadgeText}>73:06</Text>
          </View>

          {/* Teams + Score */}
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

          {/* Goal scorers */}
          <Text style={styles.goalScorers}>⚽ 32' K. Mbappe   65' H. Ekitike</Text>

          {/* Stats row */}
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

        {/* ── Sportradar Widget ── */}
        <SportradarLMT
          matchId="67613698"
          height={280}
          backgroundColor="#F0F0F0"
        />

        {/* ── Bottom tabs ── */}
        <View style={[styles.bottomTabsRow, { marginTop: -20 }]}>
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

        {/* ── Markets section ── */}
        <View style={styles.marketsSection}>
          {/* Resultado Final */}
          <View style={styles.marketCard}>
            <View style={styles.marketCardHeader}>
              <Text style={styles.marketCardTitle}>Resultado Final</Text>
              <View style={styles.marketCardActions}>
                <Info size={14} color="#999" />
                <ChevronDown size={16} color="#01003A" />
              </View>
            </View>
            <View style={styles.oddsRow}>
              <OddsButton label="Brasil" odds="2.10" />
              <OddsButton label="Empate" odds="3.40" />
              <OddsButton label="França" odds="3.60" />
            </View>
          </View>

          {/* Total de Gols */}
          <View style={styles.marketCard}>
            <View style={styles.marketCardHeader}>
              <View style={styles.marketTitleRow}>
                <View style={styles.popularTag}>
                  <Text style={styles.popularTxt}>POPULAR</Text>
                </View>
                <Text style={styles.marketCardTitle}>Total de Gols</Text>
              </View>
              <ChevronDown size={16} color="#01003A" />
            </View>
            <View style={styles.oddsRow}>
              <OddsButton label="Acima 2.5" odds="1.85" />
              <OddsButton label="Abaixo 2.5" odds="2.05" />
            </View>
          </View>

          {/* Ambas Marcam */}
          <View style={styles.marketCard}>
            <View style={styles.marketCardHeader}>
              <Text style={styles.marketCardTitle}>Ambas Marcam</Text>
              <ChevronDown size={16} color="#01003A" />
            </View>
            <View style={styles.oddsRow}>
              <OddsButton label="Sim" odds="1.75" />
              <OddsButton label="Não" odds="2.15" />
            </View>
          </View>

          {/* Handicap */}
          <View style={styles.marketCard}>
            <View style={styles.marketCardHeader}>
              <View style={styles.marketTitleRow}>
                <View style={[styles.popularTag, { backgroundColor: "rgba(58,231,126,0.15)" }]}>
                  <Text style={[styles.popularTxt, { color: "#1B8A4A" }]}>NOVO</Text>
                </View>
                <Text style={styles.marketCardTitle}>Handicap Asiático</Text>
              </View>
              <ChevronDown size={16} color="#01003A" />
            </View>
            <View style={styles.oddsRow}>
              <OddsButton label="Brasil -0.5" odds="2.30" />
              <OddsButton label="França +0.5" odds="1.65" />
            </View>
          </View>

          {/* Escanteios */}
          <View style={styles.marketCard}>
            <View style={styles.marketCardHeader}>
              <Text style={styles.marketCardTitle}>Total de Escanteios</Text>
              <ChevronDown size={16} color="#01003A" />
            </View>
            <View style={styles.oddsRow}>
              <OddsButton label="Acima 8.5" odds="1.90" />
              <OddsButton label="Abaixo 8.5" odds="1.95" />
            </View>
          </View>

          {/* Próximo Gol */}
          <View style={styles.marketCard}>
            <View style={styles.marketCardHeader}>
              <Text style={styles.marketCardTitle}>Próximo Gol</Text>
              <ChevronDown size={16} color="#01003A" />
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

      {/* ── Sticky NavBar (animated) ── */}
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
        <View style={[StyleSheet.absoluteFill, { backgroundColor: "#01003A" }]} />
        <Pressable style={styles.topBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={14} color="#fff" />
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
    backgroundColor: "#F0F0F0",
  },
  scrollView: {
    flex: 1,
  },

  /* Top bar (azul) */
  topBarWrap: {
    backgroundColor: "#01003A",
  },
  topBar: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10,
  },
  topBarRight: { flexDirection: "row", gap: 10 },
  topBtn: {
    width: 36, height: 36, borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center", justifyContent: "center",
  },

  /* Match card (branco) */
  matchCard: {
    backgroundColor: "#fff",
    paddingHorizontal: 16, paddingVertical: 16,
    alignItems: "center", gap: 10,
  },
  timeBadge: {
    backgroundColor: "#01003A",
    paddingHorizontal: 14, paddingVertical: 4, borderRadius: 12,
  },
  timeBadgeText: {
    fontFamily: "Inter_700Bold", fontSize: 12, color: "#fff",
  },
  teamsRow: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 16,
  },
  teamSide: {
    flexDirection: "row", alignItems: "center", gap: 8,
  },
  flagEmoji: { fontSize: 28 },
  teamName: {
    fontFamily: "Inter_700Bold", fontSize: 16, color: "#01003A",
  },
  scoreText: {
    fontFamily: "Inter_700Bold", fontSize: 32, color: "#01003A",
    fontWeight: "900", letterSpacing: 2,
  },
  goalScorers: {
    fontFamily: "Inter_700Bold", fontSize: 11, color: "#666",
  },

  /* Stats row */
  statsRow: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 16, paddingVertical: 8,
    borderTopWidth: 1, borderTopColor: "#F0F0F0",
    width: "100%",
  },
  statItem: {
    flexDirection: "row", alignItems: "center", gap: 3,
  },
  statIcon: { fontSize: 12 },
  statLabel: {
    fontFamily: "Inter_700Bold", fontSize: 10, color: "#666",
  },
  statValue: {
    fontFamily: "Inter_700Bold", fontSize: 12, color: "#01003A",
  },

  /* Event ticker */
  eventTicker: {
    flexDirection: "row", alignItems: "center", gap: 8,
    backgroundColor: "#F0F0F0", borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 8,
    width: "100%",
  },
  eventIcon: { fontSize: 14 },
  eventText: {
    flex: 1, fontFamily: "Inter_700Bold", fontSize: 11, color: "#333",
  },

  /* Campo / Estatísticas tabs */
  fieldTabsRow: {
    flexDirection: "row", gap: 8,
    paddingHorizontal: 16, paddingVertical: 10,
    backgroundColor: "#F0F0F0",
  },
  fieldTabActive: {
    flex: 1, backgroundColor: "#01003A",
    borderRadius: 12, paddingVertical: 12, alignItems: "center",
  },
  fieldTabActiveText: {
    fontFamily: "Inter_700Bold", fontSize: 14, color: "#fff",
  },
  fieldTab: {
    flex: 1, backgroundColor: "#fff",
    borderRadius: 12, paddingVertical: 12, alignItems: "center",
  },
  fieldTabText: {
    fontFamily: "Inter_700Bold", fontSize: 14, color: "#01003A",
  },

  /* Bottom tabs */
  bottomTabsRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 16, paddingVertical: 12,
    gap: 6,
  },
  bottomTab: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 20,
  },
  bottomTabActive: {
    backgroundColor: "#01003A",
  },
  bottomTabText: {
    fontFamily: "Inter_700Bold", fontSize: 12, color: "#666",
  },
  bottomTabTextActive: {
    color: "#fff",
  },

  /* Markets */
  marketsSection: {
    paddingHorizontal: 12, paddingTop: 8, gap: 8,
  },
  marketCard: {
    backgroundColor: "#fff",
    borderRadius: 16, padding: 16, gap: 12,
  },
  marketCardHeader: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
  },
  marketCardTitle: {
    fontFamily: "Inter_700Bold", fontSize: 15, color: "#01003A",
  },
  marketCardActions: {
    flexDirection: "row", alignItems: "center", gap: 10,
  },
  marketTitleRow: {
    flexDirection: "row", alignItems: "center", gap: 8,
  },
  popularTag: {
    backgroundColor: "rgba(1,0,58,0.08)",
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4,
  },
  popularTxt: {
    fontFamily: "Inter_700Bold", fontSize: 9, color: "#01003A",
    letterSpacing: 0.5, textTransform: "uppercase",
  },
  oddsRow: { flexDirection: "row", gap: 8 },
  oddsButton: {
    flex: 1, height: 52, borderRadius: 12,
    backgroundColor: "#F0F0F0",
    alignItems: "center", justifyContent: "center",
  },
  oddsLabel: { fontFamily: "Inter_700Bold", fontSize: 10, color: "#666" },
  oddsValue: {
    fontFamily: "Inter_700Bold", fontSize: 15, color: "#01003A", fontWeight: "900",
  },

  /* Sticky navbar */
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
    fontFamily: "Inter_700Bold", fontSize: 13, color: "#fff",
  },
  navScoreWrap: {
    alignItems: "center", gap: 2,
  },
  navScore: {
    fontFamily: "Inter_700Bold", fontSize: 16, color: "#fff", fontWeight: "900",
  },
  navTimeBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6,
  },
  navTimeText: {
    fontFamily: "Inter_700Bold", fontSize: 9, color: "#fff", letterSpacing: 0.5,
  },
});
