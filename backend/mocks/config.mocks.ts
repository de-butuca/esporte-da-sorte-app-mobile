// ============================================================
// Config Mocks — Realistic mock data for trader config,
//                registration, CMS, country, currency APIs
// ============================================================

import { OdinResponse } from '../models/common.models';
import {
  ApplicationSetting,
  TraderDefaults,
  Module,
  TraderNavbarMenu,
  TraderOddDisplayType,
  TraderPageTitleMeta,
  TraderPasswordValidation,
  TraderThirdPartyAccount,
  TraderRegisterField,
  TraderCustomerNotificationType,
  League,
  WebCountry,
  Currency,
  WebMultiLanguage,
  GeolocationLicenseResponse,
  TraderDynamicContent,
  CustomEventsModule,
  News,
  CustomerResponse,
  TraderIdentityTypes,
  TraderInstitution,
  TraderProfessionalStatus,
  MultiBetGetRateResponse,
  WebModuleContent,
} from '../models/config.models';

// ---- Application Settings ----

/** Mock de parâmetros da aplicação: GTM, Hotjar, Pixel, reCAPTCHA, CDN. */
export const mockApplicationSettings: OdinResponse<ApplicationSetting[]> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: [
    { parameter: 'GOOGLE_TAG_MANAGER_ID', parameterDescription: 'GTM Container ID', value: 'GTM-ABCD1234', project: 'web' },
    { parameter: 'HOTJAR_ID', parameterDescription: 'Hotjar tracking ID', value: '3456789', project: 'web' },
    { parameter: 'LIVECHAT_LICENSE', parameterDescription: 'LiveChat license key', value: '14827653', project: 'web' },
    { parameter: 'DEPOSIT_MIN_AMOUNT', parameterDescription: 'Minimum deposit amount', value: '20', project: 'payment' },
    { parameter: 'WITHDRAW_MIN_AMOUNT', parameterDescription: 'Minimum withdrawal', value: '50', project: 'payment' },
  ],
};

// ---- Trader Defaults ----

/** Mock de configuração geral do trader com 40+ campos-chave (URLs, flags, limites). */
export const mockTraderDefaults: OdinResponse<TraderDefaults> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: {
    cDT: Date.now(),
    dCI: 7,
    dLI: 2,
    sMPA: 1.0,
    tIT: 'svg',
    tIS: 'default',
    tSM: true,
    tLVS: true,
    tRCK: '6Ld2f-YqAAAAABn3kdL-kPNq5R6-pOnR',
    tBU: 'https://bragi.example.com',
    tBWU: 'wss://bragi-ws.example.com',
    tBWMU: 'wss://bragi-ws-mobile.example.com',
    tCDNU: 'https://cdn.example.com',
    tFAU: 'https://facebook.com/casinobrand',
    tINU: 'https://instagram.com/casinobrand',
    tTWU: 'https://twitter.com/casinobrand',
    tYTU: 'https://youtube.com/casinobrand',
    tCA: true,
    tPCA: true,
    tCAA: true,
    tMBB: true,
    tBSYS: true,
    tAL: 18,
    tICE: true,
    tKYCON: true,
    tFAV: true,
    otpSms: false,
    tREO: true,
    tRSO: true,
    regSMS: true,
    NumBetSlip: 30,
    NumSysC: 8,
    tBTGL: 50,
    jpOpen: true,
    jpMS: false,
    jpMJ: true,
    jpShare: true,
    popCasGames: true,
    isJetxActive: true,
    isAviatorActive: true,
    betbuilderEnabled: true,
    widgetEnabled: true,
    customNavbarEnabled: true,
    acceptOddChanges: true,
    autoLoginAfterRegister: true,
    keepMeLoggedInActive: true,
    keepMeLoggedInDaysLimit: 30,
    responsibleGamingEnabled: true,
    showLoginMessage: false,
    casinoCategoryList: [1, 2, 3, 5, 7],
    liveCasinoCategoryList: [10, 11, 12],
    eSport: [43, 44, 45],
    resetPassOptions: ['email', 'sms'],
    preferredCountriesPhone: ['BR', 'PT', 'MZ'],
    externalAuth: ['google'],
    tLoginOptions: 'username,email',
    tForgotPassMethod: 'email',
    tRegActMethod: 'email',
  },
};

