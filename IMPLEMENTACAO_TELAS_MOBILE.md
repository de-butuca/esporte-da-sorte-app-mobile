# Implementacao das Telas Mobile (Promotions, Support, Search)

## 1) Objetivo
Este documento consolida tudo o que foi implementado nas telas mobile recentes, seguindo o padrao do projeto:

- `Promotions`
- `Support`
- `Search`

Tambem cobre:

- integracao com mocks do backend
- navegacao
- mapeamento de dados
- estados de tela (loading, error, empty)
- ajustes visuais feitos durante a validacao

---

## 2) Arquitetura aplicada
Padrao mantido no app:

- `screen/view.tsx` para composicao UI
- `screen/viewmodel.ts` para regra de negocio, estado e dados
- componentes pequenos em `screen/components/*`
- mappers para adaptar contrato bruto do mock para view model de tela
- React Query para carregamento assincrono

### Exemplo de uso de React Query
```ts
const query = useQuery({
  queryKey: ['promotions-screen', device, languageId],
  queryFn: getPromotionsScreenData,
});
```

---

## 3) Servicos mock utilizados
Nos fluxos implementados, os servicos usados foram:

- `MockConfigService` (tela de `Promotions`)
- `MockFixturesService` (tela de `Search`)

### Exemplo real (Promotions)
```ts
const configService = new MockConfigService();

await Promise.all([
  configService.getTraderModules(domain, device),
  configService.getContentByCode({ traderId, languageId, device, requestBody: { code: 'promotions-intro' } }),
  configService.getNews(domain, languageId, device, traderId),
  configService.getUsedWebModuleCodes(domain, device, language),
]);
```

### Exemplo real (Search)
```ts
const fixturesService: IFixturesService = new MockFixturesService();

const [todaySportsResponse, searchableSportsResponse] = await Promise.all([
  fixturesService.getTodaySportTypes(device, language, trader),
  fixturesService.searchFixtures(device, language, trader),
]);
```

---

## 4) Tela Promotions
### Arquivos principais
- `src/screens/promotions/view.tsx`
- `src/screens/promotions/viewmodel.ts`
- `src/screens/promotions/promotions.mapper.ts`
- `src/screens/promotions/promotions.types.ts`
- `src/screens/promotions/components/*`

### O que foi entregue
- header com voltar, titulo e descricao
- hero principal
- filtros (chips)
- lista de cards promocionais
- bloco de termos
- bloco de suporte
- rodape de jogo responsavel
- estados `loading`, `error` e `empty`

### Exemplo de acao de card
```ts
function openPromotion(promotion: PromotionCardViewModel | PromotionHeroViewModel) {
  requireAuth(() => {
    if (promotion.categories.includes('Esportes')) {
      navigation.navigate('GameHome');
      return;
    }
    Alert.alert(promotion.title, 'Destino preparado para rota real.');
  });
}
```

### Ajuste feito no botao CTA
A seta saiu do posicionamento absoluto e passou para `rightIcon` dentro do `ButtonBase`.

```tsx
<ButtonBase
  text={card.ctaLabel}
  variant="accent"
  rightIcon={<ChevronRight size={16} color={lightColors.bgNav} />}
  onPress={...}
/>
```

---

## 5) Tela Support
### Arquivos principais
- `src/screens/support/view.tsx`
- `src/screens/support/viewmodel.ts`
- `src/screens/support/support.types.ts`
- `src/screens/support/components/SupportFaqItem.tsx`

### O que foi entregue
- header com voltar e titulo
- campo de busca
- atalhos rapidos
- FAQ com accordion
- card final "Fala com a gente"

### Ajustes feitos apos feedback
- atalhos em **2 por linha**
- FAQ iniciando **fechado**

### Exemplo do estado inicial do FAQ
```ts
const [expandedFaqIds, setExpandedFaqIds] = useState<string[]>([]);
```

---

## 6) Tela Search
### Arquivos principais
- `src/screens/search/view.tsx`
- `src/screens/search/viewmodel.ts`
- `src/screens/search/search.mapper.ts`
- `src/screens/search/search.types.ts`
- `src/screens/search/components/*`

### O que foi entregue
- header com voltar + campo de busca
- tabs de esporte (chips horizontais)
- bloco "Em alta agora"
- bloco "Ligas em destaque"
- buscas recentes (na sessao da tela)
- estado de resultados
- estado sem resultado
- loading e error

### Mapeamento de dados (mock -> view model)
```ts
export function mapSearchScreenData(params: { todaySports: TodaySportType[]; sports: SportType[] }) {
  const sports = params.todaySports.map(mapSportChip);
  const leagues = mapLeagueCards(params.sports).sort((left, right) => {
    if (left.isLive !== right.isLive) return left.isLive ? -1 : 1;
    if (left.matchCount !== right.matchCount) return right.matchCount - left.matchCount;
    if (left.totalOdds !== right.totalOdds) return right.totalOdds - left.totalOdds;
    return left.title.localeCompare(right.title);
  });

  return { sports, leagues };
}
```

### Ajuste do titulo de liga (correcao visual)
Foi corrigido para usar nome completo da temporada e remover apenas sufixo de ano:

```ts
function getLeagueDisplayTitle(season: Pick<Season, 'seaN' | 'lName' | 'leagueName'>) {
  const rawTitle = season.seaN ?? season.lName ?? season.leagueName ?? '';
  return rawTitle.replace(/\s+\d{4}(?:\/\d{2})?$/, '').trim();
}
```

---

## 7) Navegacao
### Rotas adicionadas
- `Promotions`
- `Support`
- `Search`

Arquivos alterados:

- `src/navigation/types.ts`
- `src/navigation/appRoutes.tsx`

### Exemplo de navegacao pela lupa no HomeHeader
```ts
const handleSearchPress = useCallback(() => {
  navigation.navigate('Search', {
    initialSportSlug: activeCategory === 'esportes' ? 'futebol' : undefined,
  });
}, [activeCategory, navigation]);
```

---

## 8) Mocks ajustados
Arquivo alterado:

- `backend/mocks/fixtures.mocks.ts`

Ajustes:

- enriquecimento de fixtures
- adicao de ligas para busca:
  - Copa do Brasil
  - Premier League
  - Libertadores

Isso melhorou a densidade do catalogo da tela de pesquisa sem criar contrato novo.

---

## 9) Ajustes globais de espacamento no topo
Foi identificado padrao de telas com header "colado" no topo por uso direto de `insets.top`.

Correcao aplicada (padrao):
```ts
paddingTop: insets.top + RFValue(10)
```

Telas ajustadas:

- `Search`
- `Support`
- `Promotions`
- `Login`

---

## 10) Validacao tecnica
Comando executado:

```bash
npm run check
```

Status:

- `OK` apos os ajustes finais

---

## 11) Resumo rapido do que foi concluido
- arquitetura do projeto preservada
- mocks existentes reutilizados
- sem estrutura paralela
- sem `any`
- componentes e mappers separados por responsabilidade
- telas com comportamento mobile-first e estados de tela completos

