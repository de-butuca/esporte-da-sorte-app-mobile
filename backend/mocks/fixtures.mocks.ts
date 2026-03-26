// ============================================================
// Fixtures Mocks — Realistic mock data for Sport/Fixture APIs
// ============================================================

import {
  SportListResponse,
  TodaySportListResponse,
  BragiResponseListSportBtgMarketsSummary,
  SportType,
  TodaySportType,
  Category,
  Season,
  Fixture,
  FixtureBtg,
  FixtureOdd,
  SportBtgMarketsSummary,
} from '../models/fixtures.models';

// ---- Helper data ----

const now = new Date();
const inTwoHours = new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString();
const inFourHours = new Date(now.getTime() + 4 * 60 * 60 * 1000).toISOString();
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();

// ---- Fixture Odds ----

/** Odds mock de Futebol: 1X2 (Casa, Empate, Fora) para partidas brasileiras e espanholas. */
const mockFixtureOdds: FixtureOdd[] = [
  {
    foId: 980120001,
    btId: 1,
    btN: '1X2',
    valid: true,
    tvalid: true,
    freeze: false,
    prm: true,
    lineItem: false,
    hO: 1.85,
    hSh: '1',
    oc: '1',
  },
  {
    foId: 980120002,
    btId: 1,
    btN: '1X2',
    valid: true,
    tvalid: true,
    freeze: false,
    prm: true,
    lineItem: false,
    hO: 3.40,
    hSh: 'X',
    oc: 'X',
  },
  {
    foId: 980120003,
    btId: 1,
    btN: '1X2',
    valid: true,
    tvalid: true,
    freeze: false,
    prm: true,
    lineItem: false,
    hO: 4.20,
    hSh: '2',
    oc: '2',
  },
];

/** Odds mock de Basquete: Money Line (Casa, Fora) para NBA. */
const mockFixtureOddsBasketball: FixtureOdd[] = [
  {
    foId: 980130001,
    btId: 10,
    btN: 'Money Line',
    valid: true,
    tvalid: true,
    freeze: false,
    prm: true,
    lineItem: false,
    hO: 1.55,
    hSh: '1',
    oc: '1',
  },
  {
    foId: 980130002,
    btId: 10,
    btN: 'Money Line',
    valid: true,
    tvalid: true,
    freeze: false,
    prm: true,
    lineItem: false,
    hO: 2.45,
    hSh: '2',
    oc: '2',
  },
];

// ---- Fixture Btgs ----

/** Grupos de tipo de aposta: Main Markets para futebol. */
const mockFixtureBtgs: FixtureBtg[] = [
  {
    btgId: 1001,
    btgN: 'Main Markets',
    mrkp: 'main',
    btgSpl: false,
    btgSiOn: false,
    btgCe: false,
    dt: [1],
    prm: true,
    cshOut: true,
    lineItem: false,
    fos: mockFixtureOdds,
  },
];

// ---- Fixtures ----

