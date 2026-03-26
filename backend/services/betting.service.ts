// ============================================================
// Betting Service — Interface + mock implementation
// for popular odds, verify ticket, play result, jackpots
// ============================================================

import { OdinResponse } from '../models/common.models';
import {
  PopularOddDto,
  VerifyTicketResult,
  SportsBetPlayResult,
  FugasoJackpots,
  Jackpot,
  JackpotResultDetail,
} from '../models/betting.models';
import {
  mockPopularOdds,
  mockVerifyTicket,
  mockSportsBetPlayResult,
  mockFugasoJackpots,
  mockJackpotResultList,
  mockJackpotResultDetails,
  mockEgtJackpotData,
} from '../mocks/betting.mocks';

// ---- Interface ----

/**
 * Contrato de serviço para endpoints de apostas:
 * odds populares, verificação de bilhete, resultado de aposta e jackpots.
 */
export interface IBettingService {
  /** GET /api/generic/sportbet/getPopularOdds */
  getPopularOdds(): Promise<OdinResponse<PopularOddDto[]>>;

  /** POST /api/generic/sportbet/getSportBetAndDetails */
  getSportBetAndDetails(body: unknown): Promise<OdinResponse<VerifyTicketResult>>;

  /** POST /api/user/sportsBet/info — versão pública (sem autenticação) */
  getSportsBetInfo(body: unknown): Promise<OdinResponse<SportsBetPlayResult>>;

  /** GET /api/generic/jackpots/getFugasoJackpots */
  getFugasoJackpots(): Promise<OdinResponse<FugasoJackpots>>;

  /** GET /api/generic/getEgtJackpotData */
  getEgtJackpotData(): Promise<string>;

  /** GET /api/generic/jackpots/getJackpotResultList */
  getJackpotResultList(): Promise<OdinResponse<Jackpot[]>>;

  /** POST /api/generic/jackpots/getJackpotResultDetails */
  getJackpotResultDetails(body: unknown): Promise<OdinResponse<JackpotResultDetail[]>>;
}

// ---- Mock Implementation ----

/** Implementação mock de `IBettingService`. Retorna dados estáticos de `betting.mocks.ts`. */
export class MockBettingService implements IBettingService {
  async getPopularOdds(): Promise<OdinResponse<PopularOddDto[]>> {
    return mockPopularOdds;
  }

  async getSportBetAndDetails(): Promise<OdinResponse<VerifyTicketResult>> {
    return mockVerifyTicket;
  }

  async getSportsBetInfo(): Promise<OdinResponse<SportsBetPlayResult>> {
    return mockSportsBetPlayResult;
  }

  async getFugasoJackpots(): Promise<OdinResponse<FugasoJackpots>> {
    return mockFugasoJackpots;
  }

  async getEgtJackpotData(): Promise<string> {
    return mockEgtJackpotData;
  }

  async getJackpotResultList(): Promise<OdinResponse<Jackpot[]>> {
    return mockJackpotResultList;
  }

  async getJackpotResultDetails(): Promise<OdinResponse<JackpotResultDetail[]>> {
    return mockJackpotResultDetails;
  }
}
