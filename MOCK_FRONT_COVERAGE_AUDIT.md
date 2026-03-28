# Mock ↔ Front Coverage Audit

## 1. Resumo executivo

### Leitura geral
- A camada mock já está ampla no backend: `4 services`, `54 métodos públicos` e contratos tipados consistentes em `backend/models/*`.
- O frontend consome de fato apenas `9/54` métodos hoje, concentrados em `Promotions` e `Search`.
- Em rotas reais do app (`Home`, `Search`, `Promotions`, `Support`, `GameHome`, `Login`, `Register`, `Settings`), só `Search` e `Promotions` usam a camada `backend/services/*`.
- Os domínios `config` e `fixtures` são os únicos com uso real; `casino` e `betting` estão `100% sem consumidor`.

### Cobertura atual
- Boa cobertura real:
  - `Search` ← `fixtures.getTodaySportTypes()` + `fixtures.searchFixtures()`
  - `Promotions` ← `config.getTraderModules()`, `getTraderDefaults()`, `getContentByCode()`, `getNews()`, `getCustomEventsModules()`, `getUsedWebModuleCodes()`, `getWebModuleContentByCode()`
- Cobertura desperdiçada:
  - `casino` inteiro
  - `betting` inteiro
  - grande parte de `config` para cadastro, i18n, navbar, odds, notificações, KYC e preferências
  - grande parte de `fixtures` para home esportiva, menu/taxonomia e detalhe de eventos

### Oportunidade principal
- O app já tem layout e intenção de produto suficientes para evoluir sem esperar novos domínios:
  - `HomeEsportes` pode sair do estático com `fixtures`
  - `HomeCassino` pode nascer em cima de `casino`
  - `GameHome` pode virar tela data-driven com `fixtures + betting`
  - `Register` pode ser refeito para usar `config`
  - `Sidebar` e navegação podem aproveitar `config.getTraderNavbar()`
  - `Jackpot`, `Odds widgets`, `Lobby de cassino` e `Apostas` podem virar features novas usando mocks já prontos

### Observações de escopo
- A ausência de autenticação real não foi tratada como bug da camada mock, porque o contexto já sinaliza que auth/lógicas autenticadas estão fora do escopo atual.
- Mesmo assim, telas como `Login` e `Register` hoje usam fluxos locais/fakes e não se beneficiam dos contratos mockados já existentes ao redor de onboarding/configuração.

## 2. Inventário da camada mock

### `config.service.ts` (`30 métodos`)

#### Métodos usados hoje
- `getTraderDefaults()`
- `getTraderModules()`
- `getContentByCode()`
- `getCustomEventsModules()`
- `getNews()`
- `getUsedWebModuleCodes()`
- `getWebModuleContentByCode()`

#### Métodos ainda sem consumidor
- `getApplicationParameters()`
- `getTraderNavbar()`
- `getTraderOddDisplayTypes()`
- `getTraderPages()`
- `getTraderPasswordValidation()`
- `getTraderThirdPartyAccounts()`
- `getTraderRegisterFields()`
- `getTraderNotificationList()`
- `getTraderFavoriteTeamList()`
- `getCountryList()`
- `getTraderCurrencyList()`
- `getCurrencyList()`
- `calculateCurrency()`
- `getWebMultilanguages()`
- `getGeolocationLicense()`
- `getCustomerByCpfNumber()`
- `getTraderIdentityTypesByCode()`
- `getInstitutions()`
- `getProfessionalStatuses()`
- `isValidCpf()`
- `isValidUserEmail()`
- `isValidUsername()`
- `getMultiBetRates()`

#### Força funcional do domínio
- Muito forte em configuração de shell do produto:
  - módulos
  - navbar
  - textos dinâmicos
  - notícias/promos
  - web modules/CMS
  - preferências de odds
  - defaults institucionais
- Forte em onboarding/KYC:
  - campos de cadastro
  - validações
  - países
  - moedas
  - CPF
  - identidades
  - instituições
  - status profissional
- Forte em features de aposta:
  - `getMultiBetRates()`

#### Fraquezas
- Boa parte dos métodos é configuracional e ainda não tem adapter no front.
- Alguns contratos são genéricos demais para mobile atual e pedem camada de mapping por caso de uso.
- `getTraderPages()` parece muito mais voltado a SEO/meta de web do que a mobile.

