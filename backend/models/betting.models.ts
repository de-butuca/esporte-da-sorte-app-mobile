export interface PlayedOdd {
  fo?: number;
  ba?: boolean;
  fr?: number;
}

export interface Coupon {
  pa?: number;
  ci?: number;
  cs?: number;
  ce?: number;
  ib?: boolean;
  po?: PlayedOdd[];
}

export interface CouponWrapper {
  cps?: Coupon[];
  ip?: boolean;
  ar?: boolean;
  ad?: boolean;
  fb?: number;
  bo?: number;
  sbm?: number;
  dev?: string;
}

export interface PopularOddDto {
  fId?: number;
  hcN?: string;
  acN?: string;
  fsd?: number;
  btgN?: string;
  fOId?: number;
  odd?: number;
  selectionName?: string;
  freeze?: boolean;
  outcomeId?: number;
  competitors?: string;
  sov?: string;
  outcomeValue?: string;
  outcomeValueMobile?: string;
  playerName?: string;
  selectionShortName?: string;
  isAntePost?: boolean;
  fixtureInfo?: string;
}

export type SportBetStatusTypeEnum = 'O' | 'W' | 'L' | 'w' | 'I' | 'V' | 'D';

export interface VerifyTicketResult {
  verifyTicketDetailResults?: VerifyTicketDetailResult[];
  sportBetMaster?: SportBetMaster;
}

export interface VerifyTicketDetailResult {
  sportBetDetailId?: number;
  sbSportBetId?: number;
  sbPlayedAmount?: number;
  sbBetRate?: number;
  sbPossibleReturnAmount?: number;
  sbReturnAmount?: number;
  sbTotalPlay?: number;
  isAntePost?: boolean;
  fixtureId?: number;
  fixtureInformation?: string;
  sbStatus?: string;
  homeCompetitorName?: string;
  awayCompetitorName?: string;
  sbtId?: number;
  btgId?: number;
  sbtName?: string;
  sbtDescription?: string;
  sbdSelection?: string;
  sbdDate?: number;
  sbdPlayedOdd?: number;
  leagueName?: string;
  isVirtual?: boolean;
  isLiveBet?: boolean;
  clearedScore?: string;
  return1?: number;
  return2?: number;
  return3?: number;
  return4?: number;
  countryName?: string;
  sportTypeName?: string;
  seasonName?: string;
  betradarValue?: string;
  betradarSpecialValue?: string;
  playerName?: string;
  selectionStr?: string;
  cashoutAmount?: number;
  sbInitialPlayedAmount?: number;
  sbInitialPosRetAmount?: number;
  sbMbBonusAmount?: number;
  sbTaxAmount?: number;
  sbStakeTaxAmount?: number;
  sbEffectivePlayedAmount?: number;
  cashoutErrorCode?: Record<string, unknown>;
  sportBetStatusEnumType?: SportBetStatusTypeEnum;
}

export interface PromotionCoupon {
  sportBetMasterId?: number;
  freebetId?: number;
  freebetAmount?: number;
  bonusId?: number;
  bonusAmount?: number;
  discountId?: number;
  discountAmount?: number;
  totalAmount?: number;
}

export interface SportBetMaster {
  sportBetMasterId?: number;
  customerId?: number;
  playedAmount?: number;
  possibleReturnAmount?: number;
  returnAmount?: number;
  status?: string;
  totalBets?: number;
  totalOpenBets?: number;
  totalWinBets?: number;
  totalLoseBets?: number;
  totalVoidBets?: number;
  isLiveBet?: boolean;
  sessionId?: string;
  sportBetMasterTmpId?: number;
  createUserId?: number;
  createUserDate?: number;
  createUserIp?: string;
  globalRecordId?: number;
  instantPlay?: boolean;
  acceptRateChanges?: boolean;
  cashoutAmount?: number;
  initialPlayedAmount?: number;
  initialPosRetAmount?: number;
  mbBonusAmount?: number;
  taxAmount?: number;
  stakeTaxAmount?: number;
  effectivePlayedAmount?: number;
  cashoutErrorCode?: Record<string, unknown>;
  currencyId?: number;
  sportBetStatusEnumType?: SportBetStatusTypeEnum;
  promotionCoupon?: PromotionCoupon;
}

export type PromotionType = 'FREEBET' | 'BONUS' | 'DISCOUNT' | 'CASINO_BONUS' | 'OTHERS';

export interface ClaimablePromotion {
  id?: number;
  name?: string;
  amount?: number;
  promotionType?: PromotionType;
}

export interface MbbResult {
}

