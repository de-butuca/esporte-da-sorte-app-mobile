/**
 * openapi-media.generated.ts
 *
 * Auto-extracted from openapi.json – DO NOT EDIT MANUALLY.
 *
 * Contains every visual/media field found in the OpenAPI spec, classified by
 * kind, grouped by schema and domain, and exposed through look-up helpers.
 */

import type {
  BackendMediaKind,
  OpenApiMediaFieldDescriptor,
} from '../models/common.models';

// ---------------------------------------------------------------------------
// 1. Complete list of media field descriptors
// ---------------------------------------------------------------------------

export const OPENAPI_MEDIA_FIELDS: readonly OpenApiMediaFieldDescriptor[] = [
  // --- News (domain: content) ---
  {
    schema: 'News',
    field: 'bigImage',
    type: 'string',
    kind: 'image-url',
    domain: 'content',
    description: 'Hero / banner image URL for the news entry',
  },
  {
    schema: 'News',
    field: 'smallImage',
    type: 'string',
    kind: 'image-url',
    domain: 'content',
    description: 'Card / thumbnail image URL for the news entry',
  },
  {
    schema: 'News',
    field: 'htmlContent',
    type: 'string',
    kind: 'html-content',
    domain: 'content',
    description: 'Rich HTML that may contain embedded <img> tags',
  },

  // --- TodaySportType (domain: fixtures) ---
  {
    schema: 'TodaySportType',
    field: 'iconId',
    type: 'integer',
    kind: 'icon-id',
    domain: 'fixtures',
    description: 'Numeric identifier that must be resolved to a sport icon',
  },

  // --- TraderNavbarMenu (domain: config) ---
  {
    schema: 'TraderNavbarMenu',
    field: 'icon',
    type: 'string',
    kind: 'icon-name',
    domain: 'config',
    description: 'Symbolic icon name for navbar menu items',
  },

  // --- GameDetails (domain: casino) ---
  {
    schema: 'GameDetails',
    field: 'dealerImageUrl',
    type: 'string',
    kind: 'image-url',
    domain: 'casino',
    description: 'Live dealer photograph URL',
  },
  {
    schema: 'GameDetails',
    field: 'dealer',
    type: 'string',
    kind: 'unknown-visual',
    domain: 'casino',
    description: 'Dealer name – not an image but used as alt text / label alongside dealerImageUrl',
  },

  // --- ReservedGameDetail (domain: casino) ---
  {
    schema: 'ReservedGameDetail',
    field: 'dealerImageUrl',
    type: 'string',
    kind: 'image-url',
    domain: 'casino',
    description: 'Live dealer photograph URL (reserved games)',
  },
  {
    schema: 'ReservedGameDetail',
    field: 'dealer',
    type: 'string',
    kind: 'unknown-visual',
    domain: 'casino',
    description: 'Dealer name – not an image but used as alt text / label',
  },

  // --- ModuleData (domain: config) ---
  {
    schema: 'ModuleData',
    field: 'hasImage',
    type: 'boolean',
    kind: 'boolean-flag',
    domain: 'config',
    description: 'Flag indicating whether the module data entry has an associated image',
  },

  // --- OAuthUser (domain: auth) ---
  {
    schema: 'OAuthUser',
    field: 'picture',
    type: 'string',
    kind: 'image-url',
    domain: 'auth',
    description: 'Profile picture URL from the OAuth provider',
  },

  // --- TraderFundType (domain: config) ---
  {
    schema: 'TraderFundType',
    field: 'customLogo',
    type: 'boolean',
    kind: 'boolean-flag',
    domain: 'config',
    description: 'Flag indicating whether the fund type uses a custom logo',
  },
] as const;

// ---------------------------------------------------------------------------
// 2. Lookup maps
// ---------------------------------------------------------------------------

/** Map: schema name → list of media field descriptors */
export const MEDIA_FIELDS_BY_SCHEMA: ReadonlyMap<string, OpenApiMediaFieldDescriptor[]> =
  OPENAPI_MEDIA_FIELDS.reduce((map, field) => {
    const list = map.get(field.schema) ?? [];
    list.push(field);
    map.set(field.schema, list);
    return map;
  }, new Map<string, OpenApiMediaFieldDescriptor[]>());

/** Map: domain → list of media field descriptors */
export const MEDIA_FIELDS_BY_DOMAIN: ReadonlyMap<string, OpenApiMediaFieldDescriptor[]> =
  OPENAPI_MEDIA_FIELDS.reduce((map, field) => {
    const list = map.get(field.domain) ?? [];
    list.push(field);
    map.set(field.domain, list);
    return map;
  }, new Map<string, OpenApiMediaFieldDescriptor[]>());

/** Map: kind → list of media field descriptors */
export const MEDIA_FIELDS_BY_KIND: ReadonlyMap<BackendMediaKind, OpenApiMediaFieldDescriptor[]> =
  OPENAPI_MEDIA_FIELDS.reduce((map, field) => {
    const list = map.get(field.kind) ?? [];
    list.push(field);
    map.set(field.kind, list);
    return map;
  }, new Map<BackendMediaKind, OpenApiMediaFieldDescriptor[]>());

/** Set of schema names that contain at least one visual field */
export const SCHEMAS_WITH_MEDIA: ReadonlySet<string> = new Set(
  OPENAPI_MEDIA_FIELDS.map((f) => f.schema),
);

/** All domain names that contain visual fields */
export const DOMAINS_WITH_MEDIA: readonly string[] = [
  ...new Set(OPENAPI_MEDIA_FIELDS.map((f) => f.domain)),
];

// ---------------------------------------------------------------------------
// 3. Helpers
// ---------------------------------------------------------------------------

/** Return the media field descriptors for a given schema (or empty array) */
export function getMediaFieldsForSchema(schema: string): readonly OpenApiMediaFieldDescriptor[] {
  return MEDIA_FIELDS_BY_SCHEMA.get(schema) ?? [];
}

/** Return the exact descriptor for a schema + field pair (or undefined) */
export function getMediaFieldDescriptor(
  schema: string,
  field: string,
): OpenApiMediaFieldDescriptor | undefined {
  return OPENAPI_MEDIA_FIELDS.find((f) => f.schema === schema && f.field === field);
}

/** Return all descriptors that match a given kind */
export function getMediaFieldsByKind(kind: BackendMediaKind): readonly OpenApiMediaFieldDescriptor[] {
  return MEDIA_FIELDS_BY_KIND.get(kind) ?? [];
}

/** Return all descriptors that match a given domain */
export function getMediaFieldsByDomain(domain: string): readonly OpenApiMediaFieldDescriptor[] {
  return MEDIA_FIELDS_BY_DOMAIN.get(domain) ?? [];
}