### `fixtures.service.ts` (`10 métodos`)

#### Métodos usados hoje
- `getTodaySportTypes()`
- `searchFixtures()`

#### Métodos ainda sem consumidor
- `getAntepostSummary()`
- `getBetTypeGroups()`
- `getPopularFixtures()`
- `getUpcomingEvents()`
- `getLeftMenu()`
- `getPromotedEvents()`
- `getDetailCard()`
- `getLeagueCard()`

#### Força funcional do domínio
- Boa base para:
  - home esportiva
  - busca de ligas/eventos
  - taxonomia esportiva
  - cards de liga
  - grupos de mercado
- O mock já traz:
  - esportes
  - categorias/países
  - temporadas
  - fixtures
  - odds
  - live flag
  - contagem de mercados

#### Fraquezas
- Muitos métodos retornam o mesmo `mockSportListResponse`, então a semântica está pronta, mas a especialização do payload ainda é rasa.
- Não há contrato rico de detalhe de evento com estatísticas/live feed suficiente para a tela `GameHome`.

### `casino.service.ts` (`7 métodos`)

#### Métodos usados hoje
- nenhum

#### Métodos disponíveis
- `getCasinoGamesTags()`
- `getCasinoTags()`
- `getReservedCategories()`
- `getReservedGames()`
- `openDemoGame()`
- `getIframeGameList()`
- `launchDemo()`

#### Força funcional do domínio
- Forte o suficiente para criar:
  - lobby de cassino
  - filtros por categoria/tag
  - listagens por provider
  - badges `popular`, `new`, `jackpot`
  - fluxo de demo em `WebView`

#### Fraquezas
- O contrato atual não entrega thumbnail/imagem por jogo, o que limita encaixe direto nos cards visuais atuais da Home.
- `vendorId` existe, mas o front atual renderiza `provider` textual; isso pede adapter ou enriquecimento.

### `betting.service.ts` (`7 métodos`)

#### Métodos usados hoje
- nenhum

#### Métodos disponíveis
- `getPopularOdds()`
- `getSportBetAndDetails()`
- `getSportsBetInfo()`
- `getFugasoJackpots()`
- `getEgtJackpotData()`
- `getJackpotResultList()`
- `getJackpotResultDetails()`

#### Força funcional do domínio
- Forte para:
  - widget de odds populares
  - resumo/validação de cupom
  - confirmação de aposta
  - hub de jackpots
  - página de resultados de jackpot

#### Fraquezas
- Não existe hoje nenhuma tela consumidora.
- O front ainda não materializou `Apostas`, `Jackpot` nem um widget de odds reaproveitável.

## 3. Mapa do frontend atual

### Rotas reais no stack
- `Home`
- `Search`
- `Promotions`
- `Support`
- `GameHome`
- `Login`
- `Register`
- `Settings`

### Áreas fora do fluxo principal ou órfãs
- `src/screens/Perfil/Home/Perfil.view.tsx`
- `src/screens/teste/index.tsx`
- `src/navigation/types.ts` declara `Propaganda`, mas essa rota não entra no stack
- `src/navigation/TabRoutes.tsx` está vazio
- `src/components/TabBar/*` parece vestígio de uma navegação antiga baseada em paths (`Minigames`, `Leaderboards`, `Info`, `Profile`)

### Leitura por tela/feature

#### `Home`
- Tem layout forte, mas dados `100% estáticos`.
- `HomeCassino` renderiza:
  - `BannerCarousel`
  - `Ao vivo`
  - `Cassino em alta`
  - `PromoBanner`
  - `Novos cassinos`
- `HomeEsportes` renderiza:
  - `Próximas partidas`
- O `BottomNavBar` só altera estado visual local.
- O header mostra ícones de busca e settings, mas sem `onPress`.

#### `Search`
- Melhor uso atual do mock para esporte.
- Tela já está madura:
  - tabs de esporte
  - busca
  - recentes
  - trending
  - ligas em destaque
  - loading/error/empty

#### `Promotions`
- Melhor aproveitamento global da camada `config`.
- Faz composição real entre:
  - modules
  - news
  - dynamic content
  - web modules
  - custom events
  - trader defaults

