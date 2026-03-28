export interface ApplicationSetting {
  parameter?: string;
  parameterDescription?: string;
  value?: string;
  project?: string;
}

export interface TraderDefaults {
  cDT?: number;
  dCI?: number;
  dLI?: number;
  sMPA?: number;
  rsMPA?: number;
  tIAFB?: number;
  tIAFT?: number;
  tIAFOP?: number;
  tIT?: string;
  tIS?: string;
  tSM?: boolean;
  tTDC?: boolean;
  tDDC?: boolean;
  tWDC?: boolean;
  tLVS?: boolean;
  tRCK?: string;
  kGMU?: string;
  kGWU?: string;
  tPC?: string;
  tAU?: string;
  tBS?: boolean;
  tCDNU?: string;
  tFOM?: boolean;
  tAMI?: string;
  tGSV?: string;
  tBWMU?: string;
  tBWU?: string;
  tBU?: string;
  rUSU?: string;
  tTGO?: string;
  tKGO?: string;
  tSS?: boolean;
  tMLP?: boolean;
  tCP?: boolean;
  tKYCON?: boolean;
  tTEN?: boolean;
  tINU?: string;
  tFAU?: string;
  tTWU?: string;
  tYTU?: string;
  tGGU?: string;
  tDTF?: boolean;
  bTC?: boolean;
  otpSms?: boolean;
  tRSO?: boolean;
  tREO?: boolean;
  tFAV?: boolean;
  trit?: boolean;
  regSMS?: boolean;
  tAL?: number;
  tICE?: boolean;
  tBTGL?: number;
  tKYCSignUp?: boolean;
  mts?: boolean;
  tREA?: boolean;
  tRSP?: boolean;
  tIgnoreKycWdraw?: boolean;
  eSport?: number[];
  NumBetSlip?: number;
  tCustRegForm?: boolean;
  tForgotPassMethod?: string;
  tCustRegEnabled?: boolean;
  tRegActMethod?: string;
  tRegisterPassMethod?: string;
  tLoginOptions?: string;
  NumSysC?: number;
  tBSYS?: boolean;
  tCA?: boolean;
  tPCA?: boolean;
  tCAA?: boolean;
  liveGamesScript?: boolean;
  tCoolOffPeriod?: string;
  tVNCN?: boolean;
  tEMRW?: boolean;
  tMBB?: boolean;
  ftpMFS?: number;
  tSelfExcCoolOffPeriod?: string;
  dLGRB?: boolean;
  dLGLB?: boolean;
  mLGMB?: boolean;
  BMMPFL?: boolean;
  showDifferentOddTypes?: boolean;
  tVRT?: boolean;
  whereDidYouHearAboutUs?: boolean;
  defaultViewType?: number;
  uofEnabled?: boolean;
  jpOpen?: boolean;
  jpMS?: boolean;
  jpMJ?: boolean;
  jpShare?: boolean;
  cannotCancelWithdRequest?: boolean;
  tje?: boolean;
  popCasGames?: boolean;
  esportModule?: boolean;
  virtModule?: boolean;
  fifa2020?: boolean;
  casinoCategoryList?: number[];
  liveCasinoCategoryList?: number[];
  eje?: boolean;
  eju?: string;
  usePersInfoForPromotions?: string;
  tCB?: boolean;
  showMessageNotif?: boolean;
  gre?: boolean;
  ue?: boolean;
  statisticsOpen?: boolean;
  livescoresOpen?: boolean;
  twitchStreamEnabled?: boolean;
  rCDNU?: string;
  tRBWMU?: string;
  tRBU?: string;
  tFDMLC?: number;
  tFDMBTC?: number;
  tTPMLC?: number;
  tAMCIS?: boolean;
  rCBTCA?: boolean;
  tHideTax?: boolean;
  tULOB?: boolean;
  tAMBBT?: boolean;
  tSTAX?: number;
  tSAT?: boolean;
  resetPassOptions?: string[];
  tCMBW?: boolean;
  liveCards?: boolean;
  dbtis?: boolean;
  redirectDepositAfterRegister?: boolean;
  wbtis?: boolean;
  ejed?: string;
  tjed?: string;
  taMBQAM?: string;
  readyCouponBetSliderAmounts?: string;
  taBQAM?: string;
  saveWithdrawAccounts?: boolean;
  isu?: string;
  bhe?: boolean;
  rspcfi?: boolean;
  cts?: boolean;
  disableRegister?: boolean;
  lmtCollapsed?: boolean;
  lmtScrollFixed?: boolean;
  payMW?: boolean;
  isVisibleTransactionNotetoWeb?: boolean;
  realityCheck?: boolean;
  mgaRulesEnabled?: boolean;
  sabmw?: boolean;
  upcomingEventNumberToDisplay?: number;
  enableEgtMinigames?: boolean;
  clicktelligence?: boolean;
  ocgnw?: boolean;
  cbpc?: boolean;
  cfpc?: boolean;
  cbp?: number;
  cfp?: number;
  acceptOddChanges?: boolean;
  mobileDisplayTemplateBasedUI?: boolean;
  mobilePeriodTypeViewEnabled?: boolean;
  mobileShowFirstNewTemplateTab?: boolean;
  voluumAffiliateEnabled?: boolean;
  wpod?: boolean;
  taEGW?: boolean;
  egtWidget?: boolean;
  hideTwoStepVerification?: boolean;
  showPromotedBetTypesOnly?: boolean;
  tvGamesEnabled?: boolean;
  friendReferralWithReferenceCode?: boolean;
  customNavbarEnabled?: boolean;
  posReturnLessThanStakeNotify?: boolean;
  hideBookABet?: boolean;
  betMarketFavoritesIsActive?: boolean;
  liteUrl?: string;
  todayEventsMobileFilter?: boolean;
  tACMPL?: boolean;
  tMPCN?: boolean;
  tMPL?: number;
  sfai?: boolean;
  openLoginModalAfterActivation?: boolean;
  mtsDeltaFeedEnabled?: boolean;
  betradarTrackerV3ClientId?: string;
  showBonusTextOnDeposits?: boolean;
  isJetxActive?: boolean;
  isAviatorActive?: boolean;
  vipWebsite?: boolean;
  minPlayAmountAppearance?: number;
  betongamesEnabled?: boolean;
  autoLoginAfterRegister?: boolean;
  lessThan2Enabled?: boolean;
  footerLiveWidget?: boolean;
  gliShowSessionDuration?: boolean;
  trackingManagementEnabled?: boolean;
  isEventPokerOpen?: boolean;
  eventPokerGameId?: string;
  clearBetslipAfterPlaceBet?: string;
  widgetEnabled?: boolean;
  betbuilderEnabled?: boolean;
  betgamesWidgetEnabled?: boolean;
  depositDetailsMetric?: boolean;
  gtagId?: string;
  verifySmsEmailOnUpdateCustomer?: boolean;
  gliCertOperator?: boolean;
  gliShowBalanceHistory?: boolean;
  virtualBetOrder?: string[];
  showNewMessageNotification?: boolean;
  playNewMessageNotificationSound?: boolean;
  isMobileExpandedLmtV3?: boolean;
  sTournamentGroupNames?: string;
  enableModalOnKycUpload?: boolean;
  gsle?: boolean;
  csmblm?: boolean;
  esaGamingWidgetType?: string;
  hideCustomerCountry?: boolean;
  traderPermissionSelfLimitUpdate?: boolean;
  showCustomCasinoCategoriesPage?: boolean;
  apa?: boolean;
  csbc?: boolean;
  lmtOnPrelive?: boolean;
  promoCodeIsActive?: boolean;
  customAccountPersonalInfo?: boolean;
  enableGoogleRegistration?: boolean;
  keepMeLoggedInActive?: boolean;
  keepMeLoggedInDaysLimit?: number;
  callBookABet?: boolean;
  crossProductLimitsEnable?: boolean;
  agtOnlineBetRepTransDateFtr?: number;
  preferredCountriesPhone?: string[];
  forcedPhoneCountry?: string[];
  externalAuth?: string[];
  termsAndConditionModalLanguage?: string[];
  signupCurrencyForCountries?: string[];
  customerLoginLogsPageEnabled?: boolean;
  responsibleGamingEnabled?: boolean;
  autoWithdrawalEnabled?: boolean;
  financialInfoPageEnabled?: boolean;
  realityCheckPopUpEnabled?: boolean;
  realityCheckPopUpInterval?: number;
  geolocationLoginEnabled?: boolean;
  geolocationBetEnabled?: boolean;
  geolocationCheckCoolOffInterval?: number;
  addressFromZipCode?: boolean;
  showLoginMessage?: boolean;
}