// ---- Trader Modules ----

/** Mock de módulos do trader: Sports Highlights, Casino Featured, Live Events. */
export const mockTraderModules: OdinResponse<Module[]> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: [
    {
      moduleId: 1,
      moduleName: 'Sports Highlights',
      isActive: true,
      orderBy: 1,
      isShowHomePage: true,
      isShowLandingPage: false,
      moduleCode: 'sports-highlights',
      manual: false,
      whichSide: 'center',
      traderModules: [
        { traderModuleId: 101, traderId: 102, moduleName: 'Sports Highlights', isShowHomePage: true, isShowLandingPage: false, moduleCode: 'sports-highlights', manual: false, whichSide: 'center', moduleId: 1, isWebActive: true, isMobileActive: true, orderInWeb: 1, orderInMobile: 1 },
      ],
    },
    {
      moduleId: 2,
      moduleName: 'Casino Popular',
      isActive: true,
      orderBy: 2,
      isShowHomePage: true,
      isShowLandingPage: true,
      moduleCode: 'casino-popular',
      manual: true,
      whichSide: 'center',
    },
    {
      moduleId: 3,
      moduleName: 'Live Casino',
      isActive: true,
      orderBy: 3,
      isShowHomePage: true,
      isShowLandingPage: false,
      moduleCode: 'live-casino',
      manual: true,
      whichSide: 'center',
    },
  ],
};

// ---- Navbar ----

/** Mock de navbar: Esportes, Ao Vivo, Cassino, Promoções, Ajuda (com sub-menus). */
export const mockTraderNavbar: OdinResponse<TraderNavbarMenu[]> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: [
    { menu_name: 'Esportes', order: 1, url: '/sports', icon: 'sports', web_multilanguage_key: 'nav.sports' },
    { menu_name: 'Ao Vivo', order: 2, url: '/live', icon: 'live', web_multilanguage_key: 'nav.live' },
    {
      menu_name: 'Cassino',
      order: 3,
      url: '/casino',
      icon: 'casino',
      web_multilanguage_key: 'nav.casino',
      sub_menu: [
        { menu_name: 'Slots', order: 1, url: '/casino/slots', icon: 'slots', web_multilanguage_key: 'nav.casino.slots' },
        { menu_name: 'Ao Vivo', order: 2, url: '/casino/live', icon: 'live-casino', web_multilanguage_key: 'nav.casino.live' },
        { menu_name: 'Jogos de Mesa', order: 3, url: '/casino/table-games', icon: 'table', web_multilanguage_key: 'nav.casino.table' },
      ],
    },
    { menu_name: 'Promoções', order: 4, url: '/promotions', icon: 'promo', web_multilanguage_key: 'nav.promotions' },
    { menu_name: 'Jackpot', order: 5, url: '/jackpot', icon: 'jackpot', web_multilanguage_key: 'nav.jackpot' },
  ],
};

// ---- Odd Display Types ----

/** Mock de tipos de exibição de odds: Decimal, Fractional, American. */
export const mockOddDisplayTypes: OdinResponse<TraderOddDisplayType[]> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: [
    { oddDisplayTypeId: 1, oddDisplayTypeName: 'Decimal', oddDisplayTypeCode: 'DECIMAL', traderOddDisplayTypeId: 1001, traderId: 102, isWebVisible: true, orderBy: 1, webMultiKey: 'odd.decimal' },
    { oddDisplayTypeId: 2, oddDisplayTypeName: 'Fractional', oddDisplayTypeCode: 'FRACTIONAL', traderOddDisplayTypeId: 1002, traderId: 102, isWebVisible: true, orderBy: 2, webMultiKey: 'odd.fractional' },
    { oddDisplayTypeId: 3, oddDisplayTypeName: 'American', oddDisplayTypeCode: 'AMERICAN', traderOddDisplayTypeId: 1003, traderId: 102, isWebVisible: true, orderBy: 3, webMultiKey: 'odd.american' },
  ],
};

// ---- Trader Pages ----

