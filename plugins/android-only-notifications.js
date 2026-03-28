const { withEntitlementsPlist, withDangerousMod } = require('expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function androidOnlyNotifications(config) {
  config = withEntitlementsPlist(config, (mod) => {
    delete mod.modResults['aps-environment'];
    return mod;
  });

  config = withDangerousMod(config, [
    'ios',
    (mod) => {
      const podfilePath = path.join(mod.modRequest.platformProjectRoot, 'Podfile');
      let podfile = fs.readFileSync(podfilePath, 'utf8');

      if (!podfile.includes('expo-notifications')) {
        podfile = podfile.replace(
          "use_expo_modules!",
          "use_expo_modules!(exclude: ['expo-notifications'])"
        );
        fs.writeFileSync(podfilePath, podfile);
      }

      return mod;
    },
  ]);

  return config;
};