export interface Module {
  moduleId?: number;
  moduleName?: string;
  isActive?: boolean;
  orderBy?: number;
  isShowHomePage?: boolean;
  isShowLandingPage?: boolean;
  moduleCode?: string;
  manual?: boolean;
  whichSide?: string;
  moduleData?: ModuleData[];
  traderModules?: TraderModules[];
}

export interface ModuleData {
  moduleDataId?: number;
  moduleId?: number;
  leagueId?: number;
  fixtureId?: number;
  sportTypeId?: number;
  selectionId?: number;
  betTypeId?: number;
  traderId?: number;
  seasonId?: number;
  fixtureOddId?: number;
  active?: boolean;
  whichSide?: string;
  orderBy?: number;
  device?: string;
  hasImage?: boolean;
  stSURL?: string;
  cSURL?: string;
  seaSURL?: string;
  extraInfo?: string;
  isScheduled?: boolean;
  startDate?: number;
  endDate?: number;
  readyCoupon?: ReadyCoupon[];
}

export interface ReadyCoupon {
  readyCouponId?: number;
  fixtureId?: number;
  fixtureOddId?: number;
  fixtureOddId2?: number;
  fixtureOddId3?: number;
  selectionId?: number;
  startDate?: number;
  expiryDate?: number;
  couponName?: string;
  moduleDataId?: number;
}

