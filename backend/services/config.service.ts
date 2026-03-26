// ============================================================
// Config Service — Interface + mock implementation
// for trader config, registration, CMS, country, currency
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
  WebModuleContent,
  CustomerResponse,
  TraderIdentityTypes,
  TraderInstitution,
  TraderProfessionalStatus,
  MultiBetGetRateResponse,
} from '../models/config.models';
import {
  mockApplicationSettings,
  mockTraderDefaults,
  mockTraderModules,
  mockTraderNavbar,
  mockOddDisplayTypes,
  mockTraderPages,
  mockPasswordValidation,
  mockThirdPartyAccounts,
  mockRegisterFields,
  mockNotifications,
  mockFavoriteTeams,
  mockCountries,
  mockCurrencies,
  mockCurrencyCalculation,
  mockMultilanguages,
  mockGeolocationLicense,
  mockDynamicContent,
  mockCustomEventsModules,
  mockNews,
  mockWebModuleCodes,
  mockWebModuleContent,
  mockCustomerByCpf,
  mockIdentityTypes,
  mockInstitutions,
  mockProfessionalStatuses,
  mockMultiBetRates,
  mockValidationSuccess,
} from '../mocks/config.mocks';

// ---- Interface ----

/**
 * Contrato de serviço para endpoints de configuração, registro, CMS,
 * países, moedas e multi-bet da Odin API.
 */
export interface IConfigService {
  // --- App Config ---
  /** GET /api/generic/getApplicationParameters/{domain}/w */
  getApplicationParameters(domain: string): Promise<OdinResponse<ApplicationSetting[]>>;

  /** GET /api/generic/getTraderDefaults/{domain}/w */
  getTraderDefaults(domain: string): Promise<OdinResponse<TraderDefaults>>;

  /** GET /api/generic/getTraderModules/{domain}/{device} */
  getTraderModules(domain: string, device: string): Promise<OdinResponse<Module[]>>;

  /** GET /api/generic/getTraderNavbar/{domain}/{device} */
  getTraderNavbar(domain: string, device: string): Promise<OdinResponse<TraderNavbarMenu[]>>;

  /** GET /api/generic/getTraderOddDisplayTypes/{domain} */
  getTraderOddDisplayTypes(domain: string): Promise<OdinResponse<TraderOddDisplayType[]>>;

  /** GET /api/generic/getTraderPages/{domain}/{device}/{language_id} */
  getTraderPages(domain: string, device: string, languageId: number): Promise<OdinResponse<TraderPageTitleMeta[]>>;

  /** GET /api/generic/getTraderPasswordValidation/{domain} */
  getTraderPasswordValidation(domain: string): Promise<OdinResponse<TraderPasswordValidation>>;

  /** GET /api/generic/getTraderThirdPartyAccounts/{domain} */
  getTraderThirdPartyAccounts(domain: string): Promise<OdinResponse<TraderThirdPartyAccount[]>>;

  /** GET /api/generic/getTraderRegisterFields/{domain}/{channel} */
  getTraderRegisterFields(domain: string, channel: string): Promise<OdinResponse<TraderRegisterField[]>>;

  /** GET /api/generic/traderNotificationList/{domain}/{language} */
  getTraderNotificationList(domain: string, language: string): Promise<OdinResponse<TraderCustomerNotificationType[]>>;

  /** GET /api/generic/getTraderFavoriteTeamList/{domain}/w */
  getTraderFavoriteTeamList(domain: string): Promise<OdinResponse<League[]>>;

  // --- Country / Currency ---
  /** GET /api/generic/countrylist/{domain}/{language}/w  OR  GET /api/generic/countrylist */
  getCountryList(domain?: string, language?: string): Promise<OdinResponse<WebCountry[]>>;

  /** GET /api/generic/traderCurrencyList/{domain} */
  getTraderCurrencyList(domain: string): Promise<OdinResponse<Currency[]>>;

  /** GET /api/generic/currencylist */
  getCurrencyList(): Promise<OdinResponse<Currency[]>>;

  /** POST /api/generic/calculateCurrency */
  calculateCurrency(body: unknown): Promise<OdinResponse<Currency>>;

  // --- Multilanguage ---
  /** GET /api/generic/getWebMultilanguages/{domain}/{language} */
  getWebMultilanguages(domain: string, language: string): Promise<OdinResponse<WebMultiLanguage[]>>;

  // --- Geolocation ---
  /** GET /api/geolocation/license */
  getGeolocationLicense(): Promise<OdinResponse<GeolocationLicenseResponse>>;

  // --- CMS ---
  /** POST /api/generic/getContentByCode */
  getContentByCode(body: unknown): Promise<OdinResponse<TraderDynamicContent>>;

  /** GET /api/generic/getCustomEventsModules */
  getCustomEventsModules(): Promise<OdinResponse<CustomEventsModule[]>>;

  /** GET /api/generic/getNews/{domain}/{language_id}/{device}/{trader_id} */
  getNews(domain: string, languageId: number, device: string, traderId: number): Promise<OdinResponse<News[]>>;

  /** GET /api/generic/getUsedWebModuleCodesByTraderLanguageAndDevice/{domain}/{device}/{language} */
  getUsedWebModuleCodes(domain: string, device: string, language: string): Promise<OdinResponse<string[]>>;

  /** GET /api/generic/getWebModuleContentByCode/{domain}/{moduleCode}/{device}/{language} */
  getWebModuleContentByCode(domain: string, moduleCode: string, device: string, language: string): Promise<OdinResponse<WebModuleContent[]>>;

