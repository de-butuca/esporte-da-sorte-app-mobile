import React, { useEffect, useRef, useCallback, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Canvas, Rect as SkiaRect, Group, vec } from "@shopify/react-native-skia";
import { Svg, Path, G, Defs, ClipPath, Rect } from "react-native-svg";
import LottieView from "lottie-react-native";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");
const BG = "#023697";

// --- É ---
const PATH_E_CORPO =
  "M134 115.48C158.17 114.81 178.54 98.95 185.9 77.11H56.31V77.13C25.24 77.26 0 102.58 0 133.69C0 164.8 25.16 190.03 56.16 190.25L132.41 190.26H185.9C178.54 168.41 158.17 152.55 134 151.89H56.57C46.71 151.89 38.37 143.56 38.37 133.69C38.37 123.82 46.7 115.49 56.57 115.49L134 115.48Z";
const PATH_E_ACENTO =
  "M122.35 0.359985C98.1802 1.02999 77.8102 16.89 70.4502 38.73H179.01C203.18 38.06 223.55 22.2 230.91 0.359985H122.35Z";

// --- sportes ---
const PATH_S1 = "M303.07 95.5501H246.61C241.66 95.5501 237.47 91.3701 237.47 86.4101C237.47 81.4501 241.66 77.27 246.61 77.27H301.18C324.81 77.16 344.71 60.94 350.44 39.05H246.61C220.5 39.05 199.26 60.3001 199.26 86.4101C199.26 112.52 220.5 133.77 246.62 133.77H303.08C308.03 133.77 312.22 137.96 312.22 142.91C312.22 147.86 308.04 152.05 303.08 152.05L245.03 152.19C222.94 153.79 204.7 169.46 199.26 190.26H303.08C329.19 190.26 350.43 169.02 350.43 142.9C350.43 116.78 329.19 95.5401 303.07 95.5401";
const PATH_P = "M492.62 61.37C478.28 47.03 459.31 39.14 439.21 39.14H363.67V247.93C385.72 242.16 402.04 222.07 402.04 198.23V190.43H439.2C459.3 190.43 478.27 182.53 492.61 168.2C506.95 153.86 514.84 134.9 514.84 114.79C514.84 94.68 506.94 75.72 492.61 61.38M465.48 141.05C458.39 148.14 449.06 152.04 439.21 152.04H402.05V77.5H439.21C449.06 77.5 458.39 81.4 465.48 88.49C472.57 95.58 476.47 104.91 476.47 114.76C476.47 124.61 472.57 133.95 465.48 141.04";
const PATH_O1 = "M603.93 192.13C593.49 192.13 583.349 190.08 573.789 186.04C564.569 182.14 556.29 176.56 549.19 169.46C542.09 162.36 536.509 154.08 532.609 144.86C528.569 135.3 526.52 125.16 526.52 114.72C526.52 104.28 528.569 94.1401 532.609 84.5801C536.509 75.3601 542.09 67.0801 549.19 59.9801C556.29 52.8801 564.569 47.3001 573.789 43.4001C583.349 39.3601 593.49 37.3101 603.93 37.3101C614.37 37.3101 624.51 39.3601 634.07 43.4001C643.29 47.3001 651.569 52.8801 658.669 59.9801C665.77 67.0801 671.35 75.3601 675.25 84.5801C679.29 94.1401 681.34 104.28 681.34 114.72C681.34 125.16 679.29 135.3 675.25 144.86C671.35 154.08 665.77 162.36 658.669 169.46C651.569 176.56 643.29 182.14 634.07 186.04C624.51 190.08 614.37 192.13 603.93 192.13ZM603.93 77.5101C583.41 77.5101 566.719 94.2001 566.719 114.72C566.719 135.24 583.41 151.93 603.93 151.93C624.45 151.93 641.14 135.24 641.14 114.72C641.14 94.2001 624.45 77.5101 603.93 77.5101Z";
const PATH_R1 = "M768.35 38.73V38.83C748.24 38.83 729.28 46.73 714.94 61.06C700.74 75.26 692.87 94 692.72 113.89H692.7V190.24H731.07V114.47C731.07 104.62 734.97 95.28 742.06 88.19C749.15 81.1 758.48 77.2 768.34 77.2L786.12 77.1V38.73H768.34H768.35Z";
const PATH_T1 = "M850.62 151.74C843.58 151.74 837.63 145.79 837.63 138.75V77.11H850.62V77.06C874.44 77.06 894.52 60.76 900.3 38.73H837.6V0C816.05 5.66 800 25 799.31 48.13H799.25V138.75C799.25 167.07 822.29 190.11 850.61 190.11C850.91 190.11 900.32 190.01 900.32 190.01C894.57 167.93 874.46 151.74 850.61 151.74";
const PATH_E1 = "M992.63 151.98V151.93H966.72C956.87 151.93 947.54 148.03 940.44 140.94C938.27 138.77 936.4 136.39 934.85 133.85H994.89C1021.04 133.85 1042.31 112.58 1042.31 86.43C1042.31 60.28 1021.04 39.01 994.89 39.01V38.97H965.9V39.04C946.1 39.25 927.45 47.11 913.31 61.25C898.97 75.59 891.08 94.55 891.08 114.66C891.08 134.77 898.98 153.73 913.31 168.07C926.86 181.63 944.56 189.41 963.44 190.22V190.3H992.62H1042.3C1036.51 168.27 1016.43 151.97 992.62 151.97M940.45 88.39C947.54 81.3 956.87 77.4 966.73 77.4V77.35H994.9V77.39C999.8 77.39 1003.94 81.53 1003.94 86.44C1003.94 91.35 999.8 95.48 994.9 95.48H934.86C936.41 92.94 938.28 90.56 940.45 88.39Z";
const PATH_S2 = "M1160.86 95.5501H1104.4C1099.45 95.5501 1095.26 91.3701 1095.26 86.4101C1095.26 81.4501 1099.45 77.27 1104.4 77.27H1158.97C1182.6 77.16 1202.5 60.94 1208.23 39.05H1104.41C1078.3 39.05 1057.06 60.3001 1057.06 86.4101C1057.06 112.52 1078.3 133.77 1104.42 133.77H1160.88C1165.83 133.77 1170.02 137.96 1170.02 142.91C1170.02 147.86 1165.84 152.05 1160.88 152.05L1102.83 152.19C1080.74 153.79 1062.5 169.46 1057.06 190.26H1160.88C1186.99 190.26 1208.23 169.02 1208.23 142.9C1208.23 116.78 1186.99 95.5401 1160.87 95.5401";

