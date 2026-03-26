import React, { useCallback, useState, useEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  Modal,
} from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { Gift } from "lucide-react-native";
import { RouletteWheel } from "./RouletteWheel";

const { width: SCREEN_W } = Dimensions.get("window");
const WHEEL_SIZE = SCREEN_W * 0.95;

export interface RouletteItem {
  label: string;
  color: string;
  value: string;
}

const WHEEL_PRIZES: RouletteItem[] = [
  { label: "10 giros no Genie's", color: "#37E67D", value: "10giros_genies" },
  { label: "100 reais", color: "#1A5CC8", value: "100reais" },
  { label: "150 giros no Fortune Snake", color: "#37E67D", value: "150giros" },
  { label: "iPhone 17", color: "#1A5CC8", value: "iphone17" },
  { label: "15 giros no Macaco Sortudo", color: "#37E67D", value: "15giros" },
  { label: "100 giros no Thor's Rage", color: "#1A5CC8", value: "100giros" },
  { label: "3 giros no Genie's", color: "#37E67D", value: "3giros" },
  { label: "Tente amanhã", color: "#1A5CC8", value: "proxima" },
  { label: "10 giros no Wacky Panda", color: "#37E67D", value: "10giros_wacky" },
  { label: "1 MILHÃO DE REAIS", color: "#1A5CC8", value: "1milhao" },
];

function parsePrize(label: string): { hero: string; detail: string | null } {
  const match = label.match(/^(\d+\s*\w+)\s+(no\s+.+)$/i);
  if (match) return { hero: match[1].toUpperCase(), detail: match[2] };
  return { hero: label.toUpperCase(), detail: null };
}

function LoadingDots() {
  const dot1 = useSharedValue(0.2);
  const dot2 = useSharedValue(0.2);
  const dot3 = useSharedValue(0.2);

  useEffect(() => {
    const dur = 400;
    dot1.value = withRepeat(
      withSequence(withTiming(1, { duration: dur }), withTiming(0.2, { duration: dur })),
      -1, true
    );
    dot2.value = withDelay(200, withRepeat(
      withSequence(withTiming(1, { duration: dur }), withTiming(0.2, { duration: dur })),
      -1, true
    ));
    dot3.value = withDelay(400, withRepeat(
      withSequence(withTiming(1, { duration: dur }), withTiming(0.2, { duration: dur })),
      -1, true
    ));
  }, []);

  const s1 = useAnimatedStyle(() => ({ opacity: dot1.value }));
  const s2 = useAnimatedStyle(() => ({ opacity: dot2.value }));
  const s3 = useAnimatedStyle(() => ({ opacity: dot3.value }));

  return (
    <View style={dotsStyles.row}>
      <Animated.Text style={[dotsStyles.dot, s1]}>.</Animated.Text>
      <Animated.Text style={[dotsStyles.dot, s2]}>.</Animated.Text>
      <Animated.Text style={[dotsStyles.dot, s3]}>.</Animated.Text>
    </View>
  );
}

const dotsStyles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  dot: { color: "#fff", fontSize: 28, fontWeight: "bold", marginHorizontal: 2 },
});

interface Props {
  visible: boolean;
  onClose: () => void;
  onResult?: (item: RouletteItem) => void;
}

