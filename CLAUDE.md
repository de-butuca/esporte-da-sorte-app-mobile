# Esporte da Sorte - Mobile App

## Stack

- **Framework:** Expo SDK 55 + React Native 0.83.4 + React 19
- **Language:** TypeScript 5.9 (strict mode)
- **Navigation:** @react-navigation/native-stack v7
- **State:** Zustand (session/auth), React Query (server state), Context API (toast, api repo)
- **Forms:** react-hook-form + zod validation
- **HTTP:** axios with interceptors
- **Design System:** stampd (compile-time tokens + runtime theming)
- **Icons:** lucide-react-native
- **Animations:** react-native-reanimated, lottie-react-native
- **Storage:** expo-secure-store

## Architecture

```
src/
  screens/          # Telas - view.tsx (UI) + viewmodel.ts (lógica)
  components/       # Componentes reutilizáveis (index.tsx exports)
  navigation/       # RootNavigator, appRoutes, types, hooks
  core/             # Auth guards, HTTP client, session store, services
  domain/           # Interfaces e tipos de domínio
  infra/            # Repositórios (implementação)
  useCases/         # Casos de uso
  contexts/         # React Contexts (Toast, ApiRepository)
  hooks/            # Custom hooks (useAuthGuard, useTimer, etc.)
  shared/           # UI compartilhada (animated headers/scroll)
  theme/            # Design tokens (colors, spacing, typography, shadows)
  config/           # Environment, constants
  types/            # Type definitions globais
```

### Patterns

- **MVVM:** Screens usam `view.tsx` + `viewmodel.ts`
- **Repository Pattern:** `domain/` define interfaces, `infra/` implementa
- **Auth Guard:** `useAuthGuard()` / `useRequireAuth()` protegem ações
- **Session:** Zustand store com persistência em SecureStore

## stampd - Design System

stampd é um Babel plugin que resolve design tokens em **tempo de compilação**. Tokens estáticos (spacing, radius, size) viram valores literais no bundle. Cores que mudam entre light/dark são resolvidas em runtime via React Context.

### Setup

1. `babel.config.js`: `'module:stampd'` nos plugins (antes do reanimated)
2. `src/stampd.config.ts`: define tokens, theme e fonts via `createTheme()`
3. `StampdUIProvider` wraps the app em `src/providers.tsx`
4. `stampd-types.d.ts` é auto-gerado (nunca editar manualmente)

### Como usar Styled Components

```tsx
import { Styled } from 'stampd/styled';

// Componente com tokens compilados + cores runtime
const Card = Styled.View({
  style: ({ theme }) => ({
    backgroundColor: theme.colors.surface,   // runtime (light/dark)
    padding: theme.spacing.p4,               // compile-time -> 16
    borderRadius: theme.radius.roundedLg,    // compile-time -> 12
  }),
});

// Variantes type-safe
const Button = Styled.TouchableOpacity({
  style: ({ theme }) => ({ backgroundColor: theme.colors.primary }),
  attrs: { activeOpacity: 0.8 },
  variants: {
    size: {
      sm: ({ theme }) => ({ paddingVertical: theme.size.s2 }),
      full: ({ theme }) => ({ padding: theme.size.s4, width: '100%' }),
    },
  },
});
// Uso: <Button size="full" />

// Props dinâmicas
const Tag = Styled.View({
  style: ({ theme, selected }) => ({
    backgroundColor: selected ? theme.colors.primary : theme.colors.surface,
  }),
});
// Uso: <Tag selected={isActive} />
```

### Componentes suportados

`View`, `Text`, `TextInput`, `Image`, `ImageBackground`, `ScrollView`, `Pressable`, `TouchableOpacity`, `KeyboardAvoidingView`, `FlatList`, `SectionList`

### Text/TextInput auto-injetam fonts

`Styled.Text` e `Styled.TextInput` recebem `fontFamily` e `fontSize` automaticamente do `fonts.default`. Só sobrescreva se precisar.

