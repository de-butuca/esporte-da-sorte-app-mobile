import React, { useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  StatusBar,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { AnimatedScrollView } from "@/shared/ui/components/AnimatedScrollView";
import { HeaderComponentWrapper } from "@/shared/ui/helpers/wrapper/HeaderComponentWrapper";
import { LinearGradient } from "expo-linear-gradient";
import { SportradarLMT } from "@/components/SportradarLMT";
import {
  ChevronLeft,
  Share2,
  MoreVertical,
  Info,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_W } = Dimensions.get("window");
const FLAG_TUR = require("@assets/images/4700.png");
const FLAG_ROM = require("@assets/images/4477.png");

/* ───────── Header ───────── */
function HeaderContent({ topInset }: { topInset: number }) {
  const navigation = useNavigation();

  return (
    <HeaderComponentWrapper>
      {/* Widget Sportradar LMT como fundo */}
      <View style={styles.widgetWrap}>
        <SportradarLMT
          matchId="sr:match:65897796"
          height={370}
          backgroundColor="#1B7A2E"
        />
      </View>

      {/* Gradiente escuro no topo para legibilidade */}
      <LinearGradient
        colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0)"]}
        style={styles.gradientTop}
      />

      {/* Top buttons */}
      <View style={[styles.topBar, { top: topInset + 10 }]}>
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

      {/* Match info */}
      <View style={[styles.matchInfo, { top: topInset + 60 }]}>
        <View style={styles.teamsRow}>
          <View style={styles.teamRow}>
            <Image source={FLAG_TUR} style={styles.flagImg} />
            <Text style={styles.teamName}>Turquia</Text>
          </View>
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreText}>2 - 1</Text>
          </View>
          <View style={styles.teamRow}>
            <Text style={styles.teamName}>Roménia</Text>
            <Image source={FLAG_ROM} style={styles.flagImg} />
          </View>
        </View>
      </View>

    </HeaderComponentWrapper>
  );
}

