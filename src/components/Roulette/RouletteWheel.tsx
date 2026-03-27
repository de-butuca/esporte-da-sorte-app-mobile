import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  Canvas,
  Path as SkiaPath,
  Circle,
  Shadow,
  Group,
  BlurMask,
} from "@shopify/react-native-skia";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
  cancelAnimation,
} from "react-native-reanimated";
import { Svg, Path } from "react-native-svg";
import type { RouletteItem } from "./index";

const WHEEL_IMAGE = require("@assets/images/roleta-wheel.jpeg");

interface Props {
  items: RouletteItem[];
  size: number;
  spinning: boolean;
  onFinish: (item: RouletteItem) => void;
}

function CenterLogo({ size }: { size: number }) {
  const logoSize = size * 0.22;
  return (
    <View style={[styles.centerLogo, { width: logoSize, height: logoSize, borderRadius: logoSize / 2 }]}>
      <View style={[styles.centerLogoInner, { width: logoSize - 8, height: logoSize - 8, borderRadius: (logoSize - 8) / 2 }]}>
        <Svg width={logoSize * 0.6} height={logoSize * 0.5} viewBox="0 0 425 350" fill="none">
          <Path
            d="M246.47 211.75C290.92 210.52 328.39 181.35 341.94 141.17H103.57V141.2C46.42 141.46 0 188.03 0 245.24C0 302.45 46.27 348.87 103.3 349.28V349.3H341.94C328.4 309.12 290.93 279.94 246.47 278.72H104.06C85.91 278.72 70.59 263.39 70.59 245.24C70.59 227.09 85.92 211.77 104.06 211.77V211.75H246.48H246.47Z"
            fill="#FFFFFF"
          />
          <Path
            d="M225.04 0C180.59 1.23 143.12 30.4 129.57 70.58H329.24C373.69 69.35 411.16 40.18 424.71 0H225.04Z"
            fill="#FFFFFF"
          />
        </Svg>
      </View>
    </View>
  );
}

// Os setores na imagem vão no sentido ANTI-HORÁRIO a partir do topo.
const IMAGE_OFFSET_RAD = (270 * Math.PI) / 180;

// Padding extra ao redor do Canvas para que o blur/glow não seja cortado
const CANVAS_PAD = 60;