### Theme switching

```tsx
import { useStampdUI, ThemeMode } from 'stampd/context';
const { theme, themeMode, setThemeMode } = useStampdUI();
setThemeMode(ThemeMode.DARK);
```

### Prioridade de estilos

`fonts.default < base style < variants < style prop do usuário`

### Tokens disponíveis

- **Spacing:** p1(4) p2(8) p3(12) p4(16) p5(20) p6(24) p8(32), mesmos para m* e gap*
- **Radius:** roundedSm(2) rounded(4) roundedMd(8) roundedLg(12) roundedXl(16) roundedFull(9999)
- **Size:** s1(4) s2(8) s3(12) s4(16) s5(20) s6(24) s7(28) s8(32) s10(40) s12(48) s14(56) s16(64) s20(80) s24(96) s28(112) s32(128)
- **Font sizes:** xs(12) sm(14) base(16) lg(18) xl(20) xl2(22) xl3(24)
- **Font families:** regular(Inter_400Regular) medium(Inter_500Medium) bold(Inter_700Bold)

### Regras stampd

- Use `theme.spacing.*`, `theme.radius.*`, `theme.size.*` para tokens estáticos (custo zero)
- Use `theme.colors.*` para cores que mudam entre temas
- Use `variants` ao invés de condicionais para variações visuais fixas
- Use `attrs` para props padrão do RN (placeholderTextColor, activeOpacity)
- Inclua `stampd-types.d.ts` no tsconfig (já configurado)
- Plugin stampd DEVE vir antes de `react-native-reanimated/plugin` no babel.config.js
- Exportar styled components com namespace: `export const BBS = { container, Text }` (Button Base Styled)

## Design Tokens (cores principais)

| Token | Valor | Uso |
|---|---|---|
| `primary` | #023697 | Azul principal, botões |
| `background` | #01003A | Background geral dark |
| `bgNav` | #02003D | Background navegação |
| `bgCard` | #0A0F2E | Background cards |
| `accent` | #38E67D | Verde destaque, CTAs |
| `textPrimary` | #FFFFFF | Texto principal |
| `textSecondary` | #F0F0F0 | Texto secundário |
| `textMuted` | #A0A0B0 | Texto sutil |
| `textInactive` | #6B6B8A | Texto inativo |
| `live` | #FF3B3B | Indicador ao vivo |
| `error` | #B3261E | Erros |

## Shadows

4 níveis (`shadows.level1` a `level4`) com valores platform-specific (iOS shadowColor/Android elevation). Importar de `@/theme/design-tokens`.

## Convenções de código

### Nomenclatura

- **Componentes/Types:** PascalCase (`HomeHeader.tsx`, `SessionUser`)
- **Hooks:** camelCase com `use` prefix (`useAuthGuard.ts`)
- **Screens:** `nome/view.tsx` + `nome/viewmodel.ts`
- **Styles:** `styles.ts` separado ou inline `StyleSheet.create`
- **Exports:** index.tsx para componentes, named exports preferidos

### Estilização

- Usar `RFValue()` de `react-native-responsive-fontsize` para dimensões responsivas
- Usar stampd `Styled.*` para componentes reutilizáveis com variantes
- `StyleSheet.create()` para screens e componentes simples
- Nunca hardcodar cores - usar design tokens ou `theme.colors.*`
- Shadows via `shadows.level1-4` do design-tokens

### React Native - Boas Práticas

- **Platform:** Usar `Platform.select()` ou `Platform.OS` para código platform-specific
- **SafeArea:** Sempre usar `useSafeAreaInsets()` de `react-native-safe-area-context`
- **Navigation:** Usar hooks tipados `useAppNavigation()` e `useAppRoute<T>()`
- **Forms:** react-hook-form + zod schema, nunca state manual para forms complexos
- **State:** Zustand para state global persistente, Context para injeção de dependência
- **Avoid:** Inline styles repetidos, anonymous functions em renderProps de listas, imports circulares

## useEffect — Usar com cautela

