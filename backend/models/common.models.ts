// ============================================================
// Common Models — Shared types across all public API domains
// Generated from OpenAPI spec (Casino API v1.0.0)
// ============================================================

/**
 * Wrapper padrão de resposta da Odin API.
 * Todo endpoint `/api/generic/*` retorna neste formato.
 * O campo `data` é genérico e varia conforme o endpoint.
 */
export interface OdinResponse<T = unknown> {
  success?: boolean;
  error?: boolean | null;
  systemError?: boolean | null;
  responseCodes?: ResponseCode[];
  data?: T;
}

/**
 * Código de resposta padrão da Odin API.
 * `responseCode: 1` indica sucesso na maioria dos endpoints.
 */
export interface ResponseCode {
  responseCode: number;
  responseKey: string;
  responseMessage?: string;
}

/**
 * Código de resposta da Bragi API.
 * Similar ao `ResponseCode`, mas inclui `params` para dados extras.
 */
export interface BragiResponseCode {
  responseCode?: number;
  responseKey?: string;
  responseMessage?: string;
  params?: Record<string, unknown>[];
}

/**
 * Wrapper de requisição para endpoints Odin que exigem body.
 * Inclui dados de contexto (trader, cliente, idioma, dispositivo) e o corpo tipado.
 */
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

/** Dados de auditoria incluídos em requisições para log e rastreamento. */
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