#### `Support`
- Layout pronto e consistente.
- Dados são locais/static.
- Reusa `PromotionsSupportCard`.
- Não há contrato mock específico para FAQ/shortcut/help center.

#### `GameHome`
- Layout pronto de match detail, tabs e mercados.
- Tudo é estático:
  - score
  - times
  - tempo
  - odds
  - markets
  - tabs
- Depende de dados esportivos/betting, mas ainda sem adapter/mock plugado.

#### `Login`
- Form pronto com validação local.
- Usa `fakeLogin`.
- Sugere fluxos futuros:
  - login real
  - “Esqueci minha senha”
  - social login

#### `Register`
- Form pronto com validação local.
- Usa `Fake register`.
- Sugere fluxo de onboarding, mas não usa:
  - campos dinâmicos
  - validações de backend mockado
  - CPF lookup
  - países/moedas
  - identidade/instituição/status profissional

#### `Settings`
- Só cobre aparência:
  - modo escuro
  - alto contraste
- Não cobre notificações, odds, idioma ou preferências do produto, mesmo havendo mock que ajudaria nisso.

## 4. Matriz de cobertura mock ↔ front

| Domínio | Mock / Service / Método | Modelos relacionados | Tela / área do front | Tipo de match | Categoria | O que já acontece | O que falta | Onde utilizar | Recomendação |
|---|---|---|---|---|---|---|---|---|---|
| Config | `getTraderModules` + `getTraderDefaults` + `getContentByCode` + `getNews` + `getCustomEventsModules` + `getUsedWebModuleCodes` + `getWebModuleContentByCode` | `Module`, `TraderDefaults`, `TraderDynamicContent`, `News`, `CustomEventsModule`, `WebModuleContent` | `Promotions` | múltiplos | A | Tela já usa os contratos corretamente e com mapper próprio | ampliar detalhes/navegação para páginas internas | `Promotions` | manter como referência de integração |
| Fixtures | `getTodaySportTypes` + `searchFixtures` | `TodaySportType`, `SportType`, `Season`, `Fixture` | `Search` | múltiplos | A | busca, tabs, ligas, trending e destaque funcionam em cima do mock | drill-down para detalhe da liga/evento | `Search` + futuro detalhe | manter e usar como base para outras telas esportivas |
| Config | `getTraderModules` (módulos `sports-highlights`, `casino-popular`, `live-casino`) | `Module` | `Home` | nome + domínio | C | o front tem seções equivalentes, mas usa arrays locais | usar ordem/ativação de módulos na home | `Home` | trocar layout estático por home modular |
| Fixtures | `getUpcomingEvents` / `getPopularFixtures` / `getPromotedEvents` | `SportType`, `Fixture` | `HomeEsportes` | domínio + contrato | B | a tela existe, mas usa `UPCOMING_MATCHES` local | ligar cards a fixtures reais e criar seção promoted/live | `Home > Esportes` | priorizar conexão com `fixtures` |
| Fixtures | `getLeftMenu` | `SportType`, `Category`, `Season` | menu esportivo / taxonomia | domínio | E | não existe área real | criar navegação esportiva por esporte/país/liga | sidebar ou hub esportivo | transformar em feature de descoberta |
| Fixtures | `getAntepostSummary` | `SportType` | antepost / futures | domínio | E | não existe tela | criar hub de futuras/antepost | nova página ou aba em esportes | baixa/média prioridade |
| Fixtures | `getBetTypeGroups` | `SportBtgMarketsSummary` | `GameHome` / filtros de mercado | nome + domínio + contrato | C | screen de detalhes existe, mas não usa nenhum grupo de mercado | derivar tabs/mercados a partir do contrato | `GameHome` | usar para abandonar mercados hardcoded |
| Fixtures | `getDetailCard` / `getLeagueCard` | `SportType`, `Fixture`, `FixtureBtg` | `GameHome` | nome + domínio | D | a intenção de detalhe da partida é clara | o payload atual continua genérico demais para score/stats/timeline | `GameHome` | complementar mock com contrato de match detail |
| Casino | `getReservedCategories` | `ReservedCategory` | `HomeCassino` / lobby | nome + domínio | C | há seções e contagem visual, mas nada conectado | filtros e categorias reais | `Home > Cassino`, `Casino Lobby` | usar para tabs/filtros/count badges |
| Casino | `getReservedGames` | `ReservedGame` | `HomeCassino` / cards de jogo | domínio + contrato | D | existe área pronta para listas de jogos | faltam imagem e provider textual para encaixe direto nos cards atuais | `Home > Cassino` | enriquecer contrato ou criar adapter com fallback |
| Casino | `getCasinoTags` + `getCasinoGamesTags` | `CasinoTagsResponse`, `CasinoGamesTagsResponse` | filtros/badges do cassino | nome + domínio | C | badges atuais são estáticos (`live`, `new`) | usar tags reais para filtros, chips e ribbons | `HomeCassino`, lobby | conectar após `getReservedGames` |
| Casino | `getIframeGameList` | `GameListRecord`, `Provider`, `Game` | lobby por provider | domínio + contrato | E | não existe tela correspondente | provider pages e listas por lobby | nova página de lobby | feature forte com pouco retrabalho |
| Casino | `openDemoGame` + `launchDemo` | `OpenGame`, `LaunchGame` | abertura de jogo demo | nome + domínio | E | não existe modal/webview de demo | fluxo de abertura em `WebView` | modal ou tela nova | alta oportunidade para cassino |
| Betting | `getPopularOdds` | `PopularOddDto` | widget de odds / cards esportivos / `GameHome` | nome + domínio + contrato | C | há espaço natural para odds, mas nenhum consumo | card/lista de odds populares | `HomeEsportes`, `GameHome` | criar widget reaproveitável |
| Betting | `getSportBetAndDetails` + `getSportsBetInfo` | `VerifyTicketResult`, `SportsBetPlayResult` | `Apostas` / cupom / confirmação | domínio | E | menu sugere `Apostas`, mas não há tela | materializar betslip/receipt | nova área `Apostas` | prioridade alta se o produto quer simular jornada |
| Betting | `getJackpotResultList` + `getJackpotResultDetails` + `getFugasoJackpots` + `getEgtJackpotData` | `Jackpot`, `JackpotResultDetail`, `FugasoJackpots` | jackpot | nome + domínio | E | mock está pronto e a navbar mockada já sugere jackpot | criar hub, hero e resultados | nova página `Jackpot` | ótima feature nova baseada em mock existente |
| Config | `getTraderNavbar` | `TraderNavbarMenu` | sidebar / navegação | nome + domínio + uso indireto | C | sidebar e bottom nav são hardcoded | alinhar labels, ordem e novas entradas como `Jackpot` | `Sidebar`, possível top/bottom nav | usar `getTraderNavbar()` como fonte única |
| Config | `getWebMultilanguages` | `WebMultiLanguage` | labels hardcoded do app | domínio + contrato | C | quase toda UI está em texto fixo | camada i18n/configurável | shell do app | criar adapter de labels por chave |
| Config | `getTraderRegisterFields` + `getTraderPasswordValidation` | `TraderRegisterField`, `TraderPasswordValidation` | `Register` | nome + domínio + contrato | C | a tela existe, mas é totalmente hardcoded | form dinâmico e política de senha | `Register` | substituir regras fixas por contrato |
| Config | `getCustomerByCpfNumber` + `isValidCpf` + `isValidUserEmail` + `isValidUsername` | `CustomerResponse`, `OdinResponse` | `Register` | domínio + contrato | C | validação atual é local | pré-check de CPF/e-mail/username | `Register` | ligar antes do submit fake |
| Config | `getCountryList` + `getTraderCurrencyList` / `getCurrencyList` + `getTraderIdentityTypesByCode` + `getInstitutions` + `getProfessionalStatuses` | `WebCountry`, `Currency`, `TraderIdentityTypes`, `TraderInstitution`, `TraderProfessionalStatus` | onboarding/KYC | domínio | E | a tela atual não coleta esses dados | expansão de cadastro/KYC | nova etapa de cadastro | evoluir em etapas, não tudo de uma vez |
| Config | `getTraderThirdPartyAccounts` | `TraderThirdPartyAccount` | `Login` | nome + domínio | E | não existe botão social | social login mockado | `Login` | baixo esforço visual, média dependência |
| Config | `getTraderNotificationList` | `TraderCustomerNotificationType` | `Settings` / notificações | domínio + contrato | E | `Settings` hoje só cobre aparência | criar seção de notificações | `Settings` ou subpágina | bom ganho rápido |
| Config | `getTraderOddDisplayTypes` | `TraderOddDisplayType` | `Settings` / preferência de odds | nome + domínio | E | não existe configuração de odds | seletor decimal/fractional/american | `Settings` | encaixe natural |
| Config | `getTraderFavoriteTeamList` | `League`, `TraderFavouriteTeam` | onboarding esportivo / favoritos | domínio | E | não existe seleção de favoritos | preferências esportivas iniciais | onboarding ou perfil | média prioridade |
| Config | `getApplicationParameters` | `ApplicationSetting` | shell/config global | domínio | C | nenhum consumo | flags de GTM, live chat, limites e features | bootstrap/app shell | usar com cautela e adapter |
| Config | `getGeolocationLicense` | `GeolocationLicenseResponse` | compliance/pre-bet | domínio | E | não existe fluxo no mobile atual | gate ou banner regulatório | shell/aposta | baixa prioridade |
| Config | `getTraderPages` | `TraderPageTitleMeta` | mobile | nome parecido, mas contexto diferente | F | contrato é SEO/meta de páginas web | não é um bom match para app RN atual | nenhum | não priorizar |

