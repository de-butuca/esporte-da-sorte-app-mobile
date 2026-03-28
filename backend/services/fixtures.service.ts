import {
  SportListResponse,
  TodaySportListResponse,
  BragiResponseListSportBtgMarketsSummary,
} from '../models/fixtures.models';
import {
  mockSportListResponse,
  mockTodaySportListResponse,
  mockBtgMarketsResponse,
} from '../mocks/fixtures.mocks';

export interface IFixturesService {
  getAntepostSummary(device: string, language: string, trader: string): Promise<SportListResponse>;
  getBetTypeGroups(device: string, language: string, trader: string): Promise<BragiResponseListSportBtgMarketsSummary>;
  getPopularFixtures(device: string, language: string, trader: string): Promise<SportListResponse>;
  getTodaySportTypes(device: string, language: string, trader: string): Promise<TodaySportListResponse>;
  getUpcomingEvents(device: string, language: string, trader: string): Promise<SportListResponse>;
  getLeftMenu(device: string, language: string, trader: string): Promise<SportListResponse>;
  getPromotedEvents(device: string, language: string, trader: string): Promise<SportListResponse>;
  getDetailCard(device: string, language: string, trader: string): Promise<SportListResponse>;
  getLeagueCard(device: string, language: string, trader: string, seasonIds: string, encodedbody: string): Promise<SportListResponse>;
  searchFixtures(device: string, language: string, trader: string): Promise<SportListResponse>;
}

export class MockFixturesService implements IFixturesService {
  async getAntepostSummary(): Promise<SportListResponse> {
    return mockSportListResponse;
  }

  async getBetTypeGroups(): Promise<BragiResponseListSportBtgMarketsSummary> {
    return mockBtgMarketsResponse;
  }

  async getPopularFixtures(): Promise<SportListResponse> {
    return mockSportListResponse;
  }

  async getTodaySportTypes(): Promise<TodaySportListResponse> {
    return mockTodaySportListResponse;
  }

  async getUpcomingEvents(): Promise<SportListResponse> {
    return mockSportListResponse;
  }

  async getLeftMenu(): Promise<SportListResponse> {
    return mockSportListResponse;
  }

  async getPromotedEvents(): Promise<SportListResponse> {
    return mockSportListResponse;
  }

  async getDetailCard(): Promise<SportListResponse> {
    return mockSportListResponse;
  }

  async getLeagueCard(): Promise<SportListResponse> {
    return mockSportListResponse;
  }

  async searchFixtures(): Promise<SportListResponse> {
    return mockSportListResponse;
  }
}