/* ───────── NavBar (sticky on scroll) ───────── */
function StickyNavBar({ topInset }: { topInset: number }) {
  const navigation = useNavigation();
  return (
    <View style={[styles.stickyNav, { height: topInset + 46, paddingTop: topInset }]}>
      <LinearGradient
        colors={["#1B7A2E", "#166B27"]}
        style={StyleSheet.absoluteFill}
      />
      <Pressable style={styles.topBtn} onPress={() => navigation.goBack()}>
        <ChevronLeft size={14} color="#fff" />
      </Pressable>

      {/* Match info compacto */}
      <View style={styles.navMatchInfo}>
        <View style={styles.navTeam}>
          <Image source={FLAG_TUR} style={styles.navFlagImg} />
          <Text style={styles.navTeamName}>TUR</Text>
        </View>

        <View style={styles.navScoreWrap}>
          <Text style={styles.navScore}>0 - 0</Text>
          <View style={styles.navTimeBadge}>
            <Text style={styles.navTimeText}>1T • 23'</Text>
          </View>
        </View>

        <View style={styles.navTeam}>
          <Text style={styles.navTeamName}>ROM</Text>
          <Image source={FLAG_ROM} style={styles.navFlagImg} />
        </View>
      </View>

      <View style={{ width: 36 }} />
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

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <AnimatedScrollView
        headerMaxHeight={370}
        topBarHeight={topInset + 46}
        renderHeaderComponent={() => <HeaderContent topInset={topInset} />}
        renderTopNavBarComponent={() => <StickyNavBar topInset={topInset} />}
      >

        {/* White section */}
        <View style={styles.whiteSection}>
          <View style={styles.tabsRow}>
            <View style={styles.tabActive}>
              <Text style={styles.tabActiveTxt}>Principal</Text>
              <View style={styles.tabBar} />
            </View>
            {["Estatísticas", "Escalação", "Campo"].map((t) => (
              <Pressable key={t} style={styles.tab}>
                <Text style={styles.tabTxt}>{t}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.marketSection}>
            <View style={styles.marketHeader}>
              <Text style={styles.marketTitle}>RESULTADO FINAL</Text>
              <Info size={15} color="#5D5E6D" />
            </View>

            <View style={styles.oddsRow}>
              <OddsButton label="Turquia" odds="2.10" />
              <OddsButton label="Empate" odds="3.40" />
              <OddsButton label="Roménia" odds="3.60" />
            </View>

            <View style={styles.goalsCard}>
              <View style={styles.goalsHeader}>
                <View style={styles.popularTag}>
                  <Text style={styles.popularTxt}>POPULAR</Text>
                </View>
                <Text style={styles.goalsTitle}>Total de Gols</Text>
              </View>
              <View style={styles.goalsRow}>
                <View style={styles.goalOpt}>
                  <Text style={styles.goalLabel}>Acima de 2.5</Text>
                  <Text style={styles.goalOdds}>1.85</Text>
                </View>
                <View style={styles.goalOpt}>
                  <View>
                    <Text style={styles.goalLabel}>Abaixo de</Text>
                    <Text style={styles.goalLabel}>2.5</Text>
                  </View>
                  <Text style={styles.goalOdds}>2.05</Text>
                </View>
              </View>
            </View>

            {/* Ambas Marcam */}
            <View style={styles.marketHeader}>
              <Text style={styles.marketTitle}>AMBAS MARCAM</Text>
              <Info size={15} color="#5D5E6D" />
            </View>
            <View style={styles.oddsRow}>
              <OddsButton label="Sim" odds="1.75" />
              <OddsButton label="Não" odds="2.15" />
            </View>

            {/* Handicap */}
            <View style={styles.goalsCard}>
              <View style={styles.goalsHeader}>
                <View style={styles.popularTag}>
                  <Text style={styles.popularTxt}>NOVO</Text>
                </View>
                <Text style={styles.goalsTitle}>Handicap Asiático</Text>
              </View>
              <View style={styles.goalsRow}>
                <View style={styles.goalOpt}>
                  <Text style={styles.goalLabel}>Turquia -0.5</Text>
                  <Text style={styles.goalOdds}>2.30</Text>
                </View>
                <View style={styles.goalOpt}>
                  <Text style={styles.goalLabel}>Roménia +0.5</Text>
                  <Text style={styles.goalOdds}>1.65</Text>
                </View>
              </View>
            </View>

            {/* Escanteios */}
            <View style={styles.marketHeader}>
              <Text style={styles.marketTitle}>TOTAL DE ESCANTEIOS</Text>
              <Info size={15} color="#5D5E6D" />
            </View>
            <View style={styles.oddsRow}>
              <OddsButton label="Acima 8.5" odds="1.90" />
              <OddsButton label="Abaixo 8.5" odds="1.95" />
            </View>

            {/* Cartões */}
            <View style={styles.goalsCard}>
              <View style={styles.goalsHeader}>
                <View style={styles.popularTag}>
                  <Text style={styles.popularTxt}>ESPECIAL</Text>
                </View>
                <Text style={styles.goalsTitle}>Total de Cartões</Text>
              </View>
              <View style={styles.goalsRow}>
                <View style={styles.goalOpt}>
                  <Text style={styles.goalLabel}>Acima de 3.5</Text>
                  <Text style={styles.goalOdds}>1.72</Text>
                </View>
                <View style={styles.goalOpt}>
                  <View>
                    <Text style={styles.goalLabel}>Abaixo de</Text>
                    <Text style={styles.goalLabel}>3.5</Text>
                  </View>
                  <Text style={styles.goalOdds}>2.20</Text>
                </View>
              </View>
            </View>

            {/* Primeiro Gol */}
            <View style={styles.marketHeader}>
              <Text style={styles.marketTitle}>PRÓXIMO GOL</Text>
              <Info size={15} color="#5D5E6D" />
            </View>
            <View style={styles.oddsRow}>
              <OddsButton label="Turquia" odds="1.85" />
              <OddsButton label="Nenhum" odds="5.50" />
              <OddsButton label="Roménia" odds="2.40" />
            </View>

            {/* Intervalo/Final */}
            <View style={styles.goalsCard}>
              <View style={styles.goalsHeader}>
                <View style={styles.popularTag}>
                  <Text style={styles.popularTxt}>POPULAR</Text>
                </View>
                <Text style={styles.goalsTitle}>Intervalo / Final</Text>
              </View>
              <View style={styles.goalsRow}>
                <View style={styles.goalOpt}>
                  <Text style={styles.goalLabel}>Turquia / Turquia</Text>
                  <Text style={styles.goalOdds}>3.10</Text>
                </View>
                <View style={styles.goalOpt}>
                  <Text style={styles.goalLabel}>Empate / Turquia</Text>
                  <Text style={styles.goalOdds}>4.50</Text>
                </View>
              </View>
            </View>

          </View>

          <View style={{ height: 140 }} />
        </View>
      </AnimatedScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f8f9fc",
  },

  widgetWrap: {
    ...StyleSheet.absoluteFillObject,
  },
  gradientTop: {
    position: "absolute", top: 0, left: 0, right: 0, height: 120,
  },

  /* Top bar */
  topBar: {
    position: "absolute",
    left: 24, right: 24,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
  },
  topBarRight: { flexDirection: "row", gap: 12 },
  topBtn: {
    width: 36, height: 36, borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center", justifyContent: "center",
  },

  /* Match info */
  matchInfo: {
    position: "absolute",
    left: 0, right: 0, alignItems: "center", gap: 16,
  },
  teamsRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  teamRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  flagImg: { width: 22, height: 16, borderRadius: 3 },
  teamName: {
    fontFamily: "Inter_700Bold", fontSize: 15, color: "#fff", letterSpacing: -0.375,
  },
  scoreBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 6,
  },
  scoreText: {
    fontFamily: "Inter_700Bold", fontSize: 18, color: "#fff",
    fontWeight: "900",
  },


  /* Sticky navbar */
  stickyNav: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", paddingHorizontal: 24,
    overflow: "hidden",
  },
  navMatchInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  navTeam: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  navFlagImg: {
    width: 20, height: 14, borderRadius: 2,
  },
  navTeamName: {
    fontFamily: "Inter_700Bold",
    fontSize: 13, color: "#fff",
  },
  navScoreWrap: {
    alignItems: "center",
    gap: 2,
  },
  navScore: {
    fontFamily: "Inter_700Bold",
    fontSize: 16, color: "#fff", fontWeight: "900",
  },
  navTimeBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: 6,
  },
  navTimeText: {
    fontFamily: "Inter_700Bold",
    fontSize: 9, color: "#fff",
    letterSpacing: 0.5,
  },


  /* White section */
  whiteSection: {
    backgroundColor: "#f8f9fc",
    borderTopLeftRadius: 32, borderTopRightRadius: 32,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.05, shadowRadius: 30, elevation: 5,
    minHeight: 500,
  },

  tabsRow: {
    flexDirection: "row", paddingHorizontal: 24, gap: 24,
    height: 34, borderBottomWidth: 1, borderBottomColor: "#E1E6F0",
    marginTop: 16,
  },
  tabActive: { alignItems: "center", paddingBottom: 12 },
  tabActiveTxt: { fontFamily: "Inter_700Bold", fontSize: 14, color: "#023397" },
  tabBar: {
    position: "absolute", bottom: -1,
    width: 32, height: 4, borderRadius: 12, backgroundColor: "#023397",
  },
  tab: { paddingBottom: 12 },
  tabTxt: { fontFamily: "Inter_700Bold", fontSize: 14, color: "#5D5E6D" },

  marketSection: { paddingHorizontal: 24, paddingTop: 24, gap: 16 },
  marketHeader: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
  },
  marketTitle: {
    fontFamily: "Inter_700Bold", fontSize: 11, color: "#5D5E6D",
    letterSpacing: 1.1, textTransform: "uppercase", fontWeight: "900",
  },
  oddsRow: { flexDirection: "row", gap: 12 },
  oddsButton: {
    flex: 1, height: 56, borderRadius: 16,
    backgroundColor: "#F1F3F9",
    borderWidth: 1, borderColor: "rgba(2,51,151,0.05)",
    alignItems: "center", justifyContent: "center",
  },
  oddsLabel: { fontFamily: "Inter_700Bold", fontSize: 10, color: "#5D5E6D" },
  oddsValue: {
    fontFamily: "Inter_700Bold", fontSize: 15, color: "#023397", fontWeight: "900",
  },
  goalsCard: {
    backgroundColor: "#F8F9FC",
    borderWidth: 1, borderColor: "rgba(2,51,151,0.1)",
    borderRadius: 24, padding: 21, gap: 16,
  },
  goalsHeader: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
  },
  popularTag: {
    backgroundColor: "rgba(2,51,151,0.1)",
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4,
  },
  popularTxt: {
    fontFamily: "Inter_700Bold", fontSize: 10, color: "#023397",
    letterSpacing: 0.5, textTransform: "uppercase", fontWeight: "900",
  },
  goalsTitle: {
    fontFamily: "Inter_700Bold", fontSize: 13, color: "#1A1C24", fontWeight: "900",
  },
  goalsRow: { flexDirection: "row", gap: 12, height: 70 },
  goalOpt: {
    flex: 1, backgroundColor: "#fff",
    borderRadius: 16, borderWidth: 1, borderColor: "rgba(0,0,0,0.05)",
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", paddingHorizontal: 17,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 2, elevation: 1,
  },
  goalLabel: { fontFamily: "Inter_700Bold", fontSize: 12, color: "#5D5E6D" },
  goalOdds: {
    fontFamily: "Inter_700Bold", fontSize: 15, color: "#023397", fontWeight: "900",
  },
});