/** Partidas mock: Flamengo×Palmeiras, Barcelona×Real Madrid, Lakers×Warriors. */
const mockFixtures: Fixture[] = [
  {
    fId: 5501001,
    fsd: inTwoHours,
    cshOut: true,
    ante: false,
    hcId: 2001,
    hcN: 'Flamengo',
    acId: 2002,
    acN: 'Palmeiras',
    lbO: false,
    lSt: false,
    vld: true,
    frz: false,
    fDS: 42,
    xid: 'sr:match:42837291',
    btgs: mockFixtureBtgs,
  },
  {
    fId: 5501002,
    fsd: inFourHours,
    cshOut: true,
    ante: false,
    hcId: 2003,
    hcN: 'Barcelona',
    acId: 2004,
    acN: 'Real Madrid',
    lbO: false,
    lSt: true,
    vld: true,
    frz: false,
    fDS: 78,
    xid: 'sr:match:42837292',
    btgs: [
      {
        btgId: 1002,
        btgN: 'Main Markets',
        mrkp: 'main',
        btgSpl: false,
        btgSiOn: false,
        btgCe: false,
        dt: [1],
        prm: true,
        cshOut: true,
        lineItem: false,
        fos: [
          { foId: 980120010, btId: 1, btN: '1X2', valid: true, tvalid: true, freeze: false, prm: true, lineItem: false, hO: 2.10, hSh: '1', oc: '1' },
          { foId: 980120011, btId: 1, btN: '1X2', valid: true, tvalid: true, freeze: false, prm: true, lineItem: false, hO: 3.25, hSh: 'X', oc: 'X' },
          { foId: 980120012, btId: 1, btN: '1X2', valid: true, tvalid: true, freeze: false, prm: true, lineItem: false, hO: 3.50, hSh: '2', oc: '2' },
        ],
      },
    ],
  },
  {
    fId: 5501003,
    fsd: tomorrow,
    cshOut: false,
    ante: false,
    hcId: 2005,
    hcN: 'Los Angeles Lakers',
    acId: 2006,
    acN: 'Golden State Warriors',
    lbO: false,
    lSt: false,
    vld: true,
    frz: false,
    fDS: 35,
    xid: 'sr:match:42837293',
    btgs: [
      {
        btgId: 1003,
        btgN: 'Winner',
        mrkp: 'winner',
        btgSpl: false,
        btgSiOn: false,
        btgCe: false,
        dt: [1],
        prm: true,
        cshOut: true,
        lineItem: false,
        fos: mockFixtureOddsBasketball,
      },
    ],
  },
];

// ---- Seasons ----

/** Temporadas mock: Brasileirão Série A, La Liga, NBA 2025–26. */
const mockSeasons: Season[] = [
  {
    sId: 30001,
    lId: 4001,
    seaN: 'Brasileirão Série A 2026',
    cshOut: true,
    lName: 'Brasileirão',
    seaSURL: 'brasileirao-serie-a',
    fs: [mockFixtures[0]],
  },
  {
    sId: 30002,
    lId: 4002,
    seaN: 'La Liga 2025/26',
    cshOut: true,
    lName: 'La Liga',
    seaSURL: 'la-liga',
    fs: [mockFixtures[1]],
  },
];

// ---- Categories ----

/** Categorias mock: Brasil, Espanha, EUA (com temporadas). */
const mockCategories: Category[] = [
  {
    cId: 700,
    cN: 'Brasil',
    iso: 'BR',
    ord: 1,
    sns: [mockSeasons[0]],
    cSURL: 'brasil',
  },
  {
    cId: 701,
    cN: 'Espanha',
    iso: 'ES',
    ord: 2,
    sns: [mockSeasons[1]],
    cSURL: 'espanha',
  },
];

// ---- Sport Types ----

/** Esportes mock: Futebol (2 categorias), Basquete (1), Tênis (0 partidas). */
const mockSportTypes: SportType[] = [
  {
    stId: 1,
    xid: 'sr:sport:1',
    stN: 'Futebol',
    iconId: 1,
    pid: 1,
    lvt: true,
    fCnt: 245,
    oCnt: 8430,
    aCnt: 12,
    stSURL: 'futebol',
    ord: 1,
    counts: { sport: 1, category: 48, league: 120, season: 120, fixture: 245, antepost: 12, fixtureBtg: 490, odd: 8430 },
    cs: mockCategories,
  },
  {
    stId: 2,
    xid: 'sr:sport:2',
    stN: 'Basquete',
    iconId: 2,
    pid: 1,
    lvt: true,
    fCnt: 87,
    oCnt: 2150,
    aCnt: 3,
    stSURL: 'basquete',
    ord: 2,
    counts: { sport: 1, category: 12, league: 30, season: 30, fixture: 87, antepost: 3, fixtureBtg: 174, odd: 2150 },
    cs: [
      {
        cId: 710,
        cN: 'EUA',
        iso: 'US',
        ord: 1,
        sns: [
          {
            sId: 30003,
            lId: 4003,
            seaN: 'NBA 2025/26',
            cshOut: true,
            lName: 'NBA',
            seaSURL: 'nba',
            fs: [mockFixtures[2]],
          },
        ],
        cSURL: 'eua',
      },
    ],
  },
  {
    stId: 3,
    xid: 'sr:sport:5',
    stN: 'Tênis',
    iconId: 3,
    pid: 1,
    lvt: true,
    fCnt: 62,
    oCnt: 940,
    aCnt: 0,
    stSURL: 'tenis',
    ord: 3,
  },
];