`useEffect` é a maior fonte de bugs em projetos React/React Native. A maioria dos usos é desnecessária e deve ser substituída por alternativas melhores. **Antes de escrever um useEffect, pergunte: "existe outra forma?"**

### Quando NÃO usar useEffect

**1. Derivar dados de state/props — use variáveis ou `useMemo`**
```tsx
// ERRADO: useEffect para "sincronizar" state derivado
const [fullName, setFullName] = useState('');
useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);

// CORRETO: derivar direto no render (custo zero)
const fullName = `${firstName} ${lastName}`;

// CORRETO: se o cálculo for pesado, use useMemo
const filtered = useMemo(() => items.filter(expensiveCheck), [items]);
```

**2. Resetar state quando uma prop muda — use `key`**
```tsx
// ERRADO: useEffect para resetar form quando muda de usuário
useEffect(() => {
  setFormData(initialData);
}, [userId]);

// CORRETO: usar key no componente pai força remount limpo
<UserForm key={userId} initialData={data} />
```

**3. Responder a eventos do usuário — use handlers**
```tsx
// ERRADO: useEffect observando state para fazer side effect
const [submitted, setSubmitted] = useState(false);
useEffect(() => {
  if (submitted) sendForm(data);
}, [submitted]);

// CORRETO: fazer o side effect direto no handler
const handleSubmit = () => {
  sendForm(data);
};
```

**4. Buscar dados — use React Query**
```tsx
// ERRADO: useEffect + useState para fetch
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
useEffect(() => {
  fetchData().then(setData).finally(() => setLoading(false));
}, []);

// CORRETO: React Query (cache, retry, refetch, loading/error states)
const { data, isLoading } = useQuery({ queryKey: ['data'], queryFn: fetchData });
```

**5. Transformar dados para passar como prop — faça no render**
```tsx
// ERRADO: useEffect para formatar lista
useEffect(() => {
  setFormattedItems(items.map(format));
}, [items]);

// CORRETO: derivar direto
const formattedItems = items.map(format);
// ou com useMemo se a lista for grande
const formattedItems = useMemo(() => items.map(format), [items]);
```

**6. Notificar o pai quando state muda — chamar callback no handler**
```tsx
// ERRADO: useEffect para "propagar" mudança pro pai
useEffect(() => {
  onChange(value);
}, [value]);

// CORRETO: chamar onChange no mesmo handler que seta o state
const handleChange = (newValue) => {
  setValue(newValue);
  onChange(newValue);
};
```

### Quando useEffect É necessário

- **Subscriptions/listeners:** AppState, Keyboard, BackHandler, EventEmitter — precisa de cleanup no return
- **Timers:** setTimeout/setInterval (com cleanup)
- **Inicialização única:** Carregar sessão do storage, configurar SDK — executar uma vez no mount
- **Sync com sistema externo:** WebSocket, deep links, push notification handlers

### Regras ao usar useEffect

- **Sempre retornar cleanup** para listeners, timers e subscriptions
- **Deps array completo:** Incluir todas as variáveis usadas dentro do effect. Deps incompletas = stale closures = bugs sutis
- **Nunca setar state derivado:** Se o useEffect existe só para `setState(algo derivado de props/state)`, ele é desnecessário
- **Evitar cascata de effects:** Se um useEffect seta state que trigger outro useEffect, a arquitetura está errada. Mover a lógica para um único handler ou derivar
- **Race conditions em async:** Se o effect faz fetch async, usar flag `isCancelled` ou `AbortController` no cleanup para evitar setState em componente desmontado
- **`InteractionManager.runAfterInteractions()`:** Para work pesado em useEffect de mount, defer para depois das animações de transição de tela

## Performance

Os principais gargalos em React Native e como evitá-los:

### Re-renders excessivos

O maior vilão de performance. Cada re-render desnecessário consome tempo na JS thread e pode causar frame drops.

