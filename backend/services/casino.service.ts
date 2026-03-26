// ============================================================
// Casino Service — Interface + mock implementation
// for casino games, tags, iframe games, demo launch
// ============================================================

import { OdinResponse } from '../models/common.models';
import {
  CasinoGamesTagsResponse,
  CasinoTagsResponse,
  ReservedCategoryResponse,
  ReservedGameResponse,
  OpenGame,
  GameListRecord,
  LaunchGame,
} from '../models/casino.models';
import {
  mockCasinoGamesTags,
  mockCasinoTags,
  mockReservedCategories,
  mockReservedGames,
  mockOpenDemoGame,
  mockIframeGameList,
  mockLaunchDemo,
} from '../mocks/casino.mocks';

// ---- Interface ----

/**
 * Contrato de serviço para endpoints de cassino:
 * jogos, tags, categorias, demo e iframe.
 */
export interface ICasinoService {
  /** GET /api/user/casinoapi/games/tags */
  getCasinoGamesTags(): Promise<CasinoGamesTagsResponse>;

  /** GET /api/user/casinoapi/tags */
  getCasinoTags(): Promise<CasinoTagsResponse>;

  /** GET /api/user/casinoapi/getReservedCategories */
  getReservedCategories(): Promise<ReservedCategoryResponse>;

  /** GET /api/user/casinoapi/getReservedGames */
  getReservedGames(): Promise<ReservedGameResponse>;

  /** POST /api/user/casinoapi/openDemoGame */
  openDemoGame(body: unknown): Promise<OpenGame>;

  /** GET /api/generic/iframe/game-list */
  getIframeGameList(): Promise<OdinResponse<GameListRecord[]>>;

  /** POST /api/generic/iframe/launch-demo */
  launchDemo(body: unknown): Promise<OdinResponse<LaunchGame>>;
}

// ---- Mock Implementation ----

/** Implementação mock de `ICasinoService`. Retorna dados estáticos de `casino.mocks.ts`. */
export class MockCasinoService implements ICasinoService {
  async getCasinoGamesTags(): Promise<CasinoGamesTagsResponse> {
    return mockCasinoGamesTags;
  }

  async getCasinoTags(): Promise<CasinoTagsResponse> {
    return mockCasinoTags;
  }

  async getReservedCategories(): Promise<ReservedCategoryResponse> {
    return mockReservedCategories;
  }

  async getReservedGames(): Promise<ReservedGameResponse> {
    return mockReservedGames;
  }

  async openDemoGame(): Promise<OpenGame> {
    return mockOpenDemoGame;
  }

  async getIframeGameList(): Promise<OdinResponse<GameListRecord[]>> {
    return mockIframeGameList;
  }

  async launchDemo(): Promise<OdinResponse<LaunchGame>> {
    return mockLaunchDemo;
  }
}