// --- da Sorte ---
const PATH_D = "M184.03 265.04H145.86C125.78 265.05 106.83 272.95 92.4995 287.27C78.1595 301.61 70.2695 320.57 70.2695 340.68C70.2695 360.79 78.1695 379.75 92.4995 394.09C106.83 408.42 125.77 416.31 145.86 416.32H221.2V226.42C202.67 231.27 188.19 246.23 184.04 265.03M145.91 377.95C136.06 377.95 126.73 374.05 119.63 366.96C112.54 359.87 108.63 350.54 108.63 340.68C108.63 330.82 112.53 321.49 119.63 314.4C126.72 307.31 136.05 303.41 145.91 303.41H182.82V377.95H145.91Z";
const PATH_A = "M338.11 265.12H234.41C240.19 287.15 260.27 303.45 284.09 303.45V303.5H338.11C343.01 303.5 347.15 307.64 347.15 312.54C347.15 317.44 343.01 321.58 338.11 321.58H281.76C255.61 321.58 234.34 342.85 234.34 369C234.34 395.15 255.61 416.42 281.76 416.42V416.46L366.33 416.42H385.52V312.54C385.52 286.39 364.25 265.13 338.11 265.13M347.15 378.08H281.76V378.04C276.86 378.04 272.72 373.9 272.72 368.99C272.72 364.08 276.86 359.95 281.76 359.95H347.15V378.08Z";
const PATH_S_UPPER = "M555.35 302.16L482.06 302.14C472.07 302.14 463.63 293.7 463.63 283.71C463.63 273.72 472.07 265.28 482.06 265.28H565.24C588.86 265.28 608.66 248.61 613.51 226.42H482.07C450.48 226.42 424.78 252.12 424.78 283.71C424.78 315.3 450.48 341 482.07 341H555.01C565 341.01 573.44 349.45 573.44 359.44C573.44 369.43 565 377.87 555.01 377.87H473.03C449.41 377.87 429.61 394.54 424.76 416.73H555.01C586.6 416.73 612.3 391.03 612.3 359.44C612.3 327.85 586.79 302.35 555.37 302.16";
const PATH_O2 = "M699.4 418.08C688.96 418.08 678.82 416.03 669.26 411.99C660.04 408.09 651.76 402.51 644.66 395.41C637.56 388.31 631.98 380.03 628.08 370.81C624.04 361.25 621.99 351.11 621.99 340.67C621.99 330.23 624.04 320.09 628.08 310.53C631.98 301.31 637.56 293.03 644.66 285.93C651.76 278.83 660.04 273.25 669.26 269.35C678.82 265.31 688.96 263.26 699.4 263.26C709.84 263.26 719.98 265.31 729.54 269.35C738.76 273.25 747.04 278.83 754.14 285.93C761.24 293.03 766.82 301.31 770.72 310.53C774.76 320.09 776.81 330.23 776.81 340.67C776.81 351.11 774.76 361.25 770.72 370.81C766.82 380.03 761.24 388.31 754.14 395.41C747.04 402.51 738.76 408.09 729.54 411.99C719.98 416.03 709.84 418.08 699.4 418.08ZM699.4 303.45C678.88 303.45 662.19 320.14 662.19 340.66C662.19 361.18 678.88 377.87 699.4 377.87C719.92 377.87 736.61 361.18 736.61 340.66C736.61 320.14 719.92 303.45 699.4 303.45Z";
const PATH_R2 = "M863.81 265V265.1C843.7 265.1 824.74 273 810.4 287.33C796.2 301.53 788.33 320.27 788.18 340.16H788.17V416.51H826.54V340.74C826.54 330.89 830.44 321.55 837.53 314.46C844.62 307.37 853.95 303.47 863.81 303.47V303.37H881.59V265H863.81Z";
const PATH_T2 = "M946.08 378.1C939.04 378.1 933.09 372.15 933.09 365.11V303.47H946.08V303.42C969.9 303.42 989.98 287.12 995.76 265.09H933.06V226.36C911.51 232.02 895.46 251.36 894.77 274.49H894.71V365.11C894.71 393.43 917.75 416.47 946.07 416.47C946.37 416.47 946.66 416.5 946.96 416.52L995.78 416.37C990.03 394.29 969.92 378.1 946.07 378.1";
const PATH_E2 = "M1088.09 378.19V378.14H1062.18C1052.33 378.14 1042.99 374.23 1035.9 367.14C1033.73 364.97 1031.86 362.59 1030.31 360.05H1090.35C1116.5 360.05 1137.77 338.78 1137.77 312.63C1137.77 286.48 1116.5 265.21 1090.35 265.21V265.17H1061.36V265.24C1041.56 265.45 1022.91 273.31 1008.77 287.45C994.43 301.79 986.54 320.76 986.54 340.86C986.54 360.96 994.44 379.93 1008.77 394.27C1022.32 407.83 1040.02 415.61 1058.9 416.42V416.5H1088.08H1137.76C1131.97 394.47 1111.9 378.17 1088.08 378.17M1035.91 314.6C1043 307.51 1052.33 303.61 1062.19 303.61V303.56H1090.36V303.6C1095.26 303.6 1099.4 307.74 1099.4 312.64C1099.4 317.54 1095.26 321.68 1090.36 321.68H1030.32C1031.87 319.14 1033.74 316.76 1035.91 314.59";

