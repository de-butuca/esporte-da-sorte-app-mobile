// ============================================================
// Fixtures Models — Sport, Fixture, Season, Category, Odds
// Generated from OpenAPI spec (Casino API v1.0.0)
// ============================================================

import { BragiResponseCode } from './common.models';

// ---- Responses ----

/** Resposta padrão da Bragi API para endpoints que retornam lista de esportes com partidas. */
export interface SportListResponse {
  data?: SportType[];
  responseCodes?: BragiResponseCode[];
  success?: boolean;
  type?: string;
}

/** Resposta para esportes com jogos hoje (sem árvore completa de categorias). */
export interface TodaySportListResponse {
  data?: TodaySportType[];
  responseCodes?: BragiResponseCode[];
  success?: boolean;
  type?: string;
}

/** Resposta com resumo de bet type groups por esporte. */
export interface BragiResponseListSportBtgMarketsSummary {
  data?: SportBtgMarketsSummary[];
  responseCodes?: BragiResponseCode[];
  success?: boolean;
}

// ---- Sport Types ----

/** Esporte com contadores básicos — usado em listagens resumidas (hoje). */
export interface TodaySportType {
  stId: number;
  xid: string;
  stN: string;
  iconId: number;
  pid: number;
  mdt?: number | null;
  lvt: boolean;
  fCnt?: number;
  oCnt?: number;
  aCnt?: number;
  fCM?: number;
  oCM?: number;
  stSURL?: string | null;
}

/** Esporte completo com hierarquia de categorias, temporadas e partidas. Estende TodaySportType. */
export interface SportType extends TodaySportType {
  cmt?: number | null;
  counts?: EntityCounts | null;
  ord?: number | null;
  lse?: boolean | null;
  cs?: Category[] | null;
}

// ---- Entity Counts ----

/** Contadores agregados de entidades de um esporte (categorias, ligas, partidas, odds, etc.). */
export interface EntityCounts {
  sport: number;
  category: number;
  league: number;
  season: number;
  fixture: number;
  antepost: number;
  fixtureBtg: number;
  odd: number;
}

// ---- Category ----

/** País ou região dentro de um esporte (ex.: Brasil, Espanha). Contém temporadas. */
export interface Category {
  cId: number;
  xid?: string | null;
  cN: string;
  counts?: Record<string, number>;
  ord?: number | null;
  iso?: string | null;
  group?: string | null;
  groupOrd?: number | null;
  sns?: Season[] | null;
  cSURL?: string | null;
}

// ---- Season ----

/** Temporada ou campeonato dentro de uma categoria (ex.: Brasileirão Série A 2026). Contém partidas. */
export interface Season {
  sId: number;
  lId: number;
  seaN: string;
  cshOut: boolean;
  lord?: number | null;
  ord?: number | null;
  pseaN?: string | null;
  seaSURL?: string | null;
  lName?: string;
  sportTypeId?: number | null;
  categoryId?: number | null;
  leagueName?: string | null;
  sns?: Season[] | null;
  counts?: EntityCounts;
  fs: Fixture[];
}

// ---- Fixture ----

/** Partida individual com times, data, status e grupos de tipo de aposta. */
export interface Fixture {
  fId: number;
  fsd: string;
  cshOut: boolean;
  sBFId?: number | null;
  ante: boolean;
  afed?: number | null;
  hcId?: number | null;
  hcBId?: number | null;
  hcCIC?: string | null;
  acId?: number | null;
  acBId?: number | null;
  acCIC?: string | null;
  name?: string | null;
  hcN?: string | null;
  acN?: string | null;
  xid?: string | null;
  lxid?: string | null;
  lbO: boolean;
  lSt: boolean;
  vld: boolean;
  frz: boolean;
  ssid?: number | null;
  fCs?: Record<string, unknown>[] | null;
  btgmi?: BtgMarket[] | null;
  fDS: number;
  mmp?: number | null;
  mDat?: MatchData | null;
  mCod?: string | null;
  tCN?: string | null;
  fNBSD?: string | null;
  fNlt?: string | null;
  ord?: number | null;
  cStage?: string | null;
  ce?: boolean | null;
  spl?: boolean | null;
  btgs?: FixtureBtg[];
}

