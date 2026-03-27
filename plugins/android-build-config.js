const { withGradleProperties } = require("expo/config-plugins");

/**
 * Config plugin que ajusta gradle.properties para evitar
 * crash de "out of memory" do clang++ ao compilar libs nativas
 * pesadas como @shopify/react-native-skia.
 *
 * Sobrevive a `npx expo prebuild --clean`.
 *
 * Em dev local (padrao): compila apenas arm64-v8a com 4GB heap.
 * No EAS Build (CI): compila todas as arquiteturas.
 */
function withAndroidBuildConfig(config) {
  return withGradleProperties(config, (config) => {
    const props = config.modResults;

    const isEAS = !!process.env.EAS_BUILD;

    // 1. Aumentar JVM heap para 4GB
    setGradleProperty(props, "org.gradle.jvmargs", "-Xmx4096m -XX:MaxMetaspaceSize=512m");

    // 2. Arquiteturas: todas no CI, apenas arm64 no dev local
    if (isEAS) {
      setGradleProperty(props, "reactNativeArchitectures", "armeabi-v7a,arm64-v8a,x86,x86_64");
    } else {
      setGradleProperty(props, "reactNativeArchitectures", "arm64-v8a");
    }

    return config;
  });
}

function setGradleProperty(props, key, value) {
  const existing = props.findIndex(
    (item) => item.type === "property" && item.key === key
  );

  if (existing >= 0) {
    props[existing].value = value;
  } else {
    props.push({ type: "property", key, value });
  }
}

module.exports = withAndroidBuildConfig;
