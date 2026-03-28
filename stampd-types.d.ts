export {};

declare global {
  namespace StyledSystem {
    interface Theme {
    spacing: {
      p1: 4;
      p2: 8;
      p3: 12;
      p4: 16;
      p5: 20;
      p6: 24;
      p8: 32;
      m1: 4;
      m2: 8;
      m3: 12;
      m4: 16;
      m5: 20;
      m6: 24;
      m8: 32;
      gap1: 4;
      gap2: 8;
      gap3: 12;
      gap4: 16;
      gap5: 20;
      gap6: 24;
      gap8: 32;
    };
    radius: {
      roundedSm: 2;
      rounded: 4;
      roundedMd: 8;
      roundedLg: 12;
      roundedXl: 16;
      roundedFull: 9999;
    };
    size: {
      s1: 4;
      s2: 8;
      s3: 12;
      s4: 16;
      s5: 20;
      s6: 24;
      s7: 28;
      s8: 32;
      s10: 40;
      s12: 48;
      s14: 56;
      s16: 64;
      s20: 80;
      s24: 96;
      s28: 112;
      s32: 128;
    };
    fonts: {
      default: {
        size: 14;
        family: "Inter_400Regular";
      };
      sizes: {
        xs: 10;
        sm: 12;
        base: 14;
        md: 16;
        lg: 18;
        xl: 20;
        xl2: 24;
        xl3: 32;
      };
      family: {
        regular: "Inter_400Regular";
        medium: "Inter_500Medium";
        semibold: "Inter_600SemiBold";
        bold: "Inter_700Bold";
      };
    };
    colors: {
      primary: "#023697";
      onPrimary: "black";
      secondary: "#625B71";
      onSecondary: "#FFFFFF";
      background: "#dddddd";
      onBackground: "#FFFFFF";
      bgNav: "#02003D";
      bgCard: "#0A0F2E";
      bgSecondary: "#101828";
      accent: "#38E67D";
      accentText: "#37E67D";
      textPrimary: "#FFFFFF";
      textSecondary: "#F0F0F0";
      textMuted: "#A0A0B0";
      textInactive: "#6B6B8A";
      live: "#FF3B3B";
      success: "#22C55E";
      label: "#fff";
      inputText: "#000000";
      inputPlaceholder: "#a0a0a0";
      inputIcon: "#7D5260";
      inputBackground: "#f5c542";
      inputPrimary: "#4245d0";
      inputSercundary: "#ae3c91";
      surface: "#FFFBFE";
      onSurface: "#1C1B1F";
      error: "#B3261E";
      onError: "#FFFFFF";
    };
  }
  }
}