export interface CouponPlayResult {
  playedAmount?: number;
  playedOdd?: number;
  possibleReturnAmount?: number;
  totalBets?: number;
  columnPlayedAmount?: number;
  columnBetRate?: number;
  columnPossibleReturnAmount?: number;
  sportBetTmpId?: number;
  opponents?: string;
  matchStartDate?: number;
  betTypeName?: string;
  selection?: string;
  fixtureOddId?: number;
  homeCompetitorName?: string;
  awayCompetitorName?: string;
  sbtId?: number;
  btgId?: number;
  sbtName?: string;
  sbtDescription?: string;
  fixtureInformation?: string;
  isAntePost?: boolean;
  fixtureId?: number;
  return1?: number;
  return2?: number;
  return3?: number;
  return4?: number;
  playerName?: string;
  selectionStr?: string;
  mbBonusAmount?: number;
  initialPosRetAmount?: number;
  sbmMbBonusAmount?: number;
  sbmInitialPosRetAmount?: number;
  possibleReturnAmountAfterTax?: number;
  taxAmount?: number;
  stakeTaxAmount?: number;
  effectivePlayedAmount?: number;
  exceedMaxPayout?: boolean;
  isBetBuilder?: boolean;
}

export interface SportsBetPlayResult {
  couponPlayResults?: CouponPlayResult[];
  sportsBetMasterId?: number;
  sportBetMasterCode?: string;
  sportBetRealBalance?: number;
  playedAmount?: number;
  possibleReturnAmount?: number;
  possibleReturnAmountAfterTax?: number;
  possibleReturnAmountBeforeTax?: number;
  initialPossibleReturnAmount?: number;
  taxAmount?: number;
  taxRate?: number;
  secTaxAmount?: number;
  stakeTaxAmount?: number;
  effectivePlayedAmount?: number;
  stakeTaxRate?: number;
  exceedMaxPayout?: boolean;
  possibleReturnAmountExcFreebet?: number;
  isBetbuilderBet?: boolean;
  mbbResult?: MbbResult;
  claimablePromotions?: ClaimablePromotion[];
}

export interface FugasoJackpots {
  errorCode?: number;
  description?: string;
  jackpots?: FugasoJackpot;
}

export interface FugasoJackpot {
  mini?: number;
  midi?: number;
  maxi?: number;
}

export interface Jackpot {
  jackpotId?: number;
  traderId?: number;
  name?: string;
  order?: number;
  jackpotPrize?: number;
  ticketStake?: number;
  jackpotEventCount?: number;
  reservedEventCount?: number;
  betTypeGroupId?: number;
  currencyId?: number;
  active?: boolean;
  validDesktop?: boolean;
  validMobile?: boolean;
  startDate?: number;
  endDate?: number;
  createUserId?: number;
  createUserDate?: number;
  updateUserId?: number;
  updateUserDate?: number;
  finalised?: boolean;
  showOnJackpot?: boolean;
  showOnResult?: boolean;
  minimumFixtureStartDate?: number;
  validRetail?: boolean;
  validOnline?: boolean;
  maxJackpotEntries?: number;
  remainingPossibleEntries?: number;
  jackpotConsolations?: Record<string, JackpotConsolations>;
  fixtures?: Record<string, JackpotFocusedFixtures>;
  results?: JackpotResult[];
}

export interface JackpotConsolations {
  jackpotConsolationId?: number;
  jackpotId?: number;
  wonEventCount?: number;
  totalPrize?: number;
}

export interface JackpotFocusedFixtures {
  jackpotFocusedFixtureId?: number;
  jackpotId?: number;
  fixtureId?: number;
  orderBy?: number;
  reserved?: boolean;
  countryId?: number;
  categoryId?: number;
  sportTypeId?: number;
  fixtureStartDate?: number;
}

export interface JackpotResult {
  jackpotResultId?: number;
  jackpotId?: number;
  wonJackpot?: boolean;
  wonEventCount?: number;
  winnerCount?: number;
  prize?: number;
}

export interface JackpotResultDetail {
  fixtureId?: number;
  reserved?: boolean;
  orderBy?: number;
  betTypeGroupName?: string;
  sportTypeName?: string;
  leagueName?: string;
  countryName?: string;
  fixtureStartDate?: number;
  homeCompetitorName?: string;
  awayCompetitorName?: string;
  clearedScore?: string;
  competitors?: Competitor[];
  fixtureScores?: FixtureScore[];
}

export interface Competitor {
  competitorId?: number;
  countryId?: number;
  sportTypeId?: number;
  competitorName?: string;
  active?: boolean;
}

export interface FixtureScore {
  sportTypeId?: number;
  fixtureScoreId?: number;
  fixtureId?: number;
  parentProviderId?: number;
  externalProviderId?: number;
  type?: string;
  score?: string;
}
