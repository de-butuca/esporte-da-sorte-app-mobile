export interface IUseApiConfig {
  method?: "get" | "post" | "put" | "patch" | "delete";
  version?: string;
  baseURL?: string;
  url: string;
  params?: Record<string, any>;
  headers?: Record<string, any>;
  data?: Record<string, any>;
}

export enum HttpStatusCode {
  unknown = -1,
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

type ResponseSuccess<data> = {
  sucesso: true;
  status: HttpStatusCode;
  data: data;
};

type ResponseError = {
  status: HttpStatusCode;
  errorCode: string;
  mensagem: string;
  sucesso: false;
};

export type ResponseApi<dataSuccess> =
  | ResponseSuccess<dataSuccess>
  | ResponseError;

export interface HttpClient {
  request<ResponseSuccess>(
    config: IUseApiConfig,
  ): Promise<ResponseApi<ResponseSuccess>>;
}
