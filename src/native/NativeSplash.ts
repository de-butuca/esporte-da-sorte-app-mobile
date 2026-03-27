import { NativeModules, Platform, findNodeHandle } from "react-native";

const NativeSplashModule =
  NativeModules.NativeSplashModule ?? null;

export function hideNativeSplash() {
  try {
    if (NativeSplashModule?.hide) {
      NativeSplashModule.hide();
    } else {
      console.warn("[NativeSplash] Module not available, splash may not hide natively");
    }
  } catch (e) {
    console.warn("[NativeSplash] Error hiding:", e);
  }
}

export function getNativeAnimationStartTime(): number {
  return NativeSplashModule?.getAnimationStartTime() ?? 0;
}