// ---- Fixture Odds ----

/** Odd individual (seleção de aposta) com valor, status e identificação. */
export interface FixtureOdd {
  foId: number;
  btId: number;
  btN: string;
  valid: boolean;
  tvalid: boolean;
  freeze: boolean;
  prm: boolean;
  lineItem: boolean;
  btC?: string | null;
  btS?: string | null;
  hO: number;
  hSh: string;
  pSh?: string | null;
  oc?: string | null;
  tmId?: number | null;
  hSDId?: number | null;
  sv?: string | null;
  ord?: number | null;
  mCId?: number[] | null;
  foCe?: boolean | null;
  btCe?: boolean | null;
  taCe?: boolean | null;
}

// ---- Bet Type Groups ----

/** Grupo de tipos de aposta de uma partida (ex.: Main Markets, Gols, Handicap). */
export interface FixtureBtg {
  btgId: number;
  btgN: string;
  mrkp: string;
  btgNO?: string | null;
  btgSpl: boolean;
  btgSiOn: boolean;
  btgCe: boolean;
  btgMId?: number | null;
  btgMN?: string | null;
  btgMOrd?: number | null;
  ptn?: string | null;
  pto?: number | null;
  mbtgMId?: number | null;
  mbtgMN?: string | null;
  mbtgMOrd?: number | null;
  hsd?: Record<string, unknown>[] | null;
  cvp?: number | null;
  dt: number[];
  ddt?: number | null;
  prm: boolean;
  cshOut: boolean;
  ord?: number | null;
  fos?: FixtureOdd[] | null;
  lineItem: boolean;
}

/** Mercado de bet type group com ID, nome e contagem de odds. */
export interface BtgMarket {
  btgMId: number;
  btgMN: string;
  btgMOrd?: number | null;
  oCnt: number;
}

// ---- Match Data ----

/** Dados de partida ao vivo: placar, tempo, informações de período. */
export interface MatchData {
  st: string;
  sc?: string | null;
  sSc1?: string | null;
  sSc2?: string | null;
  sSc3?: string | null;
  sSc4?: string | null;
  sSc5?: string | null;
  sSc6?: string | null;
  sSc7?: string | null;
  sSc8?: string | null;
  sSc9?: string | null;
  sSc10?: string | null;
  gSc?: string | null;
  rT?: string | null;
  rTP?: string | null;
  mT?: string | null;
  sud?: string | null;
}

// ---- Bet Type Group Markets Summary ----

/** Detalhe de cabeçalho (header) de um set de odds. */
export interface HeaderSetDetailDto {
  id: number;
  name: string;
  viewIndex?: number;
}

/** Resumo de um bet type group com ordem, promoção e headers. */
export interface BtgSummary {
  betTypeGroupId: number;
  betTypeGroupName: string;
  orderBy?: number | null;
  asianOrderBy?: number | null;
  promoted?: boolean | null;
  mainBtgId?: number | null;
  mainBtgName?: string | null;
  mainBtgOrder?: number | null;
  hsd?: HeaderSetDetailDto[];
  cv?: number | null;
  cvp?: string | null;
  cvOrd?: number | null;
  dt: number;
  ddt?: number | null;
}

/** Mercado de bet type group summary com nome e lista de grupos. */
export interface BtgMarketSummary {
  betTypeGroupMarketId: number;
  betTypeGroupMarketName: string;
  betTypeGroups?: BtgSummary[];
}

/** Resumo de mercados de bet type group agrupado por esporte. */
export interface SportBtgMarketsSummary {
  sportTypeId?: number;
  betTypeGroupMarkets?: BtgMarketSummary[];
}
