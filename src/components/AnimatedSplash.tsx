import React, { useEffect, useRef, useState, useCallback } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Canvas, Rect as SkiaRect, Group } from "@shopify/react-native-skia";
import LottieView from "lottie-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { hideNativeSplash, getNativeAnimationStartTime } from "../native/NativeSplash";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
import { lightColors } from "@/stampd.config";

const BG = lightColors.background;

const LOTTIE_SOURCE = require("../../assets/images/icon-e-animated.json");

const CONFETTI_COLORS = ["#37E67D", "#0f0", "#fff", "#5BF0A0", "#1A5CC8", "#2AF598", "#00FF88", "#023697", "#FFD700", "#FF6B6B"];

const DUR = 1824;
const P6_END = 480 / DUR;
const P7_END = 1104 / DUR;

interface ConfettiPiece {
  id: number;
  x: number; y: number;
  vx: number; vy: number;
  life: number; decay: number;
  w: number; h: number;
  color: string;
  rot: number;
  rotV: number;
  wobble: number;
  wobbleV: number;
}

interface AnimatedSplashProps {
  onFinish: () => void;
}

function eio(t: number) {
  "worklet";
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function eob(t: number) {
  "worklet";
  const c = 2.2;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
}

const LottieIcon = React.memo(function LottieIcon({
  lottieRef,
  width,
  height,
}: {
  lottieRef: React.RefObject<LottieView | null>;
  width: number;
  height: number;
}) {
  return (
    <LottieView
      ref={lottieRef}
      source={LOTTIE_SOURCE}
      renderMode="HARDWARE"
      loop
      style={{ width, height }}
    />
  );
});

export default function AnimatedSplash({ onFinish }: AnimatedSplashProps) {
  const LOTTIE_W = SCREEN_W * 0.65;
  const LOTTIE_H = LOTTIE_W * (768 / 512);

  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const confettiRef = useRef<ConfettiPiece[]>([]);
  const confettiIdRef = useRef(0);
  const burstRef = useRef(false);
  const frameRef = useRef(0);
  const lottieRef = useRef<LottieView>(null);

  const progress = useSharedValue(0);

  const iconAnimStyle = useAnimatedStyle(() => {
    const t = progress.value;

    if (t <= P6_END) {
      const p = eio(t / P6_END);
      return { opacity: p, transform: [{ scale: 0.8 + p * 0.2 }] };
    } else if (t <= P7_END) {
      const p = eob((t - P6_END) / (P7_END - P6_END));
      return { opacity: 1, transform: [{ scale: 0.85 + p * 0.15 }] };
    }
    return { opacity: 1, transform: [{ scale: 1 }] };
  });

  const spawnConfetti = useCallback((cx: number, cy: number, n: number) => {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 3 + Math.random() * 6;
      const type = Math.random();
      confettiRef.current.push({
        id: confettiIdRef.current++,
        x: cx + (Math.random() - 0.5) * 80,
        y: cy + (Math.random() - 0.5) * 50,
        vx: Math.cos(a) * sp,
        vy: -3 - Math.random() * 5,
        life: 1, decay: 0.002 + Math.random() * 0.004,
        w: type < 0.5 ? 2 + Math.random() * 4 : 1 + Math.random() * 2,
        h: type < 0.5 ? 6 + Math.random() * 10 : 1 + Math.random() * 2,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rot: Math.random() * 360,
        rotV: 3 + Math.random() * 8 * (Math.random() > 0.5 ? 1 : -1),
        wobble: Math.random() * Math.PI * 2,
        wobbleV: 0.05 + Math.random() * 0.1,
      });
    }
  }, []);

  useEffect(() => {
    burstRef.current = false;

    const NATIVE_DUR = 2976;
    const nativeStartTime = getNativeAnimationStartTime() || Date.now();

    const startJSAnimation = () => {
      hideNativeSplash();
      lottieRef.current?.play(23, 96);

      progress.value = withTiming(1, {
        duration: DUR,
        easing: Easing.linear,
      }, (finished) => {
        if (finished) runOnJS(onFinish)();
      });

      const startTime = Date.now();
      const tickConfetti = () => {
        const el = Date.now() - startTime;
        const t = Math.min(el / DUR, 1);

        if (!burstRef.current && t > P6_END) {
          const p7 = (t - P6_END) / (P7_END - P6_END);
          if (p7 > 0.4) {
            burstRef.current = true;
            spawnConfetti(SCREEN_W / 2, SCREEN_H / 2, 25);
          }
        }

        if (confettiRef.current.length > 0) {
          confettiRef.current = confettiRef.current
            .filter((c) => c.life > 0 && c.y < SCREEN_H + 20)
            .map((c) => ({
              ...c,
              x: c.x + c.vx + Math.sin(c.wobble) * 1.5,
              y: c.y + c.vy,
              vy: c.vy + 0.1,
              vx: c.vx * 0.99,
              life: c.life - c.decay,
              rot: c.rot + c.rotV,
              wobble: c.wobble + c.wobbleV,
            }));
          setConfetti([...confettiRef.current]);
        }

        if (t < 1 || confettiRef.current.length > 0) {
          frameRef.current = requestAnimationFrame(tickConfetti);
        }
      };

      frameRef.current = requestAnimationFrame(tickConfetti);
    };

    const elapsed = Date.now() - nativeStartTime;
    const remaining = Math.max(0, NATIVE_DUR - elapsed);

    const timeout = setTimeout(startJSAnimation, remaining);

    const safetyTimeout = setTimeout(() => {
      hideNativeSplash();
      onFinish();
    }, 8000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(safetyTimeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
        {confetti.map((c) => (
          <Group
            key={c.id}
            transform={[
              { translateX: c.x },
              { translateY: c.y },
              { rotate: (c.rot * Math.PI) / 180 },
            ]}
            opacity={Math.min(c.life * 1.5, 1)}
          >
            <SkiaRect
              x={-c.w / 2}
              y={-c.h / 2}
              width={c.w}
              height={c.h}
              color={c.color}
            />
          </Group>
        ))}
      </Canvas>

      <Animated.View
        style={[
          styles.iconWrap,
          { width: LOTTIE_W, height: LOTTIE_H },
          iconAnimStyle,
        ]}
      >
        <LottieIcon
          lottieRef={lottieRef}
          width={LOTTIE_W}
          height={LOTTIE_H}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrap: {
    position: "absolute",
  },
});
