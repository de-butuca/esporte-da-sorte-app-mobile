import type { Team, Group, KnockoutPhase, PhaseTab, PhaseId, Match } from './bolao.types';

export const TEAMS: Record<string, Team> = {
  USA: { code: 'USA', name: 'Estados Unidos', flag: '\u{1F1FA}\u{1F1F8}', fifaRanking: 11 },
  MEX: { code: 'MEX', name: 'M\u00E9xico', flag: '\u{1F1F2}\u{1F1FD}', fifaRanking: 14 },
  ZAF: { code: 'ZAF', name: '\u00C1frica do Sul', flag: '\u{1F1FF}\u{1F1E6}', fifaRanking: 59 },
  URU: { code: 'URU', name: 'Uruguai', flag: '\u{1F1FA}\u{1F1FE}', fifaRanking: 15 },
  ARG: { code: 'ARG', name: 'Argentina', flag: '\u{1F1E6}\u{1F1F7}', fifaRanking: 1 },
  PER: { code: 'PER', name: 'Peru', flag: '\u{1F1F5}\u{1F1EA}', fifaRanking: 32 },
  CAN: { code: 'CAN', name: 'Canad\u00E1', flag: '\u{1F1E8}\u{1F1E6}', fifaRanking: 40 },
  MAR: { code: 'MAR', name: 'Marrocos', flag: '\u{1F1F2}\u{1F1E6}', fifaRanking: 13 },
  BRA: { code: 'BRA', name: 'Brasil', flag: '\u{1F1E7}\u{1F1F7}', fifaRanking: 5 },
  COL: { code: 'COL', name: 'Col\u00F4mbia', flag: '\u{1F1E8}\u{1F1F4}', fifaRanking: 12 },
  JPN: { code: 'JPN', name: 'Jap\u00E3o', flag: '\u{1F1EF}\u{1F1F5}', fifaRanking: 18 },
  SRB: { code: 'SRB', name: 'S\u00E9rvia', flag: '\u{1F1F7}\u{1F1F8}', fifaRanking: 33 },
  FRA: { code: 'FRA', name: 'Fran\u00E7a', flag: '\u{1F1EB}\u{1F1F7}', fifaRanking: 2 },
  AUS: { code: 'AUS', name: 'Austr\u00E1lia', flag: '\u{1F1E6}\u{1F1FA}', fifaRanking: 24 },
  TUN: { code: 'TUN', name: 'Tun\u00EDsia', flag: '\u{1F1F9}\u{1F1F3}', fifaRanking: 42 },
  DEN: { code: 'DEN', name: 'Dinamarca', flag: '\u{1F1E9}\u{1F1F0}', fifaRanking: 21 },
  ESP: { code: 'ESP', name: 'Espanha', flag: '\u{1F1EA}\u{1F1F8}', fifaRanking: 8 },
  NED: { code: 'NED', name: 'Holanda', flag: '\u{1F1F3}\u{1F1F1}', fifaRanking: 7 },
  ECU: { code: 'ECU', name: 'Equador', flag: '\u{1F1EA}\u{1F1E8}', fifaRanking: 30 },
  KOR: { code: 'KOR', name: 'Coreia do Sul', flag: '\u{1F1F0}\u{1F1F7}', fifaRanking: 23 },
  GER: { code: 'GER', name: 'Alemanha', flag: '\u{1F1E9}\u{1F1EA}', fifaRanking: 3 },
  CRO: { code: 'CRO', name: 'Cro\u00E1cia', flag: '\u{1F1ED}\u{1F1F7}', fifaRanking: 10 },
  IRN: { code: 'IRN', name: 'Ir\u00E3', flag: '\u{1F1EE}\u{1F1F7}', fifaRanking: 20 },
  GHA: { code: 'GHA', name: 'Gana', flag: '\u{1F1EC}\u{1F1ED}', fifaRanking: 47 },
  ENG: { code: 'ENG', name: 'Inglaterra', flag: '\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}', fifaRanking: 4 },
  POR: { code: 'POR', name: 'Portugal', flag: '\u{1F1F5}\u{1F1F9}', fifaRanking: 6 },
  SEN: { code: 'SEN', name: 'Senegal', flag: '\u{1F1F8}\u{1F1F3}', fifaRanking: 17 },
  POL: { code: 'POL', name: 'Pol\u00F4nia', flag: '\u{1F1F5}\u{1F1F1}', fifaRanking: 28 },
  BEL: { code: 'BEL', name: 'B\u00E9lgica', flag: '\u{1F1E7}\u{1F1EA}', fifaRanking: 9 },
  SUI: { code: 'SUI', name: 'Su\u00ED\u00E7a', flag: '\u{1F1E8}\u{1F1ED}', fifaRanking: 16 },
  CMR: { code: 'CMR', name: 'Camar\u00F5es', flag: '\u{1F1E8}\u{1F1F2}', fifaRanking: 44 },
  KSA: { code: 'KSA', name: 'Ar\u00E1bia Saudita', flag: '\u{1F1F8}\u{1F1E6}', fifaRanking: 56 },
};