/** Mock de páginas SEO: Home e Sports com títulos e metas. */
export const mockTraderPages: OdinResponse<TraderPageTitleMeta[]> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: [
    {
      traderPageTitleAndMetaId: 5001,
      traderId: 102,
      languageId: 2,
      device: 'd',
      metas: '<title>Casa de Apostas | Melhor Cassino Online</title><meta name="description" content="Apostas esportivas e cassino online." />',
      traderPagesMaster: { traderPageMasterId: 1, pageCode: 'HOME', description: 'Home Page' },
    },
    {
      traderPageTitleAndMetaId: 5002,
      traderId: 102,
      languageId: 2,
      device: 'd',
      metas: '<title>Esportes | Apostas ao Vivo</title>',
      traderPagesMaster: { traderPageMasterId: 2, pageCode: 'SPORTS', description: 'Sports Page' },
    },
  ],
};

// ---- Password Validation ----

/** Mock de regras de validação de senha: min 8 chars, lower+upper+digit. */
export const mockPasswordValidation: OdinResponse<TraderPasswordValidation> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: {
    isLowerCase: true,
    isUpperCase: true,
    isDigit: true,
    passwordLength: 8,
    isOnlyDigit: false,
  },
};

// ---- Third Party Accounts ----

/** Mock de contas de terceiros: Google e Facebook ativos. */
export const mockThirdPartyAccounts: OdinResponse<TraderThirdPartyAccount[]> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: [
    { traderThirdPartyAccountId: 301, traderId: 102, thirdPartyAccountTypeId: 1, isActive: true, thirdPartyAccountType: { thirdPartyAccountTypeId: 1, accountTypeName: 'Google', accountTypeCode: 'GOOGLE', isActive: true } },
    { traderThirdPartyAccountId: 302, traderId: 102, thirdPartyAccountTypeId: 2, isActive: true, thirdPartyAccountType: { thirdPartyAccountTypeId: 2, accountTypeName: 'Facebook', accountTypeCode: 'FACEBOOK', isActive: true } },
  ],
};

// ---- Register Fields ----

/** Mock de campos de cadastro: username, email, password, document, firstName, lastName, phone, birthdate. */
export const mockRegisterFields: OdinResponse<TraderRegisterField[]> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: [
    { traderRegisterFieldId: 1, traderId: 102, fieldTypeId: 1, orderBy: 1, isActive: 1, fieldName: 'username', isOptional: 0, isWebEditable: 1, registerGroupCode: 'ACCOUNT', registerGroupFieldGroup: 1, minimal: false },
    { traderRegisterFieldId: 2, traderId: 102, fieldTypeId: 2, orderBy: 2, isActive: 1, fieldName: 'email', isOptional: 0, isWebEditable: 1, registerGroupCode: 'ACCOUNT', registerGroupFieldGroup: 1, minimal: false },
    { traderRegisterFieldId: 3, traderId: 102, fieldTypeId: 3, orderBy: 3, isActive: 1, fieldName: 'password', isOptional: 0, isWebEditable: 1, registerGroupCode: 'ACCOUNT', registerGroupFieldGroup: 1, minimal: false },
    { traderRegisterFieldId: 4, traderId: 102, fieldTypeId: 4, orderBy: 4, isActive: 1, fieldName: 'firstName', isOptional: 0, isWebEditable: 1, registerGroupCode: 'PERSONAL', registerGroupFieldGroup: 2, minimal: false },
    { traderRegisterFieldId: 5, traderId: 102, fieldTypeId: 5, orderBy: 5, isActive: 1, fieldName: 'surname', isOptional: 0, isWebEditable: 1, registerGroupCode: 'PERSONAL', registerGroupFieldGroup: 2, minimal: false },
    { traderRegisterFieldId: 6, traderId: 102, fieldTypeId: 6, orderBy: 6, isActive: 1, fieldName: 'cpfNumber', isOptional: 0, isWebEditable: 1, registerGroupCode: 'PERSONAL', registerGroupFieldGroup: 2, minimal: true },
    { traderRegisterFieldId: 7, traderId: 102, fieldTypeId: 7, orderBy: 7, isActive: 1, fieldName: 'phone', isOptional: 0, isWebEditable: 1, registerGroupCode: 'CONTACT', registerGroupFieldGroup: 3, minimal: false },
    { traderRegisterFieldId: 8, traderId: 102, fieldTypeId: 8, orderBy: 8, isActive: 1, fieldName: 'birthdate', isOptional: 0, isWebEditable: 1, registerGroupCode: 'PERSONAL', registerGroupFieldGroup: 2, minimal: false },
  ],
};

