import axios from "axios";
import { useSessionStore } from "../session/useSessionStore";
import { HttpStatusCode, IUseApiConfig, ResponseApi } from "./api.types";
import { apiClient } from "./api.client";

export async function request<ResponseSuccess>(
  config: IUseApiConfig,
): Promise<ResponseApi<ResponseSuccess>> {
  let messageDefault: string | null = null;

  try {
    const response = await apiClient(config);

    return {
      sucesso: true,
      status: response.status,
      data: response.data as ResponseSuccess,
    };
  } catch (error: any) {
    const status = error.response?.status;

    if (status === HttpStatusCode.unauthorized) {
      await useSessionStore.getState().signOut();
    }

    return {
      sucesso: false,
      status,
      errorCode: error.response?.data?.error,
      mensagem: messageDefault ?? error.response?.data?.error ?? null,
    };
  }
}

request<{ arroz: 2 }>({ url: "", method: "get" });