## 5. Mocks existentes ainda não utilizados

### Domínio `casino`
- Tudo ainda não utilizado.
- Alvos mais naturais:
  - `getReservedCategories()` → tabs/filtros do lobby
  - `getReservedGames()` → listas da home/lobby
  - `getCasinoTags()` + `getCasinoGamesTags()` → badges e chips
  - `getIframeGameList()` → provider lobby
  - `openDemoGame()` / `launchDemo()` → modal de demo

### Domínio `betting`
- Tudo ainda não utilizado.
- Alvos mais naturais:
  - `getPopularOdds()` → home esportiva, widget, destaque
  - `getSportBetAndDetails()` / `getSportsBetInfo()` → cupom/apostas
  - jackpots → hub dedicado

### Domínio `config`
- Sem uso e com match direto em telas já existentes:
  - `getTraderNavbar()` → sidebar/navegação
  - `getTraderRegisterFields()` / `getTraderPasswordValidation()` → cadastro
  - `getCustomerByCpfNumber()` + validações → cadastro
  - `getTraderNotificationList()` / `getTraderOddDisplayTypes()` → settings
  - `getWebMultilanguages()` → textos fixos
- Sem uso e com mais cara de feature nova:
  - `getTraderFavoriteTeamList()`
  - `getTraderThirdPartyAccounts()`
  - `getGeolocationLicense()`
  - `getMultiBetRates()`

