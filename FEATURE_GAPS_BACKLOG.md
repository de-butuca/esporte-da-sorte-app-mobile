# Feature Gaps Backlog

## Alta prioridade

| Feature | Origem dos dados mockados | Onde entra no front | Tela já existe? | Criar área? | Risco | Dependências |
|---|---|---|---|---|---|---|
| Home esportiva data-driven | `fixtures.getUpcomingEvents()`, `getPopularFixtures()`, `getPromotedEvents()` | `Home > Esportes` | sim | não | baixo/médio | adapter de fixtures para `MatchCard` e novas seções |
| Cadastro orientado a contrato | `config.getTraderRegisterFields()`, `getTraderPasswordValidation()`, `isValidCpf()`, `isValidUserEmail()`, `getCustomerByCpfNumber()` | `Register` | sim | não | médio | decisão sobre cadastro mínimo vs completo |
| Widget de odds populares | `betting.getPopularOdds()` | `HomeEsportes` ou `GameHome` | parcialmente | talvez | baixo/médio | criar componente de odd card |
| Lobby de cassino v1 | `casino.getReservedCategories()`, `getReservedGames()`, `getCasinoTags()`, `getCasinoGamesTags()` | `Home > Cassino` ou nova página `Cassino` | parcialmente | talvez | médio | adapter para imagem/provider/fallback |
| Área `Apostas` / cupom | `betting.getSportBetAndDetails()`, `getSportsBetInfo()`, `getMultiBetRates()` | menu `Apostas` | não | sim | médio/alto | UX do cupom, seleção de odds e estado global |
| Jackpot hub | `betting.getFugasoJackpots()`, `getEgtJackpotData()`, `getJackpotResultList()`, `getJackpotResultDetails()` | nova página `Jackpot` | não | sim | médio | navegação, cards, detalhe/resultado |

## Média prioridade

| Feature | Origem dos dados mockados | Onde entra no front | Tela já existe? | Criar área? | Risco | Dependências |
|---|---|---|---|---|---|---|
| Navegação dinâmica | `config.getTraderNavbar()` | `Sidebar`, futura nav principal | parcialmente | não | médio | adapter entre contrato web e IA mobile |
| Settings de notificações | `config.getTraderNotificationList()` | `Settings` | sim | não | baixo | seção nova na tela |
| Settings de odds | `config.getTraderOddDisplayTypes()` | `Settings` | sim | não | baixo | seletor simples + persistência |
| Home modular | `config.getTraderModules()` | `Home` | sim | não | médio | decisão de produto sobre ordem/ativação |
| Demo de jogo | `casino.openDemoGame()`, `launchDemo()` | cassino/lobby | não | sim | médio | `WebView`, navegação, controle de sessão |
| Social login mockado | `config.getTraderThirdPartyAccounts()` | `Login` | sim | não | baixo/médio | UX e decisão de produto |
| i18n/labels dinâmicos | `config.getWebMultilanguages()` | shell inteiro | sim | não | médio | estratégia de keys e fallback |

## Baixa prioridade

| Feature | Origem dos dados mockados | Onde entra no front | Tela já existe? | Criar área? | Risco | Dependências |
|---|---|---|---|---|---|---|
| Favoritos esportivos | `config.getTraderFavoriteTeamList()` | onboarding/perfil | não | sim | médio | decisão de UX |
| Antepost/futures | `fixtures.getAntepostSummary()` | esportes | não | sim | médio | cards e taxonomia |
| Geolocation/compliance | `config.getGeolocationLicense()` | shell/apostas | não | sim | baixo/médio | alinhamento regulatório |
| Shell configurável por parâmetros | `config.getApplicationParameters()` | bootstrap/app shell | não | sim | baixo | policy de consumo de parâmetros |

## Gaps técnicos que viram backlog

### 1. Home cassino ainda não encaixa direto no mock
- Problema:
  - `GameCard` pede `image` e `provider`
  - `casino` não entrega thumbnail direta
- Ação:
  - adicionar `imageUrl`/`thumbnailUrl` ao mock
  - ou definir adapter com fallback local

### 2. `GameHome` não tem contrato suficiente
- Problema:
  - tela pede score, tempo, tabs, stats, mercados e contexto de evento
- Ação:
  - complementar `fixtures` com contrato dedicado de match detail
  - reaproveitar `betting.getPopularOdds()` e `fixtures.getBetTypeGroups()` para a primeira versão

### 3. Duplicidade de estratégia de mock
- Problema:
  - coexistem mock layer tipada e fakes locais por tela
- Ação:
  - padronizar:
    - sempre preferir `backend/services/*`
    - arrays locais apenas como fallback temporário

### 4. Navegação com intenção maior que a implementação
- Problema:
  - `Ao Vivo`, `Apostas`, `Jackpot`, ícones de busca/settings e rota `Propaganda` sugerem produto mais amplo do que o stack real
- Ação:
  - consolidar mapa de rotas-alvo
  - remover ruído ou materializar destinos

## Sugestão de sequência incremental

1. `HomeEsportes` com `fixtures`
2. `Register` usando contratos de `config`
3. `Settings` com notificações/odds
4. widget de `PopularOdds`
5. `HomeCassino` com adapter
6. `Jackpot`
7. `Apostas`
8. `GameHome` data-driven

## Perguntas para destravar execução

1. A primeira entrega deve focar em valor visível para produto (`Home`, `Cassino`, `Jackpot`) ou em coerência arquitetural (`Register`, `Settings`, navegação`)?
2. `GameHome` entra agora no escopo ou ainda pode continuar como protótipo visual?
3. O cadastro mobile deve permanecer resumido ou precisa convergir para o contrato completo de onboarding?
4. A equipe prefere enriquecer os mocks de `casino` com imagem/provider ou aceita fallback visual local nesta fase?