// --- ÍCONE (Lottie) ---
const LOTTIE_SOURCE = require("../../assets/images/icon-e-animated.json");

const CONFETTI_COLORS = ["#37E67D", "#0f0", "#fff", "#5BF0A0", "#1A5CC8", "#2AF598", "#00FF88", "#FFD700", "#FF6B6B"];
const DUR = 4800;

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
  logoOpacity: number;
  logoTx: number;
  logoTy: number;
  clipBotW: number;
  clipTopW: number;
  eOpacity: number;
  iconOpacity: number;
  iconScale: number;
  iconTx: number;
  iconTy: number;
}

interface AnimatedSplashProps {
  onFinish: () => void;
  onReady?: () => void;
}

// Easing functions
const eoe = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const eio = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const eob = (t: number) => { const c = 2.2; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };

export default function AnimatedSplash({ onFinish, onReady }: AnimatedSplashProps) {
  const SVG_WIDTH = SCREEN_W * 0.85;
  const SVG_HEIGHT = SVG_WIDTH * (419 / 1209);
  const scaleX = SVG_WIDTH / 340;
  const scaleY = SVG_HEIGHT / 118;

  // Lottie size — 65% da largura da tela
  const LOTTIE_W = SCREEN_W * 0.65;
  const LOTTIE_H = LOTTIE_W * (1536 / 1024);

  // Where the É center ends up after the move phase (relative to screen center)
  // É center in viewBox: ~(115, 95). After move of (137*scaleX, 32*scaleY),
  // the É center in screen = wrapper_center + É_offset_from_wrapper_center + move
  const E_CENTER_IN_SVG_X = (115 / 1209) * SVG_WIDTH - SVG_WIDTH / 2;
  const E_CENTER_IN_SVG_Y = (95 / 419) * SVG_HEIGHT - SVG_HEIGHT / 2;
  const MOVE_FINAL_X = 137 * scaleX;
  const MOVE_FINAL_Y = 32 * scaleY;
  // Final É position offset from screen center:
  const E_FINAL_X = E_CENTER_IN_SVG_X + MOVE_FINAL_X;
  const E_FINAL_Y = E_CENTER_IN_SVG_Y + MOVE_FINAL_Y;

  const [anim, setAnim] = useState<AnimState>({
    logoOpacity: 0, logoTx: 250, logoTy: 0,
    clipBotW: 1209, clipTopW: 1209,
    eOpacity: 1, iconOpacity: 0, iconScale: 0.5,
    iconTx: E_FINAL_X, iconTy: E_FINAL_Y,
  });
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const confettiRef = useRef<ConfettiPiece[]>([]);
  const confettiIdRef = useRef(0);
  const burstRef = useRef(false);
  const lottieStartedRef = useRef(false);
  const startRef = useRef(0);
  const frameRef = useRef(0);
  const lottieRef = useRef<LottieView>(null);

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
        rotV: (3 + Math.random() * 8) * (Math.random() > 0.5 ? 1 : -1),
        wobble: Math.random() * Math.PI * 2,
        wobbleV: 0.05 + Math.random() * 0.1,
      });
    }
  };

  useEffect(() => {
    startRef.current = Date.now();
    burstRef.current = false;
    // Hide native splash as soon as animated splash is mounted
    onReady?.();

    const tick = () => {
      const el = Date.now() - startRef.current;
      const t = Math.min(el / DUR, 1);
      let s: typeof anim;

      const base = { iconTx: 0, iconTy: 0 };

      if (t <= 0.06) {
        // Phase 1: Logo enters from right
        const p = eoe(t / 0.06);
        s = { ...base, logoOpacity: p, logoTx: (1 - p) * 250, logoTy: 0, clipBotW: 1209, clipTopW: 1209, eOpacity: 1, iconOpacity: 0, iconScale: 0.5, iconTx: E_FINAL_X, iconTy: E_FINAL_Y };
      } else if (t <= 0.18) {
        // Phase 2: Hold
        s = { ...base, logoOpacity: 1, logoTx: 0, logoTy: 0, clipBotW: 1209, clipTopW: 1209, eOpacity: 1, iconOpacity: 0, iconScale: 0.5, iconTx: E_FINAL_X, iconTy: E_FINAL_Y };
      } else if (t <= 0.32) {
        // Phase 3: Mask bottom row ("da Sorte")
        const p = eio((t - 0.18) / 0.14);
        s = { ...base, logoOpacity: 1, logoTx: 0, logoTy: 0, clipBotW: 1209 * (1 - p), clipTopW: 1209, eOpacity: 1, iconOpacity: 0, iconScale: 0.5, iconTx: E_FINAL_X, iconTy: E_FINAL_Y };
      } else if (t <= 0.50) {
        // Phase 4: Mask top row ("sportes")
        const p = eio((t - 0.32) / 0.18);
        s = { ...base, logoOpacity: 1, logoTx: 0, logoTy: 0, clipBotW: 0, clipTopW: 1209 * (1 - p), eOpacity: 1, iconOpacity: 0, iconScale: 0.5, iconTx: E_FINAL_X, iconTy: E_FINAL_Y };
      } else if (t <= 0.62) {
        // Phase 5: É moves to center
        const p = eio((t - 0.50) / 0.12);
        s = { ...base, logoOpacity: 1, logoTx: p * MOVE_FINAL_X, logoTy: p * MOVE_FINAL_Y, clipBotW: 0, clipTopW: 0, eOpacity: 1, iconOpacity: 0, iconScale: 0.5, iconTx: E_FINAL_X, iconTy: E_FINAL_Y };
      } else if (t <= 0.74) {
        // Phase 6: Crossfade É → Lottie (longer, smoother)
        // Start Lottie from stable frame (skips entry animation)
        if (!lottieStartedRef.current) {
          lottieStartedRef.current = true;
          lottieRef.current?.play(75, 320);
        }
        // Icon starts at É position and slides to center while fading in
        const p = eio((t - 0.62) / 0.12);
        // É disappears 2x faster than the Lottie appears
        const eFade = Math.min(p * 2, 1);
        s = {
          ...base,
          logoOpacity: 1 - eFade,
          logoTx: MOVE_FINAL_X,
          logoTy: MOVE_FINAL_Y,
          clipBotW: 0, clipTopW: 0,
          eOpacity: 1 - eFade,
          iconOpacity: p,
          iconScale: 0.5 + p * 0.5,
          // Slide from É position to center
          iconTx: E_FINAL_X * (1 - p),
          iconTy: E_FINAL_Y * (1 - p),
        };
      } else if (t <= 0.87) {
        // Phase 7: Bounce + confetti
        const p = eob((t - 0.74) / 0.13);
        s = { ...base, logoOpacity: 0, logoTx: MOVE_FINAL_X, logoTy: MOVE_FINAL_Y, clipBotW: 0, clipTopW: 0, eOpacity: 0, iconOpacity: 1, iconScale: 0.9 + p * 0.1, iconTx: 0, iconTy: 0 };
        if (!burstRef.current && p > 0.4) {
          burstRef.current = true;
          spawnConfetti(SCREEN_W / 2, SCREEN_H / 2, 25);
        }
      } else {
        // Phase 8: Static
        s = { ...base, logoOpacity: 0, logoTx: 0, logoTy: 0, clipBotW: 0, clipTopW: 0, eOpacity: 0, iconOpacity: 1, iconScale: 1, iconTx: 0, iconTy: 0 };
      }

      // Update confetti (matching HTML: wobble lateral + rotation + gravity)
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

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
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

      {/* Logo SVG */}
      <View
        style={[
          styles.logoWrap,
          {
            width: SVG_WIDTH,
            height: SVG_HEIGHT,
            opacity: anim.logoOpacity,
            transform: [
              { translateX: anim.logoTx },
              { translateY: anim.logoTy },
            ],
          },
        ]}
      >
        <Svg width={SVG_WIDTH} height={SVG_HEIGHT} viewBox="0 0 1209 419" fill="none">
          <Defs>
            <ClipPath id="clipBot">
              <Rect x="0" y="226" width={String(anim.clipBotW)} height="193" />
            </ClipPath>
            <ClipPath id="clipTop">
              <Rect x="0" y="0" width={String(anim.clipTopW)} height="248" />
            </ClipPath>
          </Defs>

          {/* É */}
          <G opacity={anim.eOpacity}>
            <Path d={PATH_E_CORPO} fill="white" />
            <Path d={PATH_E_ACENTO} fill="white" />
          </G>

          {/* sportes - clipped */}
          <G clipPath="url(#clipTop)">
            <Path d={PATH_S1} fill="white" />
            <Path d={PATH_P} fill="white" />
            <Path d={PATH_O1} fill="white" />
            <Path d={PATH_R1} fill="white" />
            <Path d={PATH_T1} fill="white" />
            <Path d={PATH_E1} fill="white" />
            <Path d={PATH_S2} fill="white" />
          </G>

          {/* da Sorte - clipped */}
          <G clipPath="url(#clipBot)">
            <Path d={PATH_D} fill="white" />
            <Path d={PATH_A} fill="white" />
            <Path d={PATH_S_UPPER} fill="white" />
            <Path d={PATH_O2} fill="white" />
            <Path d={PATH_R2} fill="white" />
            <Path d={PATH_T2} fill="white" />
            <Path d={PATH_E2} fill="white" />
          </G>
        </Svg>
      </View>

      {/* Icon (Lottie) */}
      <View
        style={[
          styles.iconWrap,
          {
            width: LOTTIE_W,
            height: LOTTIE_H,
            opacity: anim.iconOpacity,
            transform: [
              { translateX: anim.iconTx },
              { translateY: anim.iconTy },
              { scale: anim.iconScale },
            ],
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
  logoWrap: {
    position: "absolute",
  },
  iconWrap: {
    position: "absolute",
  },
});
