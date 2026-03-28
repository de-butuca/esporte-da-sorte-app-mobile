export type PhaseId = 'rod1' | 'rod2' | 'rod3' | 'round16' | 'quarters' | 'semi' | 'thirdPlace' | 'final';
export type PickResult = string | 'draw';

export interface Team {
  code: string;
  name: string;
  flag: string;
  fifaRanking?: number;
}

export interface Match {
  id: string;
  homeTeam: Team | string;
  awayTeam: Team | string;
  date: string;
  time: string;
  group?: string;
  phase: PhaseId;
  allowDraw: boolean;
}

export interface Group {
  name: string;
  code: string;
  teams: Team[];
  matches: Match[];
}

export interface KnockoutPhase {
  id: PhaseId;
  name: string;
  matches: Match[];
}

export interface PhaseTab {
  id: PhaseId;
  label: string;
  shortLabel: string;
  matchCount: number;
  locked?: boolean;
}