export interface TraderModules {
  traderModuleId?: number;
  traderId?: number;
  moduleName?: string;
  isShowHomePage?: boolean;
  isShowLandingPage?: boolean;
  moduleCode?: string;
  manual?: boolean;
  whichSide?: string;
  moduleId?: number;
  isWebActive?: boolean;
  isMobileActive?: boolean;
  orderInWeb?: number;
  orderInMobile?: number;
}

export interface TraderNavbarMenu {
  menu_name?: string;
  order?: number;
  web_multilanguage_id?: number;
  web_multilanguage_key?: string;
  url?: string;
  icon?: string;
  sub_menu?: TraderNavbarMenu[];
}

export interface TraderOddDisplayType {
  oddDisplayTypeId?: number;
  oddDisplayTypeName?: string;
  oddDisplayTypeCode?: string;
  traderOddDisplayTypeId?: number;
  traderId?: number;
  isWebVisible?: boolean;
  orderBy?: number;
  webMultiKey?: string;
}

export interface TraderPageTitleMeta {
  traderPageTitleAndMetaId?: number;
  traderId?: number;
  languageId?: number;
  device?: string;
  metas?: string;
  traderPagesMaster?: TraderPagesMaster;
  traderPageMasterIdKey?: number;
}

export interface TraderPagesMaster {
  traderPageMasterId?: number;
  pageCode?: string;
  description?: string;
  createUserId?: number;
  createDate?: number;
  updateUserId?: number;
  updateDate?: number;
}

export interface TraderPasswordValidation {
  isLowerCase?: boolean;
  isUpperCase?: boolean;
  isDigit?: boolean;
  passwordLength?: number;
  isOnlyDigit?: boolean;
}

export interface TraderThirdPartyAccount {
  traderThirdPartyAccountId?: number;
  traderId?: number;
  thirdPartyAccountTypeId?: number;
  isActive?: boolean;
  thirdPartyAccountType?: ThirdPartyAccountType;
}

export interface ThirdPartyAccountType {
  thirdPartyAccountTypeId?: number;
  accountTypeName?: string;
  accountTypeCode?: string;
  isActive?: boolean;
}

export interface TraderRegisterField {
  traderRegisterFieldId?: number;
  traderId?: number;
  fieldTypeId?: number;
  orderBy?: number;
  isActive?: number;
  defaultValue?: string;
  predefinedValue?: string;
  isRandom?: number;
  isOptional?: number;
  isWebEditable?: number;
  template?: string;
  fieldName?: string;
  isLogin?: number;
  registerGroupCode?: string;
  registerGroupFieldGroup?: number;
  minimal?: boolean;
}

export interface TraderCustomerNotificationType {
  traderCustNotificationTypeId?: number;
  customerNotificationTypeId?: number;
  traderId?: number;
  webVisible?: boolean;
  orderBy?: number;
  description?: string;
}

export interface League {
  leagueId?: number;
  leagueName?: string;
  traderFavouriteTeams?: TraderFavouriteTeam[];
}

export interface TraderFavouriteTeam {
  traderFavouriteTeamId?: number;
  traderId?: number;
  competitorId?: number;
  orderBy?: number;
  isVisible?: number;
  competitorName?: string;
  leagueId?: number;
}

export interface WebCountry {
  countryId?: number;
  countryName?: string;
  orderBy?: number;
  abbreviation?: string;
  ageLimit?: number;
  telephoneCode?: string;
  code?: string;
  languageId?: number;
}

export interface Currency {
  currencyId?: number;
  currencyCode?: string;
  currencyName?: string;
  orderBy?: number;
  currencySymbol?: string;
  webMultiType?: string;
  webMultiKey?: string;
  isSignUpEnabled?: boolean;
}

export interface CurrencyExchange {
  from?: number;
  to?: number;
  amount?: number;
  result?: number;
}

