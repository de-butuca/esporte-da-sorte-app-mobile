const { withEntitlementsPlist } = require('expo/config-plugins');

// Remove aps-environment from iOS entitlements so the build works
// without Apple Developer Push Notifications capability
module.exports = function androidOnlyNotifications(config) {
  return withEntitlementsPlist(config, (mod) => {
    delete mod.modResults['aps-environment'];
    return mod;
  });
};
