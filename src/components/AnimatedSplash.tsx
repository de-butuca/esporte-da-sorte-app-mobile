import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Canvas, Rect as SkiaRect, Group } from "@shopify/react-native-skia";
import LottieView from "lottie-react-native";
import { hideNativeSplash, getNativeAnimationStartTime } from "../native/NativeSplash";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
import { lightColors } from "@/theme/design-tokens";

const BG = lightColors.background;

const LOTTIE_SOURCE = require("../../assets/images/icon-e-animated.json");

// Exact same colors as HTML
const CONFETTI_COLORS = ["#37E67D", "#0f0", "#fff", "#5BF0A0", "#1A5CC8", "#2AF598", "#00FF88", "#023697", "#FFD700", "#FF6B6B"];

// Phases 6-8 from HTML: 62%-100% of 4800ms = 1824ms
const DUR = 1824;

// Phase boundaries (normalized within DUR)
// Phase 6: 0-480ms = 0 to 0.263 (crossfade)
// Phase 7: 480-1104ms = 0.263 to 0.605 (bounce + confetti)
// Phase 8: 1104-1824ms = 0.605 to 1.0 (static)
const P6_END = 480 / DUR;   // 0.263
const P7_END = 1104 / DUR;  // 0.605

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

interface AnimState {
  iconOpacity: number;
  iconScale: number;
}

interface AnimatedSplashProps {
  onFinish: () => void;
}

// Exact same easing as HTML
const eio = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const eob = (t: number) => { const c = 2.2; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };

export default function AnimatedSplash({ onFinish }: AnimatedSplashProps) {
  const LOTTIE_W = SCREEN_W * 0.65;
  const LOTTIE_H = LOTTIE_W * (768 / 512);

  const [anim, setAnim] = useState<AnimState>({
    iconOpacity: 0, iconScale: 0.8,
  });
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const confettiRef = useRef<ConfettiPiece[]>([]);
  const confettiIdRef = useRef(0);
  const burstRef = useRef(false);
  const startRef = useRef(0);
  const frameRef = useRef(0);
  const lottieRef = useRef<LottieView>(null);

  // Exact same spawn as HTML
  const spawnConfetti = (cx: number, cy: number, n: number) => {
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
  };

  useEffect(() => {
    burstRef.current = false;

    // Wait for native animation (phases 1-5 = 2976ms) to finish,
    // then hide native splash and start JS animation (phases 6-8)
    const NATIVE_DUR = 2976;
    const nativeStartTime = getNativeAnimationStartTime() || Date.now();

    const startJSAnimation = () => {
      hideNativeSplash();
      lottieRef.current?.play(23, 96);
      startRef.current = Date.now();
      frameRef.current = requestAnimationFrame(tick);
    };

    const tick = () => {
      const el = Date.now() - startRef.current;
      const t = Math.min(el / DUR, 1);
      let s: AnimState;

      if (t <= P6_END) {
        // Phase 6: Crossfade — icon fades in, scale 0.8→1.0
        // HTML: eio((t-.62)/.1) with full DUR → same as eio(t / P6_END) in our DUR
        const p = eio(t / P6_END);
        s = { iconOpacity: p, iconScale: 0.8 + p * 0.2 };
      } else if (t <= P7_END) {
        // Phase 7: Bounce — icon scale 0.85→1.0, confetti
        // HTML: eob((t-.72)/.13)
        const p = eob((t - P6_END) / (P7_END - P6_END));
        s = { iconOpacity: 1, iconScale: 0.85 + p * 0.15 };
        if (!burstRef.current && p > 0.4) {
          burstRef.current = true;
          spawnConfetti(SCREEN_W / 2, SCREEN_H / 2, 25);
        }
      } else {
        // Phase 8: Static
        s = { iconOpacity: 1, iconScale: 1 };
      }

      // Update confetti — exact same physics as HTML drawConfetti()
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

      setAnim(s);
      setConfetti([...confettiRef.current]);

      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        onFinish();
      }
    };

    // Calculate how much time the native animation has left
    const elapsed = Date.now() - nativeStartTime;
    const remaining = Math.max(0, NATIVE_DUR - elapsed);

    // Wait for native animation to finish, then start JS part
    const timeout = setTimeout(startJSAnimation, remaining);

    // Safety: if splash is still showing after 8s, force finish
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
      {/* Confetti */}
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

      {/* Icon (Lottie) */}
      <View
        style={[
          styles.iconWrap,
          {
            width: LOTTIE_W,
            height: LOTTIE_H,
            opacity: anim.iconOpacity,
            transform: [{ scale: anim.iconScale }],
          },
        ]}
      >
        <LottieView
          ref={lottieRef}
          source={LOTTIE_SOURCE}
          loop
          style={{ width: LOTTIE_W, height: LOTTIE_H }}
        />
      </View>
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