export function Roulette({ visible, onClose, onResult }: Props) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<RouletteItem | null>(null);

  const handleSpin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
  }, [spinning]);

  const handleFinish = useCallback(
    (item: RouletteItem) => {
      setSpinning(false);
      setResult(item);
      onResult?.(item);
    },
    [onResult]
  );

  const handleClose = useCallback(() => {
    setResult(null);
    setSpinning(false);
    onClose();
  }, [onClose]);

  const prize = useMemo(() => (result ? parsePrize(result.label) : null), [result]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill} />

      <Animated.View
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(200)}
        style={styles.overlay}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={!spinning && !result ? handleClose : undefined}
        />

        {/* Roleta */}
        <View style={styles.wheelCenter}>
          <RouletteWheel
            items={WHEEL_PRIZES}
            size={WHEEL_SIZE}
            spinning={spinning}
            onFinish={handleFinish}
          />
        </View>

        {/* Resultado */}
        {result && prize && (
          <>
            {result.value === "proxima" ? (
              <>
                {/* Não ganhou — tente amanhã */}
                <Animated.View
                  entering={FadeIn.delay(200).duration(300)}
                  style={styles.parabensWrap}
                >
                  <Text style={styles.parabensText}>QUE PENA!</Text>
                </Animated.View>

                <Animated.View
                  entering={FadeInDown.delay(300).duration(350)}
                  style={styles.prizeBlock}
                >
                  <Text style={styles.prizeLabelText}>Não foi dessa vez...</Text>
                  <Text style={styles.prizeHero}>TENTE AMANHÃ</Text>
                  <Text style={styles.prizeDetail}>Volte amanhã para girar novamente</Text>
                </Animated.View>

                <Animated.View
                  entering={FadeIn.delay(500).duration(300)}
                  style={styles.bottomArea}
                >
                  <Pressable style={styles.tryAgainButton} onPress={handleClose}>
                    <Text style={styles.tryAgainText}>Entendi</Text>
                  </Pressable>
                </Animated.View>
              </>
            ) : (
              <>
                {/* Ganhou */}
                <Animated.View
                  entering={FadeIn.delay(200).duration(300)}
                  style={styles.parabensWrap}
                >
                  <Text style={styles.parabensText}>PARABÉNS!</Text>
                </Animated.View>

                <Animated.View
                  entering={FadeInDown.delay(300).duration(350)}
                  style={styles.prizeBlock}
                >
                  <Text style={styles.prizeLabelText}>Você ganhou!</Text>
                  <Text style={styles.prizeHero}>{prize.hero}</Text>
                  {prize.detail && (
                    <Text style={styles.prizeDetail}>{prize.detail}</Text>
                  )}
                </Animated.View>

                <Animated.View
                  entering={FadeIn.delay(500).duration(300)}
                  style={styles.bottomArea}
                >
                  <Pressable style={styles.ctaButton} onPress={handleClose}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                      <Gift size={20} color="#02003A" strokeWidth={2.5} />
                      <Text style={styles.ctaText}>Resgatar agora</Text>
                    </View>
                  </Pressable>
                </Animated.View>
              </>
            )}
          </>
        )}

        {/* Botão girar — só quando não tem resultado */}
        {!result && (
          <View style={styles.bottomArea}>
            <Pressable
              style={[styles.spinButton, spinning && styles.spinButtonDisabled]}
              onPress={handleSpin}
              disabled={spinning}
            >
              {spinning ? (
                <LoadingDots />
              ) : (
                <Text style={styles.spinText}>Girar a roleta</Text>
              )}
            </Pressable>
          </View>
        )}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wheelCenter: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  bottomArea: {
    position: "absolute",
    bottom: 55,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  // --- Parabéns acima da roleta ---
  parabensWrap: {
    position: "absolute",
    top: 120,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  parabensText: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    color: "#fff",
    letterSpacing: 3,
    textTransform: "uppercase",
  },

  // --- Prêmio abaixo da roleta ---
  prizeBlock: {
    alignItems: "center",
    marginTop: 16,
  },
  prizeLabelText: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
    marginBottom: 4,
  },
  prizeHero: {
    fontFamily: "Inter_700Bold",
    fontSize: 34,
    color: "#fff",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  prizeDetail: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: "rgba(255,255,255,0.4)",
    textAlign: "center",
    marginTop: 2,
  },

  // --- Botões ---
  spinButton: {
    backgroundColor: "#2EE683",
    paddingVertical: 16,
    borderRadius: 12,
    width: SCREEN_W * 0.85,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 54,
  },
  spinButtonDisabled: {
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  spinText: {
    fontFamily: "Inter_700Bold",
    color: "#02003A",
    fontSize: 17,
  },
  ctaButton: {
    backgroundColor: "#2EE683",
    paddingVertical: 16,
    borderRadius: 12,
    width: SCREEN_W * 0.85,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 54,
  },
  ctaText: {
    fontFamily: "Inter_700Bold",
    color: "#02003A",
    fontSize: 17,
  },
  tryAgainButton: {
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingVertical: 16,
    borderRadius: 12,
    width: SCREEN_W * 0.85,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 54,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  tryAgainText: {
    fontFamily: "Inter_700Bold",
    color: "#fff",
    fontSize: 17,
  },
});
