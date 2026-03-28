import { OdinRequest, OdinResponse } from '../models/common.models';
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
  mockDynamicContentCatalog,
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

function matchesDevice(availableDevices: string | undefined, requestedDevice: string) {
  if (!availableDevices) return true;

  return availableDevices
    .split(',')
    .map((device) => device.trim())
    .includes(requestedDevice);
}

function extractRequestedCode(body: unknown) {
  if (!body || typeof body !== 'object') return undefined;

  const request = body as OdinRequest<{ code?: string }> & {
    code?: string;
    requestBody?: { code?: string };
  };

  return request.requestBody?.code ?? request.code;
}

function successResponse<T>(data: T): OdinResponse<T> {
  return {
    success: true,
    responseCodes: [{ responseCode: 1, responseKey: 'SUCCESS', responseMessage: '' }],
    data,
  };
}

export interface IConfigService {
  getApplicationParameters(domain: string): Promise<OdinResponse<ApplicationSetting[]>>;
  getTraderDefaults(domain: string): Promise<OdinResponse<TraderDefaults>>;
  getTraderModules(domain: string, device: string): Promise<OdinResponse<Module[]>>;
  getTraderNavbar(domain: string, device: string): Promise<OdinResponse<TraderNavbarMenu[]>>;
  getTraderOddDisplayTypes(domain: string): Promise<OdinResponse<TraderOddDisplayType[]>>;
  getTraderPages(domain: string, device: string, languageId: number): Promise<OdinResponse<TraderPageTitleMeta[]>>;
  getTraderPasswordValidation(domain: string): Promise<OdinResponse<TraderPasswordValidation>>;
  getTraderThirdPartyAccounts(domain: string): Promise<OdinResponse<TraderThirdPartyAccount[]>>;
  getTraderRegisterFields(domain: string, channel: string): Promise<OdinResponse<TraderRegisterField[]>>;
  getTraderNotificationList(domain: string, language: string): Promise<OdinResponse<TraderCustomerNotificationType[]>>;
  getTraderFavoriteTeamList(domain: string): Promise<OdinResponse<League[]>>;
  getCountryList(domain?: string, language?: string): Promise<OdinResponse<WebCountry[]>>;
  getTraderCurrencyList(domain: string): Promise<OdinResponse<Currency[]>>;
  getCurrencyList(): Promise<OdinResponse<Currency[]>>;
  calculateCurrency(body: unknown): Promise<OdinResponse<Currency>>;
  getWebMultilanguages(domain: string, language: string): Promise<OdinResponse<WebMultiLanguage[]>>;
  getGeolocationLicense(): Promise<OdinResponse<GeolocationLicenseResponse>>;
  getContentByCode(body: unknown): Promise<OdinResponse<TraderDynamicContent>>;
  getCustomEventsModules(): Promise<OdinResponse<CustomEventsModule[]>>;
  getNews(domain: string, languageId: number, device: string, traderId: number): Promise<OdinResponse<News[]>>;
  getUsedWebModuleCodes(domain: string, device: string, language: string): Promise<OdinResponse<string[]>>;
  getWebModuleContentByCode(domain: string, moduleCode: string, device: string, language: string): Promise<OdinResponse<WebModuleContent[]>>;
  getCustomerByCpfNumber(cpf: string): Promise<OdinResponse<CustomerResponse>>;
  getTraderIdentityTypesByCode(body: unknown): Promise<OdinResponse<TraderIdentityTypes[]>>;
  getInstitutions(): Promise<OdinResponse<TraderInstitution[]>>;
  getProfessionalStatuses(): Promise<OdinResponse<TraderProfessionalStatus[]>>;
  isValidCpf(cpf: string): Promise<OdinResponse>;
  isValidUserEmail(email: string): Promise<OdinResponse>;
  isValidUsername(username: string): Promise<OdinResponse>;
  getMultiBetRates(body: unknown): Promise<OdinResponse<MultiBetGetRateResponse>>;
}

export class MockConfigService implements IConfigService {
  async getApplicationParameters(): Promise<OdinResponse<ApplicationSetting[]>> {
    return mockApplicationSettings;
  }

  async getTraderDefaults(_domain: string): Promise<OdinResponse<TraderDefaults>> {
    return mockTraderDefaults;
  }

  async getTraderModules(_domain: string, device: string): Promise<OdinResponse<Module[]>> {
    const modules =
      mockTraderModules.data?.filter((module) => {
        if (!module.isActive) return false;

        if (!module.traderModules?.length) return true;

        return module.traderModules.some((traderModule) =>
          device === 'm' ? traderModule.isMobileActive : traderModule.isWebActive,
        );
      }) ?? [];

    return successResponse(modules);
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

  async getContentByCode(body: unknown): Promise<OdinResponse<TraderDynamicContent>> {
    const requestedCode = extractRequestedCode(body);
    const request = body as OdinRequest | undefined;

    const content =
      mockDynamicContentCatalog.find((item) => {
        const matchesCode = requestedCode ? item.code === requestedCode : true;
        const matchesLanguage = request?.languageId ? item.languageId === request.languageId : true;
        const matchesTrader = request?.traderId ? item.traderId === request.traderId : true;
        const matchesRequestedDevice = request?.device ? matchesDevice('m,d', request.device) : true;

        return matchesCode && matchesLanguage && matchesTrader && matchesRequestedDevice;
      }) ?? mockDynamicContent.data;

    return successResponse(content ?? {});
  }

  async getCustomEventsModules(): Promise<OdinResponse<CustomEventsModule[]>> {
    return mockCustomEventsModules;
  }

  async getNews(_domain: string, languageId: number, device: string, traderId: number): Promise<OdinResponse<News[]>> {
    const news =
      mockNews.data?.filter((item) => {
        const matchesLanguage = item.languageId ? item.languageId === languageId : true;
        const matchesTrader = item.traderId ? item.traderId === traderId : true;

        return matchesLanguage && matchesTrader && matchesDevice(item.device, device);
      }) ?? [];

    return successResponse(news);
  }

  async getUsedWebModuleCodes(_domain: string, device: string, language: string): Promise<OdinResponse<string[]>> {
    const moduleCodes = Array.from(
      new Set(
        (mockWebModuleContent.data ?? [])
          .filter((item) => matchesDevice(item.device, device))
          .filter((item) => !item.languageId || item.languageId === Number(language) || language === 'pt-BR')
          .map((item) => item.moduleCode)
          .filter((code): code is string => Boolean(code)),
      ),
    );

    return successResponse(moduleCodes.length ? moduleCodes : (mockWebModuleCodes.data ?? []));
  }

  async getWebModuleContentByCode(
    _domain: string,
    moduleCode: string,
    device: string,
    language: string,
  ): Promise<OdinResponse<WebModuleContent[]>> {
    const content =
      mockWebModuleContent.data?.filter((item) => {
        const matchesCode = item.moduleCode === moduleCode;
        const matchesLanguage = !item.languageId || item.languageId === Number(language) || language === 'pt-BR';

        return matchesCode && matchesLanguage && matchesDevice(item.device, device);
      }) ?? [];

    return successResponse(content);
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
