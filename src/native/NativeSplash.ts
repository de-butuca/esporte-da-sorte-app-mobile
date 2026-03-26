import { NativeModules, Platform } from "react-native";

const { NativeSplashModule } = NativeModules;

export function hideNativeSplash() {
  NativeSplashModule?.hide();
}
