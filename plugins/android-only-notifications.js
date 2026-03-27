const { withEntitlementsPlist, withDangerousMod } = require('expo/config-plugins');
const fs = require('fs');
const path = require('path');

// 1. Remove aps-environment entitlement from iOS
// 2. Exclude expo-notifications native module from iOS Podfile
module.exports = function androidOnlyNotifications(config) {
  // Remove entitlement
  config = withEntitlementsPlist(config, (mod) => {
    delete mod.modResults['aps-environment'];
    return mod;
  });

  // Patch Podfile to exclude expo-notifications from iOS
  config = withDangerousMod(config, [
    'ios',
    (mod) => {
      const podfilePath = path.join(mod.modRequest.platformProjectRoot, 'Podfile');
      let podfile = fs.readFileSync(podfilePath, 'utf8');

      // Add exclusion for expo-notifications if not already there
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