// ---- Notifications ----

/** Mock de tipos de notificação: E-mail, SMS, Push. */
export const mockNotifications: OdinResponse<TraderCustomerNotificationType[]> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: [
    { traderCustNotificationTypeId: 1, customerNotificationTypeId: 1, traderId: 102, webVisible: true, orderBy: 1, description: 'Promoções e ofertas exclusivas' },
    { traderCustNotificationTypeId: 2, customerNotificationTypeId: 2, traderId: 102, webVisible: true, orderBy: 2, description: 'Novidades sobre esportes' },
    { traderCustNotificationTypeId: 3, customerNotificationTypeId: 3, traderId: 102, webVisible: true, orderBy: 3, description: 'Notificações do cassino' },
  ],
};

// ---- Favourite Teams ----

/** Mock de times favoritos: Brasileirão (Flamengo, Palmeiras, Corinthians) e La Liga (Barcelona, Real Madrid, Atlético). */
export const mockFavoriteTeams: OdinResponse<League[]> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: [
    {
      leagueId: 4001,
      leagueName: 'Brasileirão',
      traderFavouriteTeams: [
        { traderFavouriteTeamId: 1, traderId: 102, competitorId: 2001, orderBy: 1, isVisible: 1, competitorName: 'Flamengo', leagueId: 4001 },
        { traderFavouriteTeamId: 2, traderId: 102, competitorId: 2007, orderBy: 2, isVisible: 1, competitorName: 'Corinthians', leagueId: 4001 },
        { traderFavouriteTeamId: 3, traderId: 102, competitorId: 2002, orderBy: 3, isVisible: 1, competitorName: 'Palmeiras', leagueId: 4001 },
        { traderFavouriteTeamId: 4, traderId: 102, competitorId: 2008, orderBy: 4, isVisible: 1, competitorName: 'São Paulo', leagueId: 4001 },
      ],
    },
    {
      leagueId: 4002,
      leagueName: 'La Liga',
      traderFavouriteTeams: [
        { traderFavouriteTeamId: 5, traderId: 102, competitorId: 2003, orderBy: 1, isVisible: 1, competitorName: 'Barcelona', leagueId: 4002 },
        { traderFavouriteTeamId: 6, traderId: 102, competitorId: 2004, orderBy: 2, isVisible: 1, competitorName: 'Real Madrid', leagueId: 4002 },
      ],
    },
  ],
};

// ---- Countries ----

/** Mock de países: Brasil, Portugal, Moçambique, Angola, EUA. */
export const mockCountries: OdinResponse<WebCountry[]> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: [
    { countryId: 1, countryName: 'Brasil', orderBy: 1, abbreviation: 'BR', ageLimit: 18, telephoneCode: '+55', code: 'BRA', languageId: 2 },
    { countryId: 2, countryName: 'Portugal', orderBy: 2, abbreviation: 'PT', ageLimit: 18, telephoneCode: '+351', code: 'PRT', languageId: 2 },
    { countryId: 3, countryName: 'Moçambique', orderBy: 3, abbreviation: 'MZ', ageLimit: 18, telephoneCode: '+258', code: 'MOZ', languageId: 2 },
    { countryId: 4, countryName: 'Argentina', orderBy: 4, abbreviation: 'AR', ageLimit: 18, telephoneCode: '+54', code: 'ARG', languageId: 3 },
    { countryId: 5, countryName: 'United Kingdom', orderBy: 5, abbreviation: 'GB', ageLimit: 18, telephoneCode: '+44', code: 'GBR', languageId: 1 },
  ],
};

// ---- Currencies ----