const mockTodaySportTypes: TodaySportType[] = [
  { stId: 1, xid: 'sr:sport:1', stN: 'Futebol', iconId: 1, pid: 1, lvt: true, fCnt: 48, oCnt: 1820, aCnt: 2, stSURL: 'futebol' },
  { stId: 2, xid: 'sr:sport:2', stN: 'Basquete', iconId: 2, pid: 1, lvt: true, fCnt: 16, oCnt: 560, aCnt: 0, stSURL: 'basquete' },
  { stId: 3, xid: 'sr:sport:5', stN: 'Tênis', iconId: 3, pid: 1, lvt: true, fCnt: 22, oCnt: 330, aCnt: 0, stSURL: 'tenis' },
  { stId: 4, xid: 'sr:sport:23', stN: 'Vôlei', iconId: 23, pid: 1, lvt: true, fCnt: 8, oCnt: 180, aCnt: 0, stSURL: 'volei' },
];

// ---- Bet Type Group Markets Summary ----

const mockBtgMarketsSummary: SportBtgMarketsSummary[] = [
  {
    sportTypeId: 1,
    betTypeGroupMarkets: [
      {
        betTypeGroupMarketId: 1,
        betTypeGroupMarketName: 'Popular',
        betTypeGroups: [
          { betTypeGroupId: 101, betTypeGroupName: '1X2', dt: 1, promoted: true, orderBy: 1, hsd: [{ id: 1, name: '1' }, { id: 2, name: 'X' }, { id: 3, name: '2' }] },
          { betTypeGroupId: 102, betTypeGroupName: 'Ambas Marcam', dt: 3, promoted: true, orderBy: 2 },
          { betTypeGroupId: 103, betTypeGroupName: 'Total de Gols', dt: 2, promoted: false, orderBy: 3, hsd: [{ id: 4, name: 'Mais' }, { id: 5, name: 'Menos' }] },
        ],
      },
      {
        betTypeGroupMarketId: 2,
        betTypeGroupMarketName: 'Handicap',
        betTypeGroups: [
          { betTypeGroupId: 201, betTypeGroupName: 'Handicap Asiático', dt: 2, promoted: false, orderBy: 1, hsd: [{ id: 6, name: '1' }, { id: 7, name: '2' }] },
        ],
      },
    ],
  },
  {
    sportTypeId: 2,
    betTypeGroupMarkets: [
      {
        betTypeGroupMarketId: 3,
        betTypeGroupMarketName: 'Popular',
        betTypeGroups: [
          { betTypeGroupId: 301, betTypeGroupName: 'Money Line', dt: 1, promoted: true, orderBy: 1, hsd: [{ id: 10, name: '1' }, { id: 11, name: '2' }] },
          { betTypeGroupId: 302, betTypeGroupName: 'Total de Pontos', dt: 2, promoted: true, orderBy: 2, hsd: [{ id: 12, name: 'Mais' }, { id: 13, name: 'Menos' }] },
        ],
      },
    ],
  },
];

// ---- Exported mock responses ----

/** Mock de resposta `SportListResponse` com 3 esportes, categorias, temporadas e partidas com odds. */
export const mockSportListResponse: SportListResponse = {
  data: mockSportTypes,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  success: true,
  type: 'sportList',
};

/** Mock de resposta `TodaySportListResponse` com 4 esportes e contagens de partidas. */
export const mockTodaySportListResponse: TodaySportListResponse = {
  data: mockTodaySportTypes,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  success: true,
  type: 'todaySportList',
};

/** Mock de resposta `BragiResponseListSportBtgMarketsSummary` para Futebol e Basquete. */
export const mockBtgMarketsResponse: BragiResponseListSportBtgMarketsSummary = {
  data: mockBtgMarketsSummary,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  success: true,
};