export function RouletteWheel({ items, size, spinning, onFinish }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 8;
  const sliceAngle = (Math.PI * 2) / items.length;

  const rotation = useSharedValue(0);
  const targetIndexRef = useRef(0);

  const reportResult = useCallback(() => {
    if (__DEV__) console.log(`[ROULETTE] targetIndex=${targetIndexRef.current}, prize="${items[targetIndexRef.current]?.label}"`);
    onFinish(items[targetIndexRef.current]);
  }, [items, onFinish]);

  useEffect(() => {
    if (!spinning) return;

    // Só caem: 10 giros Genie's (0), 15 giros Macaco (4), 3 giros Genie's (6)
    const possibleIndexes = [0, 4, 6];
    const targetIndex = possibleIndexes[Math.floor(Math.random() * possibleIndexes.length)];
    targetIndexRef.current = targetIndex;

    const fullSpins = (7 + Math.floor(Math.random() * 4)) * Math.PI * 2;
    const sectorCenter = IMAGE_OFFSET_RAD - targetIndex * sliceAngle;
    const finalAngle = -(fullSpins + sectorCenter);

    rotation.value = withTiming(
      finalAngle,
      { duration: 5000, easing: Easing.out(Easing.cubic) },
      () => {
        runOnJS(reportResult)();
      }
    );

    return () => {
      cancelAnimation(rotation);
    };
  }, [spinning, sliceAngle, rotation, reportResult]);

  const wheelAnimStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}rad` }],
  }));

  // Canvas expandido para glow não ser cortado
  const canvasSize = size + CANVAS_PAD * 2;
  const ccx = canvasSize / 2; // centro no canvas expandido
  const ccy = canvasSize / 2;

  // Luzes ao redor — com glow real
  const lightCount = 24;
  const lightRingR = radius + 2;
  const lights = useMemo(
    () =>
      Array.from({ length: lightCount }, (_, i) => {
        const angle = (i / lightCount) * Math.PI * 2 - Math.PI / 2;
        const isGold = i % 3 === 0;
        const isGreen = i % 3 === 1;
        return {
          x: ccx + Math.cos(angle) * lightRingR,
          y: ccy + Math.sin(angle) * lightRingR,
          color: isGold ? "#FFD700" : isGreen ? "#37E67D" : "#00BFFF",
          glowColor: isGold
            ? "rgba(255,215,0,0.6)"
            : isGreen
            ? "rgba(55,230,125,0.6)"
            : "rgba(0,191,255,0.6)",
        };
      }),
    [ccx, ccy, lightRingR]
  );

  // Pointer — estilo original
  const goldR = size * 0.12;
  const innerR = goldR - 4;
  const tipY = cy - goldR - 18;
  const baseHalf = 10;
  const pointerPath = `M${cx} ${tipY} L${cx + baseHalf} ${cy - goldR + 4} A${goldR} ${goldR} 0 1 1 ${cx - baseHalf} ${cy - goldR + 4} Z`;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Glow halo + luzes — canvas expandido para não cortar o blur */}
      <Canvas
        style={{
          position: "absolute",
          width: canvasSize,
          height: canvasSize,
          left: -CANVAS_PAD,
          top: -CANVAS_PAD,
        }}
        pointerEvents="none"
      >
        {/* Radial burst — raios de luz saindo do centro */}
        {Array.from({ length: 16 }, (_, i) => {
          const angle = (i / 16) * Math.PI * 2 - Math.PI / 2;
          const halfSpread = Math.PI / 32; // largura de cada raio
          const burstR = radius + CANVAS_PAD - 4; // até a borda do canvas
          const x1 = ccx + Math.cos(angle - halfSpread) * burstR;
          const y1 = ccy + Math.sin(angle - halfSpread) * burstR;
          const x2 = ccx + Math.cos(angle + halfSpread) * burstR;
          const y2 = ccy + Math.sin(angle + halfSpread) * burstR;
          const rayPath = `M${ccx} ${ccy} L${x1} ${y1} L${x2} ${y2} Z`;
          const color = i % 2 === 0 ? "rgba(55,230,125,0.12)" : "rgba(255,215,0,0.10)";
          return (
            <SkiaPath key={`ray-${i}`} path={rayPath} color={color}>
              <BlurMask blur={6} style="normal" />
            </SkiaPath>
          );
        })}

        {/* Halo de luz atrás */}
        <Circle cx={ccx} cy={ccy} r={radius + 30} color="rgba(55,230,125,0.06)">
          <BlurMask blur={30} style="normal" />
        </Circle>
        <Circle cx={ccx} cy={ccy} r={radius + 15} color="rgba(0,191,255,0.04)">
          <BlurMask blur={20} style="normal" />
        </Circle>

        {/* Anel externo escuro */}
        <Circle cx={ccx} cy={ccy} r={radius + 4} color="#080c20" />
        <Circle cx={ccx} cy={ccy} r={radius + 1} color="#0d1230" />

        {/* Luzes com glow */}
        {lights.map((l, i) => (
          <Group key={i}>
            <Circle cx={l.x} cy={l.y} r={8} color={l.glowColor}>
              <BlurMask blur={8} style="normal" />
            </Circle>
            <Circle cx={l.x} cy={l.y} r={2.5} color={l.color}>
              <Shadow dx={0} dy={0} blur={4} color={l.color} />
            </Circle>
          </Group>
        ))}
      </Canvas>

      {/* Imagem da roleta girando */}
      <Animated.View
        style={[
          styles.wheelWrap,
          {
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius,
          },
          wheelAnimStyle,
        ]}
      >
        <Image
          source={WHEEL_IMAGE}
          style={{
            width: radius * 2.04,
            height: radius * 2.04,
            marginLeft: -radius * 0.02,
            marginTop: -radius * 0.02,
          }}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Ponteiro + centro dourado */}
      <Canvas style={[StyleSheet.absoluteFill, { width: size, height: size }]} pointerEvents="none">
        <SkiaPath path={pointerPath} color="#FFD700">
          <Shadow dx={0} dy={2} blur={6} color="rgba(0,0,0,0.4)" />
        </SkiaPath>
        <SkiaPath
          path={`M${cx} ${tipY + 3} L${cx + 4} ${cy - goldR + 5} L${cx - 1} ${cy - goldR + 6} Z`}
          color="#FFF3B0"
          opacity={0.5}
        />
        <Circle cx={cx} cy={cy} r={goldR} color="#FFD700">
          <Shadow dx={0} dy={0} blur={8} color="rgba(255,215,0,0.5)" />
        </Circle>
        <Circle cx={cx} cy={cy} r={innerR} color="#0a1a4a" />
      </Canvas>

      {/* Logo central */}
      <CenterLogo size={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  wheelWrap: {
    position: "absolute",
    overflow: "hidden",
  },
  centerLogo: {
    position: "absolute",
    backgroundColor: "#FFD700",
    alignItems: "center",
    justifyContent: "center",
  },
  centerLogoInner: {
    backgroundColor: "#023697",
    alignItems: "center",
    justifyContent: "center",
  },
});