### Domínio `fixtures`
- Sem uso e com match forte em telas já existentes:
  - `getUpcomingEvents()`
  - `getPopularFixtures()`
  - `getPromotedEvents()`
  - `getBetTypeGroups()`
  - `getDetailCard()`
  - `getLeagueCard()`
- Sem uso e com match mais exploratório:
  - `getAntepostSummary()`
  - `getLeftMenu()`

## 6. Telas/features do front sem cobertura suficiente

### `HomeEsportes`
- Existe layout pronto, mas depende de arrays locais.
- Cobertura mock disponível:
  - parcial, via `fixtures`
- Gaps reais:
  - ligação com fixtures reais
  - sessão promoted/live
  - possível imagem/avatar de evento, se o produto exigir thumbnail

### `HomeCassino`
- Existe layout pronto, mas depende de arrays locais.
- Cobertura mock disponível:
  - parcial, via `casino`
- Gaps reais:
  - imagem por jogo
  - provider legível
  - política clara de agrupamento por seção (`live`, `popular`, `new`)

### `GameHome`
- Existe layout pronto, mas totalmente hardcoded.
- Cobertura mock disponível:
  - parcial, via `fixtures.getBetTypeGroups()`, `fixtures.getDetailCard()/getLeagueCard()` e `betting.getPopularOdds()`
- Gaps reais:
  - contrato de detalhe do evento com score/stats/timeline
  - markets orientados a fixture
  - ligação do `Search`/`Home` com um `fixtureId`