export interface WebMultiLanguage {
  multilanguageId?: number;
  typeName?: string;
  key?: string;
  value?: string;
  languageId?: number;
  traderId?: number;
}

export interface GeolocationLicenseResponse {
  newLicense?: string;
}

export interface TraderDynamicContent {
  traderDynamicContentId?: number;
  code?: string;
  traderId?: number;
  languageId?: number;
  moduleContent?: string;
  description?: string;
  deleteFlag?: boolean;
  createUserId?: number;
  createUserDate?: number;
  createUserIp?: string;
  globalRecordId?: number;
  onlyLoggedUsers?: boolean;
}

export interface CustomEventsModule {
  customEventsModuleId?: number;
  traderId?: number;
  moduleName?: string;
  moduleCode?: string;
  marketsPerPage?: number;
  moduleStartDate?: number;
  moduleEndDate?: number;
  moduleOrderBy?: number;
  desktopActive?: boolean;
  mobileActive?: boolean;
  tabletActive?: boolean;
  selectionOrderBy?: number;
  fixtureOddId?: number;
  fixtureOddStatus?: string;
  fixtureOddPrice?: number;
  fixtureOddFreeze?: boolean;
  betTypeId?: number;
  betTypeName?: string;
  betTypeGroupId?: number;
  betTypeGroupSpecial?: boolean;
  betTypeGroupSinglesOnly?: boolean;
  betTypeGroupName?: string;
  fixtureId?: number;
  eventName?: string;
  eventStartDate?: number;
  eventEndDate?: number;
  fixtureCustom?: boolean;
  fixtureSpecial?: boolean;
  fixtureStatus?: string;
  fixtureOutright?: boolean;
  fixtureMinMatchPlay?: number;
  homeCompetitorId?: number;
  awayCompetitorId?: number;
  homeCompetitorName?: string;
  awayCompetitorName?: string;
  fixtureFreeze?: boolean;
  taMarketId?: number;
  taMarketFreeze?: boolean;
  sportTypeId?: number;
  sportTypeName?: string;
  sportTypeCustom?: boolean;
  categoryId?: number;
  categoryName?: string;
  categoryCustom?: boolean;
  leagueId?: number;
  leagueName?: string;
  leagueCustom?: boolean;
  seasonId?: number;
  seasonName?: string;
  seasonCustom?: boolean;
}

export interface News {
  newsId?: number;
  traderId?: number;
  languageId?: number;
  title?: string;
  fixtureId?: number;
  fixtureOddId?: number;
  fixtureOddIdTwo?: number;
  fixtureOddIdThree?: number;
  active?: boolean;
  expireDate?: number;
  startDate?: number;
  orderBy?: number;
  url?: string;
  newsTypeId?: number;
  htmlContent?: string;
  deleteFlag?: boolean;
  bigImage?: string;
  smallImage?: string;
  lastUpdateDate?: number;
  device?: string;
  newsType?: NewsType;
  target?: string;
}

export interface NewsType {
  newsTypeId?: number;
  typeName?: string;
}

export interface WebModuleContent {
  traderWebModuleId?: number;
  webModuleId?: number;
  traderId?: number;
  languageId?: number;
  moduleContent?: string;
  deleteFlag?: boolean;
  lastUpdateDate?: number;
  device?: string;
  onlyLoggedUsers?: boolean;
  webModule?: WebModule;
  moduleCode?: string;
  isPrintable?: boolean;
}

export interface WebModule {
  webModuleId?: number;
  moduleCode?: string;
  moduleName?: string;
  isActive?: boolean;
  isPrintable?: boolean;
}

export interface CustomerResponse {
  firstName?: string;
  secondName?: string;
  surname?: string;
  birthdate?: string;
  deceased?: boolean;
  pep?: boolean;
}

export interface TraderIdentityTypes {
  traderId?: number;
  identityTypeId?: number;
  identityTypeName?: string;
  isActive?: number;
}

export interface TraderInstitution {
  traderInstitutionId?: number;
  institution?: string;
  institutionCode?: string;
  orderBy?: number;
}

export interface TraderProfessionalStatus {
  professionalStatusId?: number;
  professionalStatus?: string;
  professionalStatusCode?: string;
  orderBy?: number;
}

export interface MultiBetGetRateResponse {
  mbBonusId?: number;
  rate?: number;
  multiBetBonusRates?: MultiBetBonusRate[];
  maxBonusWin?: number;
  minOddAtCoupon?: number;
}

export interface MultiBetBonusRate {
  mbBonusRateId?: number;
  mbBonusId?: number;
  minEventCount?: number;
  maxEventCount?: number;
  rate?: number;
}