const createGroupMatches = (
  groupCode: string,
  teams: [string, string, string, string],
  dates: [string, string, string],
  times: [string, string, string, string, string, string],
): Match[] => {
  const t = teams.map((key) => TEAMS[key]);
  return [
    { id: `GS-${groupCode}-1`, homeTeam: t[0], awayTeam: t[1], date: dates[0], time: times[0], group: groupCode, phase: 'rod1' as PhaseId, allowDraw: true },
    { id: `GS-${groupCode}-2`, homeTeam: t[2], awayTeam: t[3], date: dates[0], time: times[1], group: groupCode, phase: 'rod1' as PhaseId, allowDraw: true },
    { id: `GS-${groupCode}-3`, homeTeam: t[0], awayTeam: t[2], date: dates[1], time: times[2], group: groupCode, phase: 'rod2' as PhaseId, allowDraw: true },
    { id: `GS-${groupCode}-4`, homeTeam: t[3], awayTeam: t[1], date: dates[1], time: times[3], group: groupCode, phase: 'rod2' as PhaseId, allowDraw: true },
    { id: `GS-${groupCode}-5`, homeTeam: t[3], awayTeam: t[0], date: dates[2], time: times[4], group: groupCode, phase: 'rod3' as PhaseId, allowDraw: true },
    { id: `GS-${groupCode}-6`, homeTeam: t[1], awayTeam: t[2], date: dates[2], time: times[5], group: groupCode, phase: 'rod3' as PhaseId, allowDraw: true },
  ];
};

const groupATeams: [string, string, string, string] = ['USA', 'MEX', 'ZAF', 'URU'];
const groupBTeams: [string, string, string, string] = ['ARG', 'PER', 'CAN', 'MAR'];
const groupCTeams: [string, string, string, string] = ['BRA', 'COL', 'JPN', 'SRB'];
const groupDTeams: [string, string, string, string] = ['FRA', 'AUS', 'TUN', 'DEN'];
const groupETeams: [string, string, string, string] = ['ESP', 'NED', 'ECU', 'KOR'];
const groupFTeams: [string, string, string, string] = ['GER', 'CRO', 'IRN', 'GHA'];
const groupGTeams: [string, string, string, string] = ['ENG', 'POR', 'SEN', 'POL'];
const groupHTeams: [string, string, string, string] = ['BEL', 'SUI', 'CMR', 'KSA'];

export const GROUPS: Group[] = [
  {
    name: 'Grupo A',
    code: 'A',
    teams: groupATeams.map((key) => TEAMS[key]),
    matches: createGroupMatches('A', groupATeams, ['2026-06-11', '2026-06-17', '2026-06-23'], ['13:00', '16:00', '13:00', '16:00', '18:00', '18:00']),
  },
  {
    name: 'Grupo B',
    code: 'B',
    teams: groupBTeams.map((key) => TEAMS[key]),
    matches: createGroupMatches('B', groupBTeams, ['2026-06-12', '2026-06-18', '2026-06-24'], ['13:00', '16:00', '13:00', '16:00', '18:00', '18:00']),
  },
  {
    name: 'Grupo C',
    code: 'C',
    teams: groupCTeams.map((key) => TEAMS[key]),
    matches: createGroupMatches('C', groupCTeams, ['2026-06-13', '2026-06-19', '2026-06-25'], ['10:00', '13:00', '10:00', '13:00', '16:00', '16:00']),
  },
  {
    name: 'Grupo D',
    code: 'D',
    teams: groupDTeams.map((key) => TEAMS[key]),
    matches: createGroupMatches('D', groupDTeams, ['2026-06-14', '2026-06-20', '2026-06-26'], ['10:00', '13:00', '10:00', '13:00', '16:00', '16:00']),
  },
  {
    name: 'Grupo E',
    code: 'E',
    teams: groupETeams.map((key) => TEAMS[key]),
    matches: createGroupMatches('E', groupETeams, ['2026-06-15', '2026-06-21', '2026-06-27'], ['13:00', '16:00', '13:00', '16:00', '18:00', '18:00']),
  },
  {
    name: 'Grupo F',
    code: 'F',
    teams: groupFTeams.map((key) => TEAMS[key]),
    matches: createGroupMatches('F', groupFTeams, ['2026-06-16', '2026-06-22', '2026-06-28'], ['13:00', '16:00', '13:00', '16:00', '18:00', '18:00']),
  },
  {
    name: 'Grupo G',
    code: 'G',
    teams: groupGTeams.map((key) => TEAMS[key]),
    matches: createGroupMatches('G', groupGTeams, ['2026-06-11', '2026-06-17', '2026-06-23'], ['10:00', '19:00', '10:00', '19:00', '16:00', '16:00']),
  },
  {
    name: 'Grupo H',
    code: 'H',
    teams: groupHTeams.map((key) => TEAMS[key]),
    matches: createGroupMatches('H', groupHTeams, ['2026-06-12', '2026-06-18', '2026-06-24'], ['10:00', '19:00', '10:00', '19:00', '16:00', '16:00']),
  },
];