### `Register`
- Existe fluxo pronto, mas sem uso dos contratos de cadastro já mockados.
- Cobertura mock disponível:
  - forte no domínio `config`
- Gaps reais:
  - adapter de contrato para o form
  - validação assíncrona mockada
  - decisão de produto sobre cadastro mínimo versus cadastro completo

### `Support`
- Existe tela pronta, mas sem backend mock.
- Cobertura mock disponível:
  - apenas indireta, via `getContentByCode()` / `getWebModuleContentByCode()`
- Gaps reais:
  - não existe contrato de FAQ/shortcut/help center

### Navegação
- Existem navbars/sidebar hardcoded com intenção de produto mais ampla que a implementação atual.
- Cobertura mock disponível:
  - `getTraderNavbar()`
- Gaps reais:
  - adapter do menu
  - destino funcional para `Ao Vivo`, `Apostas`, `Jackpot`

## 7. Oportunidades de novas features baseadas nos mocks

| Feature | Base mockada disponível | Área sugerida | Reuso de componentes | Complexidade | Prioridade |
|---|---|---|---|---|---|
| Lobby de cassino | `getReservedCategories`, `getReservedGames`, `getCasinoTags`, `getCasinoGamesTags` | nova página/aba de cassino | `GameRow`, `GameCard`, `SectionHeader` | média | alta |
| Demo de jogo em webview | `openDemoGame`, `launchDemo` | modal/tela `GameDemo` | shell RN + `WebView` | média | alta |
| Hub de jackpots | `getFugasoJackpots`, `getEgtJackpotData`, `getJackpotResultList`, `getJackpotResultDetails` | nova página `Jackpot` | cards/listas novas, pode reaproveitar `SectionHeader` | média | alta |
| Widget de odds populares | `getPopularOdds` | `HomeEsportes` / `GameHome` | criar card simples reutilizável | baixa/média | alta |
| Betslip / área de apostas | `getSportBetAndDetails`, `getSportsBetInfo`, `getMultiBetRates` | nova área `Apostas` | drawer/modal novo | média/alta | alta |
| Home esportiva data-driven | `getUpcomingEvents`, `getPopularFixtures`, `getPromotedEvents` | `HomeEsportes` | `UpcomingMatches`, novos cards | média | alta |
| Home modular | `getTraderModules` | `Home` | seções existentes | média | média |
| Navegação dinâmica | `getTraderNavbar` | sidebar/nav | `Sidebar`, `BottomNavBar` | média | média |
| Cadastro orientado a contrato | `getTraderRegisterFields` + validações/KYC | `Register` | form atual | média | média |
| Preferências de odds e notificações | `getTraderOddDisplayTypes`, `getTraderNotificationList` | `Settings` | `Settings` atual | baixa | média |
| Favoritos esportivos | `getTraderFavoriteTeamList` | onboarding/perfil | chips/listas simples | média | baixa |
| Antepost/futures hub | `getAntepostSummary` | esportes | novos cards/listas | média | baixa |

## 8. De-para de features

- `backend/mocks/fixtures.mocks.ts` → `Search`, `HomeEsportes`, futuro hub esportivo, detalhe de jogo
- `getTodaySportTypes()` → tabs de esporte e escopo inicial de busca
- `searchFixtures()` → ligas pesquisáveis e cards de resultado
- `getUpcomingEvents()` → `Próximas partidas`
- `getPopularFixtures()` → destaques da home esportiva
- `getPromotedEvents()` → banners/cards de destaque esportivo
- `getBetTypeGroups()` → tabs e grupos de mercados do `GameHome`
- `getDetailCard()` / `getLeagueCard()` → drill-down esportivo/detalhe
- `backend/mocks/config.mocks.ts` → promoções, navegação, cadastro, settings, i18n, onboarding
- `getNews()` → promoções / hub editorial / banners promocionais
- `getTraderModules()` → home dinâmica / montagem de seções
- `getContentByCode()` → blocos CMS como hero/support/intro
- `getWebModuleContentByCode()` → termos, responsible gaming, rodapé, conteúdos CMS adicionais
- `getTraderNavbar()` → sidebar/nav dinâmica
- `getTraderRegisterFields()` → cadastro orientado a contrato
- `getCountryList()` + `getCurrencyList()` → onboarding/KYC
- `getTraderOddDisplayTypes()` → preferência de odds
- `getTraderNotificationList()` → settings de notificações
- `getWebMultilanguages()` → labels dinâmicos/i18n
- `backend/mocks/casino.mocks.ts` → lobby/cassino/categories/providers/demo
- `getReservedCategories()` → categorias/filtros
- `getReservedGames()` → listagens/cards
- `getCasinoTags()` + `getCasinoGamesTags()` → taxonomia de chips/badges
- `getIframeGameList()` → providers/lobbies
- `openDemoGame()` + `launchDemo()` → modal/tela de demo
- `backend/mocks/betting.mocks.ts` → odds/cupom/jackpots
- `getPopularOdds()` → widgets de odds / destaque / cards de aposta
- `getSportBetAndDetails()` + `getSportsBetInfo()` → cupom e confirmação
- `getJackpotResultList()` + `getJackpotResultDetails()` → seção/página de jackpots
- `getFugasoJackpots()` + `getEgtJackpotData()` → hero/contadores de jackpot

