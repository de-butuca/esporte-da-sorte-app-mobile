import { BragiResponseCode } from './common.models';

export interface SportListResponse {
  data?: SportType[];
  responseCodes?: BragiResponseCode[];
  success?: boolean;
  type?: string;
}

export interface TodaySportListResponse {
  data?: TodaySportType[];
  responseCodes?: BragiResponseCode[];
  success?: boolean;
  type?: string;
}

export interface BragiResponseListSportBtgMarketsSummary {
  data?: SportBtgMarketsSummary[];
  responseCodes?: BragiResponseCode[];
  success?: boolean;
}

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

export interface SportType extends TodaySportType {
  cmt?: number | null;
  counts?: EntityCounts | null;
  ord?: number | null;
  lse?: boolean | null;
  cs?: Category[] | null;
}

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

export interface BtgMarket {
  btgMId: number;
  btgMN: string;
  btgMOrd?: number | null;
  oCnt: number;
}

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

export interface HeaderSetDetailDto {
  id: number;
  name: string;
  viewIndex?: number;
}

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

export interface BtgMarketSummary {
  betTypeGroupMarketId: number;
  betTypeGroupMarketName: string;
  betTypeGroups?: BtgSummary[];
}

export interface SportBtgMarketsSummary {
  sportTypeId?: number;
  betTypeGroupMarkets?: BtgMarketSummary[];
}
