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
  backgroundColor = "#01003A",
}: SportradarLMTProps) {
  const widgetHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 100%; height: 100%; background: ${backgroundColor}; overflow: hidden; }
#sr-widget { width: 100%; height: 100%; }
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
</html>`;

  return (
    <View style={[styles.container, { height }]}>
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
        style={[styles.webview, { backgroundColor }]}
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
