import {
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { ReactNode } from "react";

export interface ParallaxHeaderProps {
  title: string;
  subtitle?: string;
  infoText?: string;
  coverImage: ImageSourcePropType;
  backgroundImage?: ImageSourcePropType;
  expandedHeight?: number;
  collapsedHeight?: number;
  navbarTitle?: string;
  children: ReactNode;
  headerBackgroundColor?: string;
  headerTextColor?: string;
  enableBlur?: boolean;
  blurIntensity?: number;
  blurTint?: "light" | "dark" | "default";
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  infoTextStyle?: StyleProp<TextStyle>;
  coverImageContainerStyle?: StyleProp<ViewStyle>;
  coverImageStyle?: StyleProp<ViewStyle>;
  actions?: {
    icon: ReactNode;
    onPress: () => void;
  }[];
  leftNavIcon?: ReactNode;
  rightNavIcon?: ReactNode;
  onLeftNavIconPress?: () => void;
  onRightNavIconPress?: () => void;
  bottomSpacing?: number;
  animationConfig?: {
    dampingRatio?: number;
    stiffness?: number;
    overshootClamping?: boolean;
    restDisplacementThreshold?: number;
    restSpeedThreshold?: number;
  };
  coverImageShadow?: {
    shadowColor?: string;
    shadowOffset?: { width: number; height: number };
    shadowOpacity?: number;
    shadowRadius?: number;
    elevation?: number;
  };
  enableFloatingCover?: boolean;
  coverScaleAmount?: number;
  collapsedBackgroundOpacity?: number;
  showGradientOverlay?: boolean;
  gradientColors?: [string, string, ...string[]];
  onScroll?: (position: number) => void;
  renderHeaderContent?: (animatedProps: {
    scrollY: any;
    titleOpacity: any;
    coverScale: any;
    coverTranslateY: any;
    headerHeight: any;
  }) => ReactNode;
}

export const DEFAULT_PARALLAX_HEADER_PROPS = {
  expandedHeight: 380,
  collapsedHeight: 90,
  headerBackgroundColor: "#000000",
  headerTextColor: "#FFFFFF",
  enableBlur: true,
  blurIntensity: 60,
  blurTint: "dark" as const,
  bottomSpacing: 0,
  enableFloatingCover: true,
  coverScaleAmount: 1.0,
  collapsedBackgroundOpacity: 1.0,
  showGradientOverlay: true,
  gradientColors: ["transparent", "rgba(0,0,0,0.7)"],
  animationConfig: {
    dampingRatio: 1,
    stiffness: 300,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
  coverImageShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 15,
  },
};
