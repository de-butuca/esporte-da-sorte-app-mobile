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

export interface ICasinoService {
  getCasinoGamesTags(): Promise<CasinoGamesTagsResponse>;
  getCasinoTags(): Promise<CasinoTagsResponse>;
  getReservedCategories(): Promise<ReservedCategoryResponse>;
  getReservedGames(): Promise<ReservedGameResponse>;
  openDemoGame(body: unknown): Promise<OpenGame>;
  getIframeGameList(): Promise<OdinResponse<GameListRecord[]>>;
  launchDemo(body: unknown): Promise<OdinResponse<LaunchGame>>;
}

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
