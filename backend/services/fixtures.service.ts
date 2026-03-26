// ============================================================
// Fixtures Service — Interface + mock implementation
// for Bragi API (sport/fixture) public routes
// ============================================================

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

// ---- Interface ----

/**
 * Contrato de serviço para endpoints de fixtures da Bragi API.
 * Todos os métodos retornam `Promise` para compatibilidade com chamadas assíncronas.
 */
export interface IFixturesService {
  /** GET /api-v2/antepost-summary/{device}/{language}/{trader} */
  getAntepostSummary(device: string, language: string, trader: string): Promise<SportListResponse>;

  /** GET /api-v2/bet-type-groups/{device}/{language}/{trader} */
  getBetTypeGroups(device: string, language: string, trader: string): Promise<BragiResponseListSportBtgMarketsSummary>;

  /** GET /api-v2/popular-fixture/{device}/{language}/{trader} */
  getPopularFixtures(device: string, language: string, trader: string): Promise<SportListResponse>;

  /** GET /api-v2/today-sport-types/{device}/{language}/{trader} */
  getTodaySportTypes(device: string, language: string, trader: string): Promise<TodaySportListResponse>;

  /** GET /api-v2/upcoming-events/{device}/{language}/{trader} */
  getUpcomingEvents(device: string, language: string, trader: string): Promise<SportListResponse>;

  /** GET /api-v2/left-menu/{device}/{language}/{trader} */
  getLeftMenu(device: string, language: string, trader: string): Promise<SportListResponse>;

  /** GET /api-v2/promoted-events/{device}/{language}/{trader} */
  getPromotedEvents(device: string, language: string, trader: string): Promise<SportListResponse>;

  /** GET /api-v2/detail-card/{device}/{language}/{trader} */
  getDetailCard(device: string, language: string, trader: string): Promise<SportListResponse>;

  /** GET /api-v2/league-card/{device}/{language}/{trader}/{seasonIds}/{encodedbody} */
  getLeagueCard(device: string, language: string, trader: string, seasonIds: string, encodedbody: string): Promise<SportListResponse>;

  /** GET /api-v2/fixture-search/{device}/{language}/{trader} */
  searchFixtures(device: string, language: string, trader: string): Promise<SportListResponse>;
}

// ---- Mock Implementation ----

/** Implementação mock de `IFixturesService`. Retorna dados estáticos de `fixtures.mocks.ts`. */
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
