import { NativeModules } from "react-native";

const { NativeSplashModule } = NativeModules;

export function hideNativeSplash() {
  NativeSplashModule?.hide();
}

export function getNativeAnimationStartTime(): number {
  return NativeSplashModule?.getAnimationStartTime() ?? 0;
}