/** Mock de moedas: BRL, USD, EUR, MZN. */
export const mockCurrencies: OdinResponse<Currency[]> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: [
    { currencyId: 7, currencyCode: 'BRL', currencyName: 'Real Brasileiro', orderBy: 1, currencySymbol: 'R$', isSignUpEnabled: true },
    { currencyId: 1, currencyCode: 'USD', currencyName: 'US Dollar', orderBy: 2, currencySymbol: '$', isSignUpEnabled: true },
    { currencyId: 2, currencyCode: 'EUR', currencyName: 'Euro', orderBy: 3, currencySymbol: '€', isSignUpEnabled: true },
    { currencyId: 8, currencyCode: 'MZN', currencyName: 'Metical Moçambicano', orderBy: 4, currencySymbol: 'MT', isSignUpEnabled: true },
  ],
};

// ---- Currency Calculation ----

/** Mock de cálculo de câmbio: 100 BRL → 19.50 USD. */
export const mockCurrencyCalculation: OdinResponse<Currency> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: { currencyId: 1, currencyCode: 'USD', currencyName: 'US Dollar', currencySymbol: '$' },
};

// ---- Multilanguage ----

/** Mock de traduções (i18n): 7 entradas em português (labels, titles, messages). */
export const mockMultilanguages: OdinResponse<WebMultiLanguage[]> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: [
    { multilanguageId: 1001, typeName: 'label', key: 'login.username', value: 'Nome de usuário', languageId: 2, traderId: 102 },
    { multilanguageId: 1002, typeName: 'label', key: 'login.password', value: 'Senha', languageId: 2, traderId: 102 },
    { multilanguageId: 1003, typeName: 'label', key: 'register.button', value: 'Cadastrar', languageId: 2, traderId: 102 },
    { multilanguageId: 1004, typeName: 'label', key: 'nav.sports', value: 'Esportes', languageId: 2, traderId: 102 },
    { multilanguageId: 1005, typeName: 'label', key: 'nav.casino', value: 'Cassino', languageId: 2, traderId: 102 },
    { multilanguageId: 1006, typeName: 'message', key: 'bet.placed.success', value: 'Aposta realizada com sucesso!', languageId: 2, traderId: 102 },
    { multilanguageId: 1007, typeName: 'label', key: 'deposit.button', value: 'Depositar', languageId: 2, traderId: 102 },
  ],
};

// ---- Geolocation License ----

/** Mock de licença de geolocalização com token newLicense. */
export const mockGeolocationLicense: OdinResponse<GeolocationLicenseResponse> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: { newLicense: 'SGL-BR-2026-04821' },
};

// ---- Dynamic Content ----

/** Mock de conteúdo dinâmico CMS: termos de uso em HTML. */
export const mockDynamicContent: OdinResponse<TraderDynamicContent> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: {
    traderDynamicContentId: 8001,
    code: 'welcome-banner',
    traderId: 102,
    languageId: 2,
    moduleContent: '<div class="welcome-banner"><h2>Bem-vindo! Ganhe até R$500 no primeiro depósito</h2></div>',
    description: 'Banner de boas-vindas da página inicial',
    deleteFlag: false,
    onlyLoggedUsers: false,
  },
};

// ---- Custom Events Modules ----

/** Mock de módulos de eventos customizados: 1 evento com odds e seleção. */
export const mockCustomEventsModules: OdinResponse<CustomEventsModule[]> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: [
    {
      customEventsModuleId: 9001,
      traderId: 102,
      moduleName: 'Super Odds do Dia',
      moduleCode: 'super-odds',
      marketsPerPage: 6,
      moduleStartDate: Date.now() - 86400000,
      moduleEndDate: Date.now() + 86400000 * 7,
      moduleOrderBy: 1,
      desktopActive: true,
      mobileActive: true,
      tabletActive: true,
      fixtureOddId: 980120001,
      fixtureOddPrice: 3.50,
      fixtureOddFreeze: false,
      betTypeName: '1X2',
      betTypeGroupName: 'Main Markets',
      fixtureId: 5501001,
      eventName: 'Flamengo vs Palmeiras',
      homeCompetitorName: 'Flamengo',
      awayCompetitorName: 'Palmeiras',
      sportTypeName: 'Futebol',
      categoryName: 'Brasil',
      leagueName: 'Brasileirão',
      seasonName: 'Brasileirão Série A 2026',
    },
  ],
};