- **Listas:** Sempre usar `FlatList`/`SectionList` com `keyExtractor` ao invés de `.map()` em ScrollView. FlatList só renderiza itens visíveis (virtualização)
- **`React.memo()`:** Envolver componentes filhos que recebem as mesmas props mas re-renderizam por causa do pai. Especialmente útil em itens de lista
- **`useCallback()`:** Envolver handlers passados como prop para componentes memoizados. Sem useCallback, uma nova referência é criada a cada render e quebra o memo
- **`useMemo()`:** Para cálculos derivados caros (filtros, sorts, formatações). Não usar em tudo — só quando o cálculo é realmente pesado ou alimenta uma prop de componente memoizado
- **Zustand selectors:** Ao ler do store, selecionar apenas o que precisa: `useSessionStore(s => s.isAuthenticated)` ao invés de `useSessionStore()`. Isso evita re-render quando partes não usadas do store mudam
- **Context splitting:** Não colocar state que muda frequentemente em um Context grande. Separar contexts por frequência de atualização (ex: theme raramente muda, toast muda sempre)
- **Evitar objetos/arrays inline:** `style={{ padding: 16 }}` ou `data={[1,2,3]}` cria nova referência toda render. Extrair para constantes ou useMemo

### Animações na JS thread vs UI thread

Animações que rodam na JS thread competem com lógica de negócio e causam jank (stuttering).

- **Sempre usar `react-native-reanimated`** ao invés de `Animated` do RN para animações de layout/scroll/gestos. Reanimated roda worklets na UI thread, sem passar pela JS thread
- **`useAnimatedStyle()`** e **`useAnimatedScrollHandler()`** rodam na UI thread — são a escolha certa para animações baseadas em scroll
- **`withTiming()`, `withSpring()`, `withDecay()`** — usar esses ao invés de `Animated.timing()`. Toda a interpolação acontece na UI thread
- **`SharedValue`** ao invés de `Animated.Value` — SharedValues são acessíveis em ambas as threads sem serialização
- **Avoid:** `useNativeDriver: false` no Animated antigo, animações de `width`/`height`/`top`/`left` (preferir `transform` e `opacity` que não trigam layout recalculation), `setState` dentro de animation callbacks
- **LayoutAnimation:** Para animações simples de adição/remoção de elementos, `LayoutAnimation.configureNext()` é mais simples que reanimated. Mas não misturar com reanimated

### Imagens

Imagens sem otimização são uma das maiores fontes de lag, memory spikes e tela branca.

- **Usar `expo-image`** ao invés de `<Image>` do RN para imagens de rede. expo-image usa cache nativo (libvips/SDWebImage), decodifica off-thread, e suporta placeholders blur
- **Dimensões explícitas:** Sempre definir `width` e `height` em imagens. Sem dimensões, o RN precisa esperar o download para calcular layout, causando layout shifts
- **`resizeMode="cover"`** com dimensões fixas evita reprocessamento. Evitar `contain` em listas (causa recálculo de aspect ratio por item)
- **Imagens locais:** Para ícones e assets estáticos, usar `require()` (bundled no app). São mais rápidos que rede e não precisam de cache
- **SVGs:** Para ícones, preferir `lucide-react-native` (SVG renderizado nativamente). SVGs são vetoriais — sem blur em diferentes densidades e menores que PNGs
- **Prefetch:** Para imagens que serão exibidas em breve (ex: próximo slide de carousel), usar `Image.prefetch(url)` para pré-carregar
- **Memory:** Imagens grandes (fotos, banners) consomem muita RAM. Em listas, a virtualização do FlatList ajuda descarregando imagens fora da viewport

### Layout recalculations

Cada mudança de layout força o Yoga (engine de layout do RN) a recalcular posições. Em árvores profundas isso é caro.

