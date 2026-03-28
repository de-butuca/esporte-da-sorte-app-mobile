export interface OdinResponse<T = unknown> {
  success?: boolean;
  error?: boolean | null;
  systemError?: boolean | null;
  responseCodes?: ResponseCode[];
  data?: T;
}

export interface ResponseCode {
  responseCode: number;
  responseKey: string;
  responseMessage?: string;
}

export interface BragiResponseCode {
  responseCode?: number;
  responseKey?: string;
  responseMessage?: string;
  params?: Record<string, unknown>[];
}

export interface OdinRequest<T = unknown> {
  traderId?: number;
  customerId?: number;
  languageId?: number;
  device?: string;
  channel?: string;
  identity?: string;
  auditHeader?: AuditHeader;
  requestBody?: T;
}

export interface AuditHeader {
  transactionSeq?: number;
  transactionCode?: number;
  appName?: string;
  traderId?: number;
  appUserId?: number;
  customerId?: number;
  userName?: string;
  languageId?: string;
  fromIp?: string;
  description?: string;
  addOperationLog?: boolean;
}

// ---------------------------------------------------------------------------
// Media contracts – derived from openapi.json visual/media fields
// ---------------------------------------------------------------------------

/** Discriminator for media field classification */
export type BackendMediaKind =
  | 'image-url'
  | 'icon-name'
  | 'icon-id'
  | 'html-content'
  | 'boolean-flag'
  | 'unknown-visual';

/** Where the media value came from */
export interface BackendMediaSource {
  schema: string;
  field: string;
}

/** Resolved media asset – the normalised representation the UI consumes */
export interface BackendMediaAsset {
  kind: BackendMediaKind;
  value: string | number | boolean;
  alt?: string;
  width?: number;
  height?: number;
  sourceSchema: string;
  sourceField: string;
  fallback?: string;
  /** Fully-qualified URL after resolution (set by the resolver) */
  resolvedUrl?: string;
  /** Key for a local asset bundle (set by the resolver for icon-id / icon-name) */
  resolvedAssetKey?: string;
}

/** Convenience alias for image-url assets */
export type BackendImageAsset = BackendMediaAsset & { kind: 'image-url' };

/** Convenience alias for icon assets (name or id) */
export type BackendIconAsset = BackendMediaAsset & { kind: 'icon-name' | 'icon-id' };

/** Descriptor used in the generated media catalogue */
export interface OpenApiMediaFieldDescriptor {
  schema: string;
  field: string;
  type: 'string' | 'integer' | 'boolean';
  kind: BackendMediaKind;
  domain: string;
  description?: string;
}