// ---- News ----

/** Mock de notícias/promoções: Copa do Mundo 2026 e promoção de cassino. */
export const mockNews: OdinResponse<News[]> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: [
    {
      newsId: 7001,
      traderId: 102,
      languageId: 2,
      title: 'Copa do Mundo 2026: confira as melhores odds para os jogos da fase de grupos',
      active: true,
      startDate: Date.now() - 3600000,
      expireDate: Date.now() + 86400000 * 30,
      orderBy: 1,
      url: '/news/copa-do-mundo-2026',
      htmlContent: '<p>A Copa do Mundo 2026 nos EUA, México e Canadá promete ser a maior de todos os tempos.</p>',
      bigImage: 'https://cdn.example.com/news/copa2026-big.jpg',
      smallImage: 'https://cdn.example.com/news/copa2026-small.jpg',
      device: 'd,m',
      newsType: { newsTypeId: 1, typeName: 'promotion' },
      target: '_self',
    },
    {
      newsId: 7002,
      traderId: 102,
      languageId: 2,
      title: 'Novo bônus de cassino: 50 rodadas grátis no Sweet Bonanza',
      active: true,
      startDate: Date.now() - 7200000,
      expireDate: Date.now() + 86400000 * 14,
      orderBy: 2,
      url: '/news/bonus-sweet-bonanza',
      htmlContent: '<p>Aproveite 50 rodadas grátis no jogo mais popular do momento!</p>',
      bigImage: 'https://cdn.example.com/news/sweet-bonanza-big.jpg',
      smallImage: 'https://cdn.example.com/news/sweet-bonanza-small.jpg',
      device: 'd,m',
      newsType: { newsTypeId: 2, typeName: 'casino' },
      target: '_self',
    },
  ],
};

// ---- Web Module Codes ----

/** Mock de códigos de módulos web ativos: hero-banner, footer, sidebar, promo-bar, cookie-bar. */
export const mockWebModuleCodes: { success: boolean; responseCodes: Array<{ responseCode: number; responseKey: string; responseMessage: string }>; data: string[] } = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: ['cookie-policy-notif-bottom', 'sportsbet', 'footer-text', 'responsible-gaming', 'terms-conditions'],
};

// ---- Web Module Content ----

/** Mock de conteúdo HTML de módulo web: hero-banner com HTML e CSS inline. */
export const mockWebModuleContent: { success: boolean; responseCodes: Array<{ responseCode: number; responseKey: string; responseMessage: string }>; data: WebModuleContent[] } = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: [
    {
      traderWebModuleId: 13706,
      webModuleId: 311,
      traderId: 102,
      languageId: 2,
      moduleContent: '<div style="font-family: Arial; font-size: 10pt;">Utilizamos cookies para melhorar sua experiência.</div>',
      deleteFlag: false,
      lastUpdateDate: 1736371802000,
      device: 'm,d',
      onlyLoggedUsers: false,
      webModule: { webModuleId: 311, moduleCode: 'cookie-policy-notif-bottom', moduleName: 'Cookie Policy Notification Bottom', isActive: true, isPrintable: false },
      moduleCode: 'cookie-policy-notif-bottom',
      isPrintable: false,
    },
  ],
};

// ---- Registration: Customer by CPF ----

/** Mock de dados de cliente por CPF: João Carlos Silva, nascido 1990-05-15. */
export const mockCustomerByCpf: OdinResponse<CustomerResponse> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: {
    firstName: 'João',
    secondName: 'Carlos',
    surname: 'Silva',
    birthdate: '1990-05-15',
    deceased: false,
    pep: false,
  },
};

// ---- Registration: Identity Types ----

/** Mock de tipos de documento aceitos: RG, CPF, Passaporte. */
export const mockIdentityTypes: OdinResponse<TraderIdentityTypes[]> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: [
    { traderId: 102, identityTypeId: 1, identityTypeName: 'CPF', isActive: 1 },
    { traderId: 102, identityTypeId: 2, identityTypeName: 'RG', isActive: 1 },
    { traderId: 102, identityTypeId: 3, identityTypeName: 'Passaporte', isActive: 1 },
  ],
};

