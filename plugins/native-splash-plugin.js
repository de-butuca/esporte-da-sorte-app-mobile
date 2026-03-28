const {
  withXcodeProject,
  withAppDelegate,
  withMainActivity,
  withMainApplication,
  withDangerousMod,
} = require("expo/config-plugins");
const path = require("path");
const fs = require("fs");

function withNativeSplash(config) {
  config = withXcodeProject(config, async (config) => {
    const project = config.modResults;
    const projectRoot = config.modRequest.projectRoot;
    const platformRoot = config.modRequest.platformProjectRoot;
    const targetName = "EsportesdaSorte";
    const srcDir = path.join(projectRoot, "plugins", "native-splash", "ios");
    const destDir = path.join(platformRoot, targetName);

    const files = [
      "NativeSplashView.swift",
      "SVGPathParser.swift",
      "NativeSplashModule.swift",
      "NativeSplashModule.m",
    ];

    const mainGroupKey =
      project.getFirstProject().firstProject.mainGroup;
    const mainGroup = project.getPBXGroupByKey(mainGroupKey);
    let appGroupKey = null;
    for (const child of mainGroup.children) {
      if (child.comment === targetName) {
        appGroupKey = child.value;
        break;
      }
    }

    for (const file of files) {
      const src = path.join(srcDir, file);
      const dest = path.join(destDir, file);

      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
      }

      if (appGroupKey) {
        const filePath = path.join(targetName, file);
        const existing = Object.values(
          project.pbxFileReferenceSection()
        ).some((ref) => ref && ref.path === file);

        if (!existing) {
          project.addSourceFile(filePath, null, appGroupKey);
        }
      }
    }

    return config;
  });

  config = withAppDelegate(config, (config) => {
    let contents = config.modResults.contents;

    if (!contents.includes("NativeSplashView.show")) {
      contents = contents.replace(
        "return super.application(application, didFinishLaunchingWithOptions: launchOptions)",
        `let result = super.application(application, didFinishLaunchingWithOptions: launchOptions)

    DispatchQueue.main.async { [weak self] in
      if let window = self?.window {
        NativeSplashView.show(in: window)
      }
    }

    return result`
      );
    }

    config.modResults.contents = contents;
    return config;
  });

  config = withDangerousMod(config, [
    "android",
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const srcDir = path.join(
        projectRoot,
        "plugins",
        "native-splash",
        "android"
      );
      const destDir = path.join(
        projectRoot,
        "android",
        "app",
        "src",
        "main",
        "java",
        "com",
        "brcneto",
        "edscript"
      );

      const files = [
        "NativeSplashView.kt",
        "NativeSplashModule.kt",
        "NativeSplashPackage.kt",
      ];

      for (const file of files) {
        const src = path.join(srcDir, file);
        const dest = path.join(destDir, file);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
        }
      }

      const resDir = path.join(
        projectRoot, "android", "app", "src", "main", "res"
      );

      const bgDrawable = path.join(resDir, "drawable", "ic_launcher_background.xml");
      if (fs.existsSync(bgDrawable)) {
        fs.writeFileSync(bgDrawable,
          `<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
  <item android:drawable="@color/activityBackground"/>
</layer-list>
`);
      }

      const colorsPath = path.join(resDir, "values", "colors.xml");
      if (fs.existsSync(colorsPath)) {
        let colors = fs.readFileSync(colorsPath, "utf8");
        colors = colors.replace(
          /<color name="splashscreen_background">#[0-9A-Fa-f]+<\/color>/,
          '<color name="splashscreen_background">#023697</color>'
        );
        fs.writeFileSync(colorsPath, colors);
      }

      const nightColorsPath = path.join(resDir, "values-night", "colors.xml");
      if (fs.existsSync(nightColorsPath)) {
        let colors = fs.readFileSync(nightColorsPath, "utf8");
        colors = colors.replace(
          /<color name="splashscreen_background">#[0-9A-Fa-f]+<\/color>/,
          '<color name="splashscreen_background">#023697</color>'
        );
        fs.writeFileSync(nightColorsPath, colors);
      }

      return config;
    },
  ]);

  config = withMainActivity(config, (config) => {
    let contents = config.modResults.contents;

    if (!contents.includes("import android.widget.FrameLayout")) {
      contents = contents.replace(
        "import android.os.Bundle",
        `import android.os.Bundle
import android.view.ViewGroup
import android.widget.FrameLayout`
      );
    }

    if (!contents.includes("NativeSplashView")) {
      contents = contents.replace(
        "super.onCreate(null)",
        `super.onCreate(null)

    val splash = NativeSplashView(this)
    splash.layoutParams = FrameLayout.LayoutParams(
      ViewGroup.LayoutParams.MATCH_PARENT,
      ViewGroup.LayoutParams.MATCH_PARENT
    )
    addContentView(splash, splash.layoutParams)
    NativeSplashView.instance = splash
    splash.startAnimation()`
      );
    }

    config.modResults.contents = contents;
    return config;
  });

  config = withMainApplication(config, (config) => {
    let contents = config.modResults.contents;

    if (!contents.includes("NativeSplashPackage")) {
      contents = contents.replace(
        "PackageList(this).packages.apply {",
        `PackageList(this).packages.apply {
          add(NativeSplashPackage())`
      );
    }

    config.modResults.contents = contents;
    return config;
  });

  return config;
}

module.exports = withNativeSplash;
