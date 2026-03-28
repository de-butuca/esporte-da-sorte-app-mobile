import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { lightColors } from "@/stampd.config";

const SR_TOKEN = "7b6af8136bd66719bdff2667482b19ce";

interface SportradarLMTProps {
  matchId: string;
  height?: number;
  backgroundColor?: string;
}

export function SportradarLMT({
  matchId,
  height = 300,
  backgroundColor = lightColors.background,
}: SportradarLMTProps) {
  const widgetHtml = useMemo(() => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 100%; height: 100%; background: ${backgroundColor}; overflow: hidden; color: #FFFFFF; }
#sr-widget { width: 100%; height: 100%; }
#sr-widget, #sr-widget * { color: #FFFFFF !important; }
#sr-widget [class*="background"], #sr-widget [style*="background"] { background-color: ${backgroundColor} !important; }
#sr-widget [class*="pitch"], #sr-widget [class*="field"], #sr-widget svg rect[fill="#4CAF50"], #sr-widget svg rect[fill="#388E3C"], #sr-widget svg rect[fill="#43A047"] { fill: #1B5E20 !important; background-color: #1B5E20 !important; }
</style>
</head>
<body>
<div id="sr-widget"></div>
<script>
(function(a,b,c,d,e,f,g,h,i){
  a[e]||(i=a[e]=function(){(a[e].q=a[e].q||[]).push(arguments)},
  i.l=1*new Date,i.o=f,
  g=b.createElement(c),h=b.getElementsByTagName(c)[0],
  g.async=1,g.src=d,g.setAttribute("n",e),
  h.parentNode.insertBefore(g,h))
})(window,document,"script",
  "https://widgets.sir.sportradar.com/${SR_TOKEN}/widgetloader",
  "SIR", { language: "pt" });

SIR('addWidget', '#sr-widget', 'match.lmtPlus', {
  matchId: ${matchId},
  layout: "single",
  scoreboard: "disable",
  detailedScoreboard: "disable",
  branding: {
    tabs: {
      option: "iconText",
      iconPosition: "start",
      variant: "fullWidth"
    }
  }
});
</script>
</body>
</html>`, [matchId, backgroundColor]);

  const containerStyle = useMemo(
    () => [styles.container, { height }],
    [height],
  );

  const webviewStyle = useMemo(
    () => [styles.webview, { backgroundColor }],
    [backgroundColor],
  );

  return (
    <View style={containerStyle}>
      <WebView
        source={{ html: widgetHtml }}
        javaScriptEnabled
        domStorageEnabled
        originWhitelist={["*"]}
        mixedContentMode="always"
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        scrollEnabled={false}
        userAgent="Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        style={webviewStyle}
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
  },
});
