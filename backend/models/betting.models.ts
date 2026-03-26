// ============================================================
// Betting Models — Coupons, popular odds, booking, verify
//                  ticket, play result, jackpots
// Generated from OpenAPI spec (Casino API v1.0.0)
// ============================================================

// ---- Coupon / Bet Placement ----

/** Odd jogada dentro de um cupom de aposta. */
export interface PlayedOdd {
  fo?: number;
  ba?: boolean;
  fr?: number;
}

/** Cupom individual com valor apostado, moeda e odds selecionadas. */
export interface Coupon {
  pa?: number;
  ci?: number;
  cs?: number;
  ce?: number;
  ib?: boolean;
  po?: PlayedOdd[];
}

/** Wrapper de cupom para envio (contém múltiplos cupons e configurações). */
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

// ---- Popular Odds ----

/** Odd popular em destaque com dados de partida, valor da odd e seleção. */
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

// ---- Verify Ticket ----

/** Status de aposta: O=Open, W=Won, L=Lost, w=Won-minor, I=Invalid, V=Void, D=Draw/Deleted. */
export type SportBetStatusTypeEnum = 'O' | 'W' | 'L' | 'w' | 'I' | 'V' | 'D';

/** Resultado de verificação de bilhete com detalhes e dados do bilhete principal. */
export interface VerifyTicketResult {
  verifyTicketDetailResults?: VerifyTicketDetailResult[];
  sportBetMaster?: SportBetMaster;
}

/** Detalhe individual de uma aposta dentro de um bilhete verificado. */
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

/** Promoção associada a um cupom (freebet, bônus, desconto). */
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

/** Bilhete de aposta principal com valores, status, totais e dados de promoção. */
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

// ---- Sports Bet Play Result ----

/** Tipo de promoção aplicável: freebet, bônus, desconto, cassino ou outros. */
export type PromotionType = 'FREEBET' | 'BONUS' | 'DISCOUNT' | 'CASINO_BONUS' | 'OTHERS';

/** Promoção reclamável após aposta (freebet, bônus de cassino, etc.). */
export interface ClaimablePromotion {
  id?: number;
  name?: string;
  amount?: number;
  promotionType?: PromotionType;
}

/** Resultado de multi-bet bonus — schema sem propriedades no OpenAPI. */
export interface MbbResult {
  // Placeholder — schema has no properties
}

/** Resultado individual de um cupom após aposta (odds, valores, partida). */
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

/** Resultado completo de aposta com cupons, valores totais e promoções. */
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

// ---- Jackpots ----

/** Valores dos jackpots do provedor Fugaso (mini, midi, maxi). */
export interface FugasoJackpots {
  errorCode?: number;
  description?: string;
  jackpots?: FugasoJackpot;
}

/** Valores individuais dos níveis de jackpot Fugaso. */
export interface FugasoJackpot {
  mini?: number;
  midi?: number;
  maxi?: number;
}

/** Jackpot esportivo com prêmio, eventos, consolações e resultados. */
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

/** Prêmio de consolação do jackpot por quantidade de acertos. */
export interface JackpotConsolations {
  jackpotConsolationId?: number;
  jackpotId?: number;
  wonEventCount?: number;
  totalPrize?: number;
}

/** Partida vinculada ao jackpot com ordem e dados de localização. */
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

/** Resultado de um sorteio de jackpot (vencedores, prêmio, acertos). */
export interface JackpotResult {
  jackpotResultId?: number;
  jackpotId?: number;
  wonJackpot?: boolean;
  wonEventCount?: number;
  winnerCount?: number;
  prize?: number;
}

/** Detalhe de resultado de jackpot com partida, placar e competidores. */
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

/** Competidor (time) com nome, país e esporte. */
export interface Competitor {
  competitorId?: number;
  countryId?: number;
  sportTypeId?: number;
  competitorName?: string;
  active?: boolean;
}

/** Placar de partida com tipo (halftime, fulltime) e valor. */
export interface FixtureScore {
  sportTypeId?: number;
  fixtureScoreId?: number;
  fixtureId?: number;
  parentProviderId?: number;
  externalProviderId?: number;
  type?: string;
  score?: string;
}
