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

export interface IBettingService {
  getPopularOdds(): Promise<OdinResponse<PopularOddDto[]>>;
  getSportBetAndDetails(body: unknown): Promise<OdinResponse<VerifyTicketResult>>;
  getSportsBetInfo(body: unknown): Promise<OdinResponse<SportsBetPlayResult>>;
  getFugasoJackpots(): Promise<OdinResponse<FugasoJackpots>>;
  getEgtJackpotData(): Promise<string>;
  getJackpotResultList(): Promise<OdinResponse<Jackpot[]>>;
  getJackpotResultDetails(body: unknown): Promise<OdinResponse<JackpotResultDetail[]>>;
}

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