  // --- Registration ---
  /** GET /api/generic/register/getCustomerByCpfNumber */
  getCustomerByCpfNumber(cpf: string): Promise<OdinResponse<CustomerResponse>>;

  /** POST /api/generic/register/getTraderRestIdentityTypesByCode */
  getTraderIdentityTypesByCode(body: unknown): Promise<OdinResponse<TraderIdentityTypes[]>>;

  /** GET /api/generic/register/institutions */
  getInstitutions(): Promise<OdinResponse<TraderInstitution[]>>;

  /** GET /api/generic/register/professionalStatuses */
  getProfessionalStatuses(): Promise<OdinResponse<TraderProfessionalStatus[]>>;

  /** GET /api/generic/register/isvalidcpf */
  isValidCpf(cpf: string): Promise<OdinResponse>;

  /** GET /api/generic/register/isvaliduseremail */
  isValidUserEmail(email: string): Promise<OdinResponse>;

  /** GET /api/generic/register/isvalidusername */
  isValidUsername(username: string): Promise<OdinResponse>;

  // --- Multi-bet Bonus ---
  /** POST /api/generic/mbb/rates */
  getMultiBetRates(body: unknown): Promise<OdinResponse<MultiBetGetRateResponse>>;
}

// ---- Mock Implementation ----

/** Implementação mock de `IConfigService`. Retorna dados estáticos de `config.mocks.ts`. */
export class MockConfigService implements IConfigService {
  async getApplicationParameters(): Promise<OdinResponse<ApplicationSetting[]>> {
    return mockApplicationSettings;
  }

  async getTraderDefaults(): Promise<OdinResponse<TraderDefaults>> {
    return mockTraderDefaults;
  }

  async getTraderModules(): Promise<OdinResponse<Module[]>> {
    return mockTraderModules;
  }

  async getTraderNavbar(): Promise<OdinResponse<TraderNavbarMenu[]>> {
    return mockTraderNavbar;
  }

  async getTraderOddDisplayTypes(): Promise<OdinResponse<TraderOddDisplayType[]>> {
    return mockOddDisplayTypes;
  }

  async getTraderPages(): Promise<OdinResponse<TraderPageTitleMeta[]>> {
    return mockTraderPages;
  }

  async getTraderPasswordValidation(): Promise<OdinResponse<TraderPasswordValidation>> {
    return mockPasswordValidation;
  }

  async getTraderThirdPartyAccounts(): Promise<OdinResponse<TraderThirdPartyAccount[]>> {
    return mockThirdPartyAccounts;
  }

  async getTraderRegisterFields(): Promise<OdinResponse<TraderRegisterField[]>> {
    return mockRegisterFields;
  }

  async getTraderNotificationList(): Promise<OdinResponse<TraderCustomerNotificationType[]>> {
    return mockNotifications;
  }

  async getTraderFavoriteTeamList(): Promise<OdinResponse<League[]>> {
    return mockFavoriteTeams;
  }

  async getCountryList(): Promise<OdinResponse<WebCountry[]>> {
    return mockCountries;
  }

  async getTraderCurrencyList(): Promise<OdinResponse<Currency[]>> {
    return mockCurrencies;
  }

  async getCurrencyList(): Promise<OdinResponse<Currency[]>> {
    return mockCurrencies;
  }

  async calculateCurrency(): Promise<OdinResponse<Currency>> {
    return mockCurrencyCalculation;
  }

  async getWebMultilanguages(): Promise<OdinResponse<WebMultiLanguage[]>> {
    return mockMultilanguages;
  }

  async getGeolocationLicense(): Promise<OdinResponse<GeolocationLicenseResponse>> {
    return mockGeolocationLicense;
  }

  async getContentByCode(): Promise<OdinResponse<TraderDynamicContent>> {
    return mockDynamicContent;
  }

  async getCustomEventsModules(): Promise<OdinResponse<CustomEventsModule[]>> {
    return mockCustomEventsModules;
  }

  async getNews(): Promise<OdinResponse<News[]>> {
    return mockNews;
  }

  async getUsedWebModuleCodes(): Promise<OdinResponse<string[]>> {
    return mockWebModuleCodes as OdinResponse<string[]>;
  }

  async getWebModuleContentByCode(): Promise<OdinResponse<WebModuleContent[]>> {
    return mockWebModuleContent as OdinResponse<WebModuleContent[]>;
  }

  async getCustomerByCpfNumber(): Promise<OdinResponse<CustomerResponse>> {
    return mockCustomerByCpf;
  }

  async getTraderIdentityTypesByCode(): Promise<OdinResponse<TraderIdentityTypes[]>> {
    return mockIdentityTypes;
  }

  async getInstitutions(): Promise<OdinResponse<TraderInstitution[]>> {
    return mockInstitutions;
  }

  async getProfessionalStatuses(): Promise<OdinResponse<TraderProfessionalStatus[]>> {
    return mockProfessionalStatuses;
  }

  async isValidCpf(): Promise<OdinResponse> {
    return mockValidationSuccess;
  }

  async isValidUserEmail(): Promise<OdinResponse> {
    return mockValidationSuccess;
  }

  async isValidUsername(): Promise<OdinResponse> {
    return mockValidationSuccess;
  }

  async getMultiBetRates(): Promise<OdinResponse<MultiBetGetRateResponse>> {
    return mockMultiBetRates;
  }
}