- **Evitar nesting excessivo de Views:** Cada nível adicional aumenta o custo do layout pass. Achatar a hierarquia quando possível
- **`flex` > valores absolutos:** Layouts com flex são calculados uma vez. Layouts com valores absolutos que mudam (via state) forçam recálculos
- **Não animar propriedades de layout:** `width`, `height`, `padding`, `margin`, `top`, `left` forçam layout recalculation a cada frame. Animar `transform: [{ translateX }, { scale }]` e `opacity` — esses são composited na GPU sem tocar no layout
- **`removeClippedSubviews`:** Em listas longas e Views com muitos filhos fora da tela, essa prop remove views fora do viewport da hierarquia nativa, economizando memória e layout cost
- **`StyleSheet.create()`:** Além de validação, StyleSheet registra os estilos uma vez no bridge. Estilos inline são serializados toda render

### JavaScript thread

A JS thread é single-threaded. Se ela estiver ocupada, a UI congela.

- **Debounce inputs:** Em campos de busca/filtro, debounce o handler (300-500ms). Sem debounce, cada keystroke pode trigger filtro de lista, re-render, e network call
- **`InteractionManager.runAfterInteractions()`:** Para trabalho pesado que pode esperar (analytics, prefetch, cálculos), agendar para depois que animações/transições de tela terminarem
- **Lazy loading:** Não importar tudo no startup. Usar `React.lazy()` + `Suspense` ou `require()` dinâmico para telas/módulos pesados que não são necessários imediatamente
- **Avoid:** `JSON.parse/stringify` de objetos grandes no render, regex complexas em loops, `console.log` em produção (serializa objetos inteiros no bridge)

### Memory leaks

Leaks causam degradação progressiva — o app fica lento com o tempo e eventualmente crasha.

- **Limpar listeners:** Sempre retornar cleanup em `useEffect`. Subscriptions de AppState, Keyboard, EventEmitter devem ser removidas no unmount
- **Timers:** `setTimeout`/`setInterval` devem ser limpos com `clearTimeout`/`clearInterval` no cleanup do useEffect
- **Abort controllers:** Requests HTTP com axios devem usar `AbortController` para cancelar em unmount, evitando setState em componente desmontado
- **Zustand:** Não armazenar objetos grandes (listas inteiras, imagens) no store global. Preferir React Query para server state que pode ser garbage collected

### Navigation

Transições de tela lentas dão sensação de app travado.

- **`react-native-screens`:** Já está habilitado — cada tela é uma native view. Não usar `cardStyleInterpolator` customizado sem necessidade
- **Avoid heavy renders on mount:** Se uma tela precisa carregar dados, mostrar skeleton/placeholder imediatamente e carregar dados depois. Não bloquear a transição
- **`freezeOnBlur`:** Em tabs, telas inativas são "congeladas" — não recebem re-renders. Já é o default no React Navigation v7
- **Prefetch:** Em listas que navegam para detalhes, prefetch os dados no `onPress` (ou até no `onHover`/`onLongPress`) antes da navegação acontecer

### Notifications

- expo-notifications é **Android only** neste projeto
- iOS é excluído via config plugin em `plugins/android-only-notifications.js`
- O import usa `require()` lazy em `src/core/services/notifications.ts` (nunca import top-level)
- Sempre checar `Platform.OS === 'android'` antes de chamar funções de notificação

## Comandos

```bash
# Desenvolvimento
npx expo start                           # Dev server
npx expo run:ios --device                # Build iOS no device
npx expo run:android                     # Build Android

# Prebuild (regenerar native projects)
npx expo prebuild --platform ios --clean
npx expo prebuild --platform android --clean

# Limpar cache
npx expo start --clear                   # Limpar cache Metro
rm -rf node_modules/.cache               # Cache do bundler
```

## Path Aliases

| Alias | Path |
|---|---|
| `@/*` | `./src/*` |
| `@assets/*` | `./assets/*` |
| `@components/*` | `./src/components/*` |
| `@config/*` | `./src/config/*` |
| `@hooks/*` | `./src/hooks/*` |
| `@screens/*` | `./src/screens/*` |

Configurados em `babel.config.js` (module-resolver) e `tsconfig.json` (paths).
