# Unused Mocks And Feature Opportunities

## 1. Mocks existentes mas ainda não plugados

### 1.1. Já têm tela relacionada no front

| Domínio | Mock / método | O que entrega | Tela já existente? | Onde poderia entrar | Classificação |
|---|---|---|---|---|---|
| Config | `getTraderNavbar()` | menu, ordem, labels, submenus | sim | `Sidebar`, eventual nav principal | C |
| Config | `getTraderRegisterFields()` | campos/ordem/grupos de cadastro | sim | `Register` | C |
| Config | `getTraderPasswordValidation()` | política de senha | sim | `Register` | C |
| Config | `getCustomerByCpfNumber()` | lookup por CPF | sim | `Register` | C |
| Config | `isValidCpf()` / `isValidUserEmail()` / `isValidUsername()` | validação assíncrona | sim | `Register` | C |
| Config | `getTraderNotificationList()` | tipos de notificação | sim | `Settings` | C |
| Config | `getTraderOddDisplayTypes()` | formatos de odds | sim | `Settings` | C |
| Config | `getWebMultilanguages()` | labels/mensagens por chave | sim | shell inteiro do app | C |
| Fixtures | `getUpcomingEvents()` | agenda de eventos | sim | `HomeEsportes` | C |
| Fixtures | `getPopularFixtures()` | destaques esportivos | sim | `HomeEsportes` | C |
| Fixtures | `getPromotedEvents()` | eventos promovidos | sim | `HomeEsportes` | C |
| Fixtures | `getBetTypeGroups()` | grupos de mercado | sim | `GameHome` | C |
| Fixtures | `getDetailCard()` | detalhe genérico do evento | sim | `GameHome` | C |
| Fixtures | `getLeagueCard()` | card/lista por liga | sim | `GameHome` ou detalhe de liga | C |
| Casino | `getReservedCategories()` | categorias e contagens | sim | `HomeCassino` | C |
| Casino | `getReservedGames()` | lista de jogos | sim | `HomeCassino` | D |
| Casino | `getCasinoTags()` / `getCasinoGamesTags()` | taxonomia por tags | sim | `HomeCassino` | C |
| Betting | `getPopularOdds()` | odds populares | sim | `HomeEsportes`, `GameHome` | C |

### 1.2. Ainda não têm tela, mas o mock já sustenta feature nova

| Feature candidata | Mock / métodos base | Área sugerida | Reuso possível | Complexidade | Prioridade |
|---|---|---|---|---|---|
| Lobby de cassino por provider | `getIframeGameList()` | nova página `Cassino` | `GameRow`, `GameCard`, `SectionHeader` | média | alta |
| Abrir jogo demo | `openDemoGame()`, `launchDemo()` | modal/tela de jogo | `WebView`, shell RN atual | média | alta |
| Hub de jackpots | `getFugasoJackpots()`, `getEgtJackpotData()`, `getJackpotResultList()`, `getJackpotResultDetails()` | nova página `Jackpot` | `SectionHeader`, listas, cards | média | alta |
| Área `Apostas` / cupom | `getSportBetAndDetails()`, `getSportsBetInfo()`, `getMultiBetRates()` | nova página, drawer ou aba | componentes novos de betslip | média/alta | alta |
| Favoritos esportivos | `getTraderFavoriteTeamList()` | onboarding/perfil | chips/listas | média | média |
| Social login | `getTraderThirdPartyAccounts()` | `Login` | form atual | baixa/média | média |
| Settings de odds | `getTraderOddDisplayTypes()` | `Settings` | tela atual | baixa | média |
| Settings de notificações | `getTraderNotificationList()` | `Settings` | tela atual | baixa | média |
| Home modular | `getTraderModules()` | `Home` | seções atuais | média | média |
| Antepost/futures | `getAntepostSummary()` | esportes | novas listas/cards | média | baixa |

## 2. Mocks subutilizados

### `Promotions`
- O fluxo é o melhor integrado do projeto, mas ainda subutiliza:
  - `getTraderModules()` apenas como chave booleana de visibilidade
  - `getTraderDefaults()` quase só para `18+`
  - `getUsedWebModuleCodes()`/`getWebModuleContentByCode()` apenas para `terms-conditions`, `responsible-gaming`, `footer-text`
  - `getNews()` apenas como feed/lista; não existe detalhe próprio de campanha/notícia

### `Search`
- Usa bem `getTodaySportTypes()` e `searchFixtures()`, mas ainda não evolui para:
  - detalhe de liga
  - promoted fixtures
  - próximos eventos
  - grupos de mercado

## 3. Áreas do front que já existem, mas ainda pedem melhor encaixe de mock

### `HomeEsportes`
- Pode consumir imediatamente:
  - `getUpcomingEvents()`
  - `getPopularFixtures()`
  - `getPromotedEvents()`
- Ganho:
  - substituir `UPCOMING_MATCHES`
  - transformar a home esportiva em algo real

### `HomeCassino`
- Pode consumir com adapter:
  - `getReservedCategories()`
  - `getReservedGames()`
  - `getCasinoTags()`
  - `getCasinoGamesTags()`
- Dependência:
  - resolver imagem/provider dos cards

### `GameHome`
- Pode começar com:
  - `getBetTypeGroups()`
  - `getPopularOdds()`
- Mas segue faltando contrato adequado para:
  - placar detalhado
  - timeline
  - estatísticas
  - lineup/campo

### `Register`
- Pode aproveitar imediatamente:
  - `getTraderRegisterFields()`
  - `getTraderPasswordValidation()`
  - `isValidCpf()`
  - `isValidUserEmail()`
  - `getCustomerByCpfNumber()`
- Mas pede decisão de produto:
  - cadastro mínimo ou cadastro completo

## 4. Casos em que o nome parece bater, mas não é match real

| Mock / método | Nome que pode enganar | Por que não é match real | Classificação |
|---|---|---|---|
| `getTraderPages()` | qualquer tela mobile | contrato é de meta tags/SEO web | F |
| `getNews()` | `Search` / “Em alta agora” | `Search` precisa entidades esportivas, não conteúdo editorial | F |
| `getTraderNotificationList()` | FAQ de `Support` | o contrato lista preferências de notificação, não artigos de ajuda | F |
| `getCountryList()` | `Support` ou `Settings` | não existe selector de país nessas telas | F |
| `getTraderNavbar()` | `BottomNavBar` atual | a bottom bar atual tem outra estrutura/intenção; melhor match é `Sidebar` | F |

## 5. Recomendações de ataque rápido

### Melhor ROI imediato
1. Conectar `HomeEsportes` com `fixtures`
2. Conectar `Settings` com `getTraderNotificationList()` e `getTraderOddDisplayTypes()`
3. Conectar `Register` com `getTraderRegisterFields()` e validações mockadas
4. Criar um widget simples de `getPopularOdds()` na home esportiva
5. Criar a primeira versão do `Lobby de Cassino`

### Melhor ROI estratégico
1. Criar `Jackpot`
2. Criar `Apostas`/cupom mockado
3. Fazer `Sidebar`/home modular dirigidas por `config`
