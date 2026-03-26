// ============================================================
// Casino Models — Casino games, tags, iframe, providers
// Generated from OpenAPI spec (Casino API v1.0.0)
// ============================================================

// ---- Casino Games Tags ----

/** Resposta com mapeamento jogo → tags (para filtros no frontend). */
export interface CasinoGamesTagsResponse {
  state?: State;
  list?: CasinoGamesList[];
}

/** Relação de um jogo com seus IDs de tags. */
export interface CasinoGamesList {
  gameId?: number;
  tagIds?: number[];
}

/** Estado da resposta da API de cassino (code 0 = sucesso). */
export interface State {
  code?: number;
  message?: string;
  messageDetails?: string;
  reference?: string;
}

// ---- Casino Tags ----

/** Catálogo de tags do cassino (mapa id → nome). */
export interface CasinoTagsResponse {
  state?: State;
  map?: Record<string, string>;
}

// ---- Reserved Categories ----

/** Resposta com categorias reservadas do cassino e seus contadores. */
export interface ReservedCategoryResponse {
  state?: ReservedState;
  categories?: ReservedCategory[];
}

/** Estado da resposta da API reservada de cassino. */
export interface ReservedState {
  code?: number;
  message?: string;
  messageDetails?: string;
  reference?: string;
}

/** Categoria de jogos do cassino com contadores por plataforma (web/mobile). */
export interface ReservedCategory {
  id?: number;
  name?: string;
  count?: number;
  webCount?: number;
  mobileCount?: number;
  isCustom?: boolean;
  order?: number;
}

// ---- Reserved Games ----

/** Resposta com lista completa de jogos do cassino. */
export interface ReservedGameResponse {
  state?: ReservedState;
  games?: ReservedGame[];
}

/** Jogo de cassino da API reservada com limites, vendedor e horários. */
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

/** Grupo de limites de aposta por vendedor e moeda. */
export interface ReservedVendorLimitGroup {
  vendorLimitId?: string;
  limits?: ReservedLimit[];
}

/** Limite de aposta por moeda (mín/máx bet e bet-behind). */
export interface ReservedLimit {
  csnGameLimitId?: number;
  currencyCode?: string;
  maxBet?: number;
  minBet?: number;
  minBetBehind?: number;
  maxBetBehind?: number;
}

/** Detalhes do jogo (dealer, assentos, estatísticas de roleta). */
export interface ReservedGameDetail {
  dealer?: string;
  dealerImageUrl?: string;
  bjNumberOfSeats?: number;
  bjOccupiedSeats?: number;
  rouletteStatistics?: string;
}

/** Horário de funcionamento de um jogo ao vivo. */
export interface ReservedOpenHour {
  closeHour?: string;
  hourSeq?: number;
  openHour?: string;
}

// ---- Open Game (Demo) ----

/** Dados retornados ao abrir um jogo em modo demo (URL, dimensões, duração de sessão). */
export interface OpenGame {
  gameUrl?: string;
  width?: string;
  height?: string;
  gameContent?: string;
  remainingDailySessionDuration?: number;
  remainingWeeklySessionDuration?: number;
  remainingMonthlySessionDuration?: number;
}

// ---- Iframe Games ----

/** Registro de provedor com seus jogos para exibição via iframe. */
export interface GameListRecord {
  provider?: Provider;
  lobby?: Game;
  games?: Game[];
}

/** Provedor de jogos de cassino (Pragmatic Play, Spribe, Evolution, etc.). */
export interface Provider {
  providerId?: number;
  code?: string;
  name?: string;
  virtual?: boolean;
}

/** Jogo de cassino completo com 30+ campos: tipo, categoria, limites, disponibilidade. */
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

/** Grupo de limites por vendedor para jogos iframe. */
export interface VendorLimitGroup {
  vendorLimitId?: string;
  limits?: VendorLimit[];
}

/** Limite individual de aposta por moeda (iframe). */
export interface VendorLimit {
  csnGameLimitId?: number;
  minBet?: number;
  maxBet?: number;
  minBetBehind?: number;
  maxBetBehind?: number;
  currencyCode?: string;
}

/** Horário de funcionamento de um jogo ao vivo (iframe). */
export interface OpenHour {
  hourSeq?: number;
  openHour?: string;
  closeHour?: string;
}

/** Detalhes do jogo ao vivo: dealer, assentos BJ, estatísticas roleta (iframe). */
export interface GameDetails {
  dealer?: string;
  dealerImageUrl?: string;
  bjNumberOfSeats?: number;
  bjOccupiedSeats?: number;
  rouletteStatistics?: string;
}

// ---- Launch Game (Demo) ----

/** URL de lançamento de jogo demo via iframe. */
export interface LaunchGame {
  gameUrl?: string;
}