export const KNOCKOUT_PHASES: KnockoutPhase[] = [
  {
    id: 'round16',
    name: 'Oitavas de Final',
    matches: [
      { id: 'R16-1', homeTeam: '1°A', awayTeam: '2°B', date: '2026-07-01', time: '13:00', phase: 'round16', allowDraw: false },
      { id: 'R16-2', homeTeam: '1°C', awayTeam: '2°D', date: '2026-07-01', time: '16:00', phase: 'round16', allowDraw: false },
      { id: 'R16-3', homeTeam: '1°B', awayTeam: '2°A', date: '2026-07-02', time: '13:00', phase: 'round16', allowDraw: false },
      { id: 'R16-4', homeTeam: '1°D', awayTeam: '2°C', date: '2026-07-02', time: '16:00', phase: 'round16', allowDraw: false },
      { id: 'R16-5', homeTeam: '1°E', awayTeam: '2°F', date: '2026-07-03', time: '13:00', phase: 'round16', allowDraw: false },
      { id: 'R16-6', homeTeam: '1°G', awayTeam: '2°H', date: '2026-07-03', time: '16:00', phase: 'round16', allowDraw: false },
      { id: 'R16-7', homeTeam: '1°F', awayTeam: '2°E', date: '2026-07-04', time: '13:00', phase: 'round16', allowDraw: false },
      { id: 'R16-8', homeTeam: '1°H', awayTeam: '2°G', date: '2026-07-04', time: '16:00', phase: 'round16', allowDraw: false },
    ],
  },
  {
    id: 'quarters',
    name: 'Quartas de Final',
    matches: [
      { id: 'QF-1', homeTeam: 'Venc. R16-1', awayTeam: 'Venc. R16-2', date: '2026-07-09', time: '13:00', phase: 'quarters', allowDraw: false },
      { id: 'QF-2', homeTeam: 'Venc. R16-3', awayTeam: 'Venc. R16-4', date: '2026-07-09', time: '16:00', phase: 'quarters', allowDraw: false },
      { id: 'QF-3', homeTeam: 'Venc. R16-5', awayTeam: 'Venc. R16-6', date: '2026-07-10', time: '13:00', phase: 'quarters', allowDraw: false },
      { id: 'QF-4', homeTeam: 'Venc. R16-7', awayTeam: 'Venc. R16-8', date: '2026-07-10', time: '16:00', phase: 'quarters', allowDraw: false },
    ],
  },
  {
    id: 'semi',
    name: 'Semifinais',
    matches: [
      { id: 'SF-1', homeTeam: 'Venc. QF-1', awayTeam: 'Venc. QF-2', date: '2026-07-14', time: '16:00', phase: 'semi', allowDraw: false },
      { id: 'SF-2', homeTeam: 'Venc. QF-3', awayTeam: 'Venc. QF-4', date: '2026-07-15', time: '16:00', phase: 'semi', allowDraw: false },
    ],
  },
  {
    id: 'thirdPlace',
    name: 'Disputa de 3° Lugar',
    matches: [
      { id: '3RD', homeTeam: 'Perd. SF-1', awayTeam: 'Perd. SF-2', date: '2026-07-18', time: '16:00', phase: 'thirdPlace', allowDraw: false },
    ],
  },
  {
    id: 'final',
    name: 'Final',
    matches: [
      { id: 'FIN', homeTeam: 'Venc. SF-1', awayTeam: 'Venc. SF-2', date: '2026-07-19', time: '16:00', phase: 'final', allowDraw: false },
    ],
  },
];

export const ALL_PHASES: PhaseTab[] = [
  { id: 'rod1', label: 'Rodada 1', shortLabel: 'Rodada 1', matchCount: 16 },
  { id: 'rod2', label: 'Rodada 2', shortLabel: 'Rodada 2', matchCount: 16 },
  { id: 'rod3', label: 'Rodada 3', shortLabel: 'Rodada 3', matchCount: 16 },
  { id: 'round16', label: 'Oitavas de Final', shortLabel: 'Oitavas', matchCount: 8, locked: true },
  { id: 'quarters', label: 'Quartas de Final', shortLabel: 'Quartas', matchCount: 4, locked: true },
  { id: 'semi', label: 'Semifinais', shortLabel: 'Semis', matchCount: 2, locked: true },
  { id: 'thirdPlace', label: 'Disputa 3° Lugar', shortLabel: '3° Lugar', matchCount: 1, locked: true },
  { id: 'final', label: 'Final', shortLabel: 'Final', matchCount: 1, locked: true },
];

export const getMatchesByPhase = (phase: PhaseId): Match[] => {
  if (phase === 'rod1' || phase === 'rod2' || phase === 'rod3') {
    return GROUPS.flatMap((group) => group.matches.filter((match) => match.phase === phase));
  }

  const knockoutPhase = KNOCKOUT_PHASES.find((kp) => kp.id === phase);
  return knockoutPhase?.matches ?? [];
};
