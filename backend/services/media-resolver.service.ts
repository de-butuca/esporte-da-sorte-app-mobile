/**
 * media-resolver.service.ts
 *
 * Stateless, fully-local resolver that turns raw visual field values from
 * OpenAPI-shaped data into normalised `BackendMediaAsset` objects the UI
 * can consume directly.
 *
 * No external network calls. No image downloads.
 */

import type { BackendMediaAsset, BackendMediaKind, OpenApiMediaFieldDescriptor } from '../models/common.models';
import { getMediaFieldDescriptor, getMediaFieldsForSchema } from '../generated/openapi-media.generated';
import { resolveIconId, resolveIconName, SPORT_ICON_FALLBACK } from '../mocks/icon-id-map';

// ---------------------------------------------------------------------------
// Heuristics
// ---------------------------------------------------------------------------

const URL_REGEX = /^https?:\/\//i;

function looksLikeUrl(value: unknown): value is string {
  return typeof value === 'string' && URL_REGEX.test(value);
}

function inferKind(schema: string, field: string, value: unknown): BackendMediaKind {
  const descriptor = getMediaFieldDescriptor(schema, field);
  if (descriptor) return descriptor.kind;

  if (typeof value === 'boolean') return 'boolean-flag';
  if (typeof value === 'number') return 'icon-id';
  if (typeof value === 'string') {
    if (looksLikeUrl(value)) return 'image-url';
    const str = value as string;
    if (str.includes('<') && str.includes('>')) return 'html-content';
    return 'icon-name';
  }
  return 'unknown-visual';
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface ResolveMediaOptions {
  /** Override the inferred kind */
  kind?: BackendMediaKind;
  /** Alt text (used for images) */
  alt?: string;
  /** Fallback value if the original is empty / undefined */
  fallback?: string;
  /** Explicit width (pixels) */
  width?: number;
  /** Explicit height (pixels) */
  height?: number;
}

/**
 * Resolve a single media field value into a `BackendMediaAsset`.
 *
 * @param schema   - OpenAPI schema name (e.g. `"News"`)
 * @param field    - Field name inside the schema (e.g. `"bigImage"`)
 * @param value    - The raw value from the data object
 * @param options  - Optional overrides
 */
export function resolveMediaField(
  schema: string,
  field: string,
  value: unknown,
  options: ResolveMediaOptions = {},
): BackendMediaAsset {
  const effectiveValue = value ?? options.fallback;
  const kind = options.kind ?? inferKind(schema, field, effectiveValue);

  const asset: BackendMediaAsset = {
    kind,
    value: effectiveValue as string | number | boolean,
    alt: options.alt,
    width: options.width,
    height: options.height,
    sourceSchema: schema,
    sourceField: field,
    fallback: options.fallback,
  };

  switch (kind) {
    case 'image-url': {
      if (typeof effectiveValue === 'string') {
        asset.resolvedUrl = effectiveValue;
      }
      break;
    }
    case 'icon-id': {
      const id = typeof effectiveValue === 'number' ? effectiveValue : Number(effectiveValue);
      const key = Number.isFinite(id) ? resolveIconId(id) : SPORT_ICON_FALLBACK;
      asset.resolvedAssetKey = key;
      break;
    }
    case 'icon-name': {
      if (typeof effectiveValue === 'string') {
        asset.resolvedAssetKey = resolveIconName(effectiveValue);
        if (looksLikeUrl(effectiveValue)) {
          asset.resolvedUrl = effectiveValue;
        }
      }
      break;
    }
    case 'html-content':
    case 'boolean-flag':
    case 'unknown-visual':
      // No further resolution needed
      break;
  }

  return asset;
}

/**
 * Batch-resolve all known media fields of a schema from a data object.
 *
 * Example:
 * ```ts
 * const assets = resolveMediaFieldsForSchema('News', newsItem);
 * // assets.bigImage  → BackendMediaAsset { kind: 'image-url', resolvedUrl: '...' }
 * // assets.smallImage → BackendMediaAsset { kind: 'image-url', resolvedUrl: '...' }
 * ```
 */
export function resolveMediaFieldsForSchema(
  schema: string,
  data: Record<string, unknown>,
): Record<string, BackendMediaAsset> {
  const descriptors: readonly OpenApiMediaFieldDescriptor[] = getMediaFieldsForSchema(schema);
  const result: Record<string, BackendMediaAsset> = {};

  for (const desc of descriptors) {
    const raw = data[desc.field];
    if (raw !== undefined && raw !== null) {
      result[desc.field] = resolveMediaField(schema, desc.field, raw);
    }
  }

  return result;
}

/**
 * Quick helper: resolve a dealer image from `GameDetails` or `ReservedGameDetail`.
 */
export function resolveDealerImage(
  dealerImageUrl: string | undefined,
  dealerName?: string,
): BackendMediaAsset | undefined {
  if (!dealerImageUrl) return undefined;
  return resolveMediaField('GameDetails', 'dealerImageUrl', dealerImageUrl, {
    alt: dealerName,
  });
}

/**
 * Quick helper: resolve News images.
 */
export function resolveNewsImages(news: {
  bigImage?: string;
  smallImage?: string;
  htmlContent?: string;
  title?: string;
}): { bigImage?: BackendMediaAsset; smallImage?: BackendMediaAsset; htmlContent?: BackendMediaAsset } {
  const result: { bigImage?: BackendMediaAsset; smallImage?: BackendMediaAsset; htmlContent?: BackendMediaAsset } = {};

  if (news.bigImage) {
    result.bigImage = resolveMediaField('News', 'bigImage', news.bigImage, { alt: news.title });
  }
  if (news.smallImage) {
    result.smallImage = resolveMediaField('News', 'smallImage', news.smallImage, { alt: news.title });
  }
  if (news.htmlContent) {
    result.htmlContent = resolveMediaField('News', 'htmlContent', news.htmlContent);
  }

  return result;
}

/**
 * Quick helper: resolve a sport type icon from its numeric `iconId`.
 */
export function resolveSportIcon(
  iconId: number,
  sportName?: string,
): BackendMediaAsset {
  return resolveMediaField('TodaySportType', 'iconId', iconId, { alt: sportName });
}

/**
 * Quick helper: resolve a navbar menu icon.
 */
export function resolveNavbarIcon(iconName: string): BackendMediaAsset {
  return resolveMediaField('TraderNavbarMenu', 'icon', iconName);
}
