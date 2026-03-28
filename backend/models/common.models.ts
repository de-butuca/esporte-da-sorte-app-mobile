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
