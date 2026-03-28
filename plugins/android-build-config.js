const { withGradleProperties } = require("expo/config-plugins");

function withAndroidBuildConfig(config) {
  return withGradleProperties(config, (config) => {
    const props = config.modResults;

    const isEAS = !!process.env.EAS_BUILD;

    setGradleProperty(props, "org.gradle.jvmargs", "-Xmx4096m -XX:MaxMetaspaceSize=512m");

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