// ---- Registration: Institutions ----

/** Mock de instituições financeiras: Banco do Brasil, Itaú, Bradesco, Caixa, Nubank. */
export const mockInstitutions: OdinResponse<TraderInstitution[]> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: [
    { traderInstitutionId: 1, institution: 'Banco do Brasil', institutionCode: 'BB', orderBy: 1 },
    { traderInstitutionId: 2, institution: 'Caixa Econômica Federal', institutionCode: 'CEF', orderBy: 2 },
    { traderInstitutionId: 3, institution: 'Itaú Unibanco', institutionCode: 'ITAU', orderBy: 3 },
    { traderInstitutionId: 4, institution: 'Bradesco', institutionCode: 'BRAD', orderBy: 4 },
    { traderInstitutionId: 5, institution: 'Nubank', institutionCode: 'NU', orderBy: 5 },
  ],
};

// ---- Registration: Professional Statuses ----

/** Mock de status profissionais: Empregado, Autônomo, Estudante, Aposentado, Desempregado. */
export const mockProfessionalStatuses: OdinResponse<TraderProfessionalStatus[]> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: [
    { professionalStatusId: 1, professionalStatus: 'Empregado', professionalStatusCode: 'EMPLOYED', orderBy: 1 },
    { professionalStatusId: 2, professionalStatus: 'Autônomo', professionalStatusCode: 'SELF_EMPLOYED', orderBy: 2 },
    { professionalStatusId: 3, professionalStatus: 'Desempregado', professionalStatusCode: 'UNEMPLOYED', orderBy: 3 },
    { professionalStatusId: 4, professionalStatus: 'Estudante', professionalStatusCode: 'STUDENT', orderBy: 4 },
    { professionalStatusId: 5, professionalStatus: 'Aposentado', professionalStatusCode: 'RETIRED', orderBy: 5 },
  ],
};

// ---- Multi-Bet Bonus Rates ----

/** Mock de taxas de multi-bet bonus: 3-4 eventos = 5%, 5-7 = 10%, 8-10 = 15%, 11+ = 20%. */
export const mockMultiBetRates: OdinResponse<MultiBetGetRateResponse> = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
  data: {
    mbBonusId: 501,
    rate: 5,
    maxBonusWin: 50000,
    minOddAtCoupon: 1.40,
    multiBetBonusRates: [
      { mbBonusRateId: 1, mbBonusId: 501, minEventCount: 3, maxEventCount: 4, rate: 3 },
      { mbBonusRateId: 2, mbBonusId: 501, minEventCount: 5, maxEventCount: 7, rate: 5 },
      { mbBonusRateId: 3, mbBonusId: 501, minEventCount: 8, maxEventCount: 10, rate: 10 },
      { mbBonusRateId: 4, mbBonusId: 501, minEventCount: 11, maxEventCount: 15, rate: 15 },
      { mbBonusRateId: 5, mbBonusId: 501, minEventCount: 16, maxEventCount: 30, rate: 20 },
    ],
  },
};

// ---- Validation (CPF, email, username) — only responseCodes ----

/** Mock de validação bem-sucedida (CPF/email/username válido). */
export const mockValidationSuccess: OdinResponse = {
  success: true,
  responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
};

/** Mock de validação com erro: CPF já cadastrado. */
export const mockValidationCpfExists: OdinResponse = {
  success: false,
  responseCodes: [{ responseCode: 28, responseKey: 'EXISTING_CPF_NUMBER', responseMessage: 'CPF já cadastrado.' }],
};

/** Mock de validação com erro: e-mail já utilizado. */
export const mockValidationEmailUsed: OdinResponse = {
  success: false,
  responseCodes: [{ responseCode: 26, responseKey: 'USER_EMAIL_USED', responseMessage: 'E-mail já cadastrado.' }],
};

/** Mock de validação com erro: nome de usuário já utilizado. */
export const mockValidationUsernameUsed: OdinResponse = {
  success: false,
  responseCodes: [{ responseCode: 25, responseKey: 'USERNAME_USED', responseMessage: 'Nome de usuário já em uso.' }],
};