## 9. Gaps técnicos

### Contratos insuficientes
- `casino` não entrega imagem por jogo, o que trava encaixe direto em `GameCard`.
- `GameHome` não tem contrato mockado suficientemente rico para score/timeline/stats.
- `fixtures` reutiliza demais o mesmo `mockSportListResponse` para métodos semanticamente diferentes.

### Campos faltantes
- `HomeCassino` pede `image` e `provider` explícitos.
- `HomeEsportes` pode pedir thumbnail/avatar se o produto quiser manter o layout atual.
- `GameHome` pede IDs/shape claros para navegar de `Search`/`Home` até o detalhe.

### Nomes ou intenções confusas
- `getTraderPages()` parece web-only e gera falso positivo para mobile.
- `BottomNavBar` e `Sidebar` não refletem fielmente o que o mock de navbar entrega.
- `TabBar/*`, `Perfil`, `teste`, `Propaganda` e `TabRoutes.tsx` criam ruído arquitetural.

### Services sem consumidor
- `casino.service.ts` inteiro
- `betting.service.ts` inteiro
- maior parte de `config.service.ts`
- maior parte de `fixtures.service.ts`

### UI sem fonte confiável
- `Home`
- `GameHome`
- `Support`
- `Login`
- `Register`

### Necessidade de adapters
- `casino` → adapter para provider name + fallback image + agrupamentos
- `config` → adapter de cadastro dinâmico
- `fixtures/betting` → adapter para `GameHome`
- `config/navbar` → adapter para estrutura real de navegação mobile

### Necessidade de padronização
- escolher uma estratégia única para “dados mockados de domínio” versus “fakes locais de tela”
- hoje convivem:
  - mock layer tipada em `backend/`
  - arrays hardcoded na tela
  - `fakeLogin`
  - `fake register`

## 10. Perguntas inteligentes para validar com o time

1. `Register` deve continuar mínimo no mobile ou a intenção é aproximá-lo dos contratos completos de onboarding/KYC já mockados?
2. A `Home` deve ser uma home modular dirigida por `getTraderModules()` ou apenas uma vitrine fixa com alguns dados plugados?
3. `GameHome` é para ser um detalhe esportivo real orientado a `fixtureId` ou só uma tela conceitual para layout?
4. O time quer materializar primeiro `Lobby de Cassino`, `Apostas` ou `Jackpot`? Os três já têm base mockada, mas competem por prioridade.
5. `Sidebar` deve espelhar `getTraderNavbar()` ou permanecer como navegação mobile própria?
6. `Support` precisa de FAQ dinâmico/CMS ou continuará editorial/local por enquanto?
7. O produto quer suportar `social login` no mobile? Se sim, `getTraderThirdPartyAccounts()` já pode orientar a UI.
8. `Settings` deve incluir idioma, odds e notificações? Há mock para isso, mas não há shell pronto além de aparência.
9. O front aceitará fallback visual local para jogos de cassino enquanto o contrato não expõe imagens, ou preferimos enriquecer o mock primeiro?
10. Há interesse em transformar `Search -> GameHome` em navegação real por `fixtureId` nesta etapa, ou primeiro queremos apenas popular a Home?
