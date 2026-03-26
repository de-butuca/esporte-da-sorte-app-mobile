import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import AnimatedSplash from "./AnimatedSplash";

// Impede a splash nativa de sumir automaticamente
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Aqui você carrega fonts, dados iniciais, etc.
        // Ex: await Font.loadAsync({ ... });
        // Ex: await fetchInitialData();

        // Simula carregamento
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      // Esconde a splash nativa (imagem estática)
      // A animada assume imediatamente
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  const handleSplashFinish = useCallback(() => {
    setSplashDone(true);
  }, []);

  if (!appReady) {
    return null; // Splash nativa ainda visível
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {splashDone ? (
        // ====================================
        // SEU APP PRINCIPAL AQUI
        // ====================================
        <View style={styles.app}>
          <Text style={styles.appText}>Seu app aqui!</Text>
        </View>
      ) : (
        // Splash animada
        <AnimatedSplash onFinish={handleSplashFinish} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    alignItems: "center",
    justifyContent: "center",
  },
  appText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
