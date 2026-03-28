const { withDangerousMod, withMainApplication } = require("expo/config-plugins");
const path = require("path");
const fs = require("fs");

function withNotificationBanner(config) {
  config = withDangerousMod(config, [
    "android",
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;

      const bannerSrc = path.join(projectRoot, "assets", "banner.jpeg");
      const drawableDir = path.join(
        projectRoot, "android", "app", "src", "main", "res", "drawable"
      );
      const bannerDest = path.join(drawableDir, "notification_banner.jpeg");

      if (!fs.existsSync(drawableDir)) {
        fs.mkdirSync(drawableDir, { recursive: true });
      }
      if (fs.existsSync(bannerSrc)) {
        fs.copyFileSync(bannerSrc, bannerDest);
      }

      const kotlinSrcDir = path.join(
        projectRoot, "plugins", "notification-banner", "android"
      );
      const kotlinDestDir = path.join(
        projectRoot, "android", "app", "src", "main", "java",
        "com", "brcneto", "edscript"
      );

      const files = [
        "BannerNotificationModule.kt",
        "BannerNotificationPackage.kt",
      ];

      for (const file of files) {
        const src = path.join(kotlinSrcDir, file);
        const dest = path.join(kotlinDestDir, file);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
        }
      }

      return config;
    },
  ]);

  config = withMainApplication(config, (config) => {
    let contents = config.modResults.contents;

    if (!contents.includes("BannerNotificationPackage")) {
      contents = contents.replace(
        "PackageList(this).packages.apply {",
        `PackageList(this).packages.apply {
          add(BannerNotificationPackage())`
      );
    }

    config.modResults.contents = contents;
    return config;
  });

  return config;
}

module.exports = withNotificationBanner;
