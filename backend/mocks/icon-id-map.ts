/**
 * icon-id-map.ts
 *
 * Local fallback mapping for `iconId` (integer) → symbolic asset key.
 *
 * IMPORTANT: These mappings are **heuristic / local-only fallbacks**.
 * The real icon-id → asset resolution should come from the API or a CDN
 * convention. This file exists so the mock backend can return meaningful
 * values without any external dependency.
 *
 * Expand this map as new sport types appear in the OpenAPI / fixtures data.
 */

/** Map of sport-type icon IDs to their symbolic asset keys */
export const SPORT_ICON_ID_MAP: Readonly<Record<number, string>> = {
  1: 'soccer',
  2: 'basketball',
  3: 'tennis',
  4: 'ice-hockey',
  5: 'handball',
  6: 'baseball',
  7: 'american-football',
  8: 'rugby',
  9: 'cricket',
  10: 'boxing',
  11: 'mma',
  12: 'volleyball',
  13: 'table-tennis',
  14: 'badminton',
  15: 'darts',
  16: 'snooker',
  17: 'cycling',
  18: 'motorsport',
  19: 'golf',
  20: 'swimming',
  21: 'esports',
  22: 'futsal',
  23: 'volleyball',       // stId 4 in mocks maps iconId 23 to Vôlei
  24: 'water-polo',
  25: 'beach-volleyball',
  26: 'field-hockey',
  27: 'skiing',
  28: 'biathlon',
  29: 'athletics',
  30: 'virtual-sports',
};

/** Default key returned when no mapping exists (heuristic) */
export const SPORT_ICON_FALLBACK = 'generic-sport';

/**
 * Resolve a numeric icon ID to a symbolic asset key.
 *
 * @param iconId - The value from `TodaySportType.iconId` or similar
 * @returns The symbolic key (e.g. `"soccer"`) or the fallback
 */
export function resolveIconId(iconId: number): string {
  return SPORT_ICON_ID_MAP[iconId] ?? SPORT_ICON_FALLBACK;
}

/**
 * Map of known navbar icon names to normalised asset keys.
 *
 * The `TraderNavbarMenu.icon` field already comes as a symbolic string
 * (e.g. `"sports"`, `"casino"`, `"live"`). This map allows normalising those
 * to a consistent key used by the app's icon-set, if needed.
 *
 * When the value is `null` the original string is used as-is.
 */
export const NAVBAR_ICON_NAME_MAP: Readonly<Record<string, string | null>> = {
  sports: null,
  live: null,
  casino: null,
  slots: null,
  'live-casino': null,
  table: null,
  promo: 'promotions',
  jackpot: null,
};

/**
 * Normalise a navbar icon name.
 *
 * @param iconName - Raw value from `TraderNavbarMenu.icon`
 * @returns Normalised key the UI should use
 */
export function resolveIconName(iconName: string): string {
  if (iconName in NAVBAR_ICON_NAME_MAP) {
    return NAVBAR_ICON_NAME_MAP[iconName] ?? iconName;
  }
  return iconName;
}
