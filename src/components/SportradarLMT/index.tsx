import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const SR_TOKEN = "7b6af8136bd66719bdff2667482b19ce";

interface SportradarLMTProps {
  matchId: string;
  height?: number;
  backgroundColor?: string;
}

export function SportradarLMT({
  matchId,
  height = 300,
  backgroundColor = "#1B7A2E",
}: SportradarLMTProps) {
  const widgetHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <script type="application/javascript"
          src="https://widgets.sir.sportradar.com/${SR_TOKEN}/widgetloader"
          data-sr-language="pt">
        </script>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: ${backgroundColor}; overflow: hidden; }
          .sr-widget { width: 100%; }
        </style>
      </head>
      <body>
        <div
          class="sr-widget"
          data-sr-widget="match.lmtplus"
          data-sr-match-id="${matchId}"
          data-sr-input-props='{"layout":"single","scoreboard":"disable"}'>
        </div>
      </body>
    </html>
  `;

  return (
    <View style={[styles.container, { height }]}>
      <WebView
        source={{ html: widgetHtml }}
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled={false}
        style={styles.webview}
        originWhitelist={["*"]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
  },
  webview: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
