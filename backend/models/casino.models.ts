export interface CasinoGamesTagsResponse {
  state?: State;
  list?: CasinoGamesList[];
}

export interface CasinoGamesList {
  gameId?: number;
  tagIds?: number[];
}

export interface State {
  code?: number;
  message?: string;
  messageDetails?: string;
  reference?: string;
}

export interface CasinoTagsResponse {
  state?: State;
  map?: Record<string, string>;
}

export interface ReservedCategoryResponse {
  state?: ReservedState;
  categories?: ReservedCategory[];
}

export interface ReservedState {
  code?: number;
  message?: string;
  messageDetails?: string;
  reference?: string;
}

export interface ReservedCategory {
  id?: number;
  name?: string;
  count?: number;
  webCount?: number;
  mobileCount?: number;
  isCustom?: boolean;
  order?: number;
}

export interface ReservedGameResponse {
  state?: ReservedState;
  games?: ReservedGame[];
}

export interface ReservedGame {
  categoryId?: number;
  hours?: string;
  id?: number;
  jackpot?: boolean;
  limits?: string;
  name?: string;
  newGame?: boolean;
  open?: boolean;
  popular?: boolean;
  vendorId?: number;
  vipGame?: boolean;
  minBet?: number;
  maxBet?: number;
  minBetBehind?: number;
  maxBetBehind?: number;
  orderBy?: number;
  jackpotAmount?: number;
  fppCoefficient?: number;
  op?: boolean;
  vendorLimitGroups?: ReservedVendorLimitGroup[];
  gameDetails?: ReservedGameDetail;
  openHours?: ReservedOpenHour[];
  customCategories?: number[];
  promoStartDate?: number;
  defaultGameName?: string;
}

export interface ReservedVendorLimitGroup {
  vendorLimitId?: string;
  limits?: ReservedLimit[];
}

export interface ReservedLimit {
  csnGameLimitId?: number;
  currencyCode?: string;
  maxBet?: number;
  minBet?: number;
  minBetBehind?: number;
  maxBetBehind?: number;
}

export interface ReservedGameDetail {
  dealer?: string;
  dealerImageUrl?: string;
  bjNumberOfSeats?: number;
  bjOccupiedSeats?: number;
  rouletteStatistics?: string;
}

export interface ReservedOpenHour {
  closeHour?: string;
  hourSeq?: number;
  openHour?: string;
}

export interface OpenGame {
  gameUrl?: string;
  width?: string;
  height?: string;
  gameContent?: string;
  remainingDailySessionDuration?: number;
  remainingWeeklySessionDuration?: number;
  remainingMonthlySessionDuration?: number;
}

export interface GameListRecord {
  provider?: Provider;
  lobby?: Game;
  games?: Game[];
}

export interface Provider {
  providerId?: number;
  code?: string;
  name?: string;
  virtual?: boolean;
}

export interface Game {
  gameId?: number;
  gameName?: string;
  shortName?: string;
  fppCoefficient?: number;
  code?: string;
  description?: string;
  categoryId?: number;
  categoryName?: string;
  gameType?: string;
  gameLanguage?: string;
  newGame?: boolean;
  vipGame?: boolean;
  limits?: string;
  hours?: string;
  popular?: boolean;
  jackpot?: boolean;
  jackpotAmount?: number;
  vendorLimitId?: string;
  minBet?: number;
  maxBet?: number;
  minBetBehind?: number;
  maxBetBehind?: number;
  open?: boolean;
  orderBy?: number;
  forWeb?: number;
  forMobile?: number;
  vendorId?: number;
  vendorLimitGroups?: VendorLimitGroup[];
  openHours?: OpenHour[];
  gameDetails?: GameDetails;
}

export interface VendorLimitGroup {
  vendorLimitId?: string;
  limits?: VendorLimit[];
}

export interface VendorLimit {
  csnGameLimitId?: number;
  minBet?: number;
  maxBet?: number;
  minBetBehind?: number;
  maxBetBehind?: number;
  currencyCode?: string;
}

export interface OpenHour {
  hourSeq?: number;
  openHour?: string;
  closeHour?: string;
}

export interface GameDetails {
  dealer?: string;
  dealerImageUrl?: string;
  bjNumberOfSeats?: number;
  bjOccupiedSeats?: number;
  rouletteStatistics?: string;
}

export interface LaunchGame {
  gameUrl?: string;
}
