# Esporte da Sorte — Mobile App

Aplicativo móvel de apostas esportivas e cassino online, desenvolvido com **Expo SDK 55 + React Native 0.83.4 + React 19**. Suporta dois modos de experiência distintos — **Esportes** e **Cassino** — com identidades visuais independentes, navegação adaptativa e sistema de design personalizado em tempo de compilação.

---

## Sumário

- [Stack](#stack)
- [Arquitetura](#arquitetura)
- [stampd — Design System](#stampd--design-system)
- [Funcionalidades](#funcionalidades)
- [Pontos Fortes](#pontos-fortes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como rodar](#como-rodar)

---

## Stack

| Categoria | Tecnologia |
|---|---|
| Framework | Expo SDK 55 + React Native 0.83.4 |
| Linguagem | TypeScript 5.9 (strict mode) |
| UI / Design System | **stampd** (compile-time tokens + runtime theming) |
| Navegação | @react-navigation/native-stack v7 |
| Estado global | Zustand v5 |
| Estado de servidor | TanStack React Query v5 |
| Formulários | react-hook-form + zod |
| Animações | react-native-reanimated v4, lottie-react-native |
| Gráficos | @shopify/react-native-skia |
| Ícones | lucide-react-native |
| HTTP | axios com interceptors |
| Storage seguro | expo-secure-store |
| Notificações | expo-notifications (Android only) |
| Câmera | expo-camera |
| Fontes | Inter (400, 500, 600, 700) via expo-font |

---

## Arquitetura

O projeto segue **Clean Architecture** com separação clara entre as camadas de domínio, infra e apresentação, combinada com o padrão **MVVM** nas telas.

```
src/
  screens/        # MVVM: view.tsx (UI) + viewmodel.ts (lógica)
  components/     # Componentes reutilizáveis com index.tsx
  navigation/     # RootNavigator, AppStack, tipos e hooks tipados
  core/           # Auth, HTTP client, session store, serviços
    auth/         # Guards de autenticação + store de variante de tema
    http/         # Axios client, tipos de resposta, adapter
    session/      # Zustand store + SecureStore persistence
    services/     # Notificações, preferências
  domain/         # Interfaces e tipos de domínio (contratos)
  infra/          # Repositórios (implementações concretas)
  useCases/       # Casos de uso (orquestram domínio + session)
  contexts/       # ApiRepository, SessionContext, Toast, Sidebar
  hooks/          # useAuthGuard, useTimer, useMatchReminder, etc.
  shared/         # Headers e scroll views animados reutilizáveis
  stampd.config.ts  # Fonte de verdade do design system
```

### Padrões adotados

- **MVVM:** cada tela tem `view.tsx` com JSX puro e `viewmodel.ts` com toda a lógica de estado e efeitos
- **Repository Pattern:** `domain/` define interfaces (`IAuthRepository`), `infra/` implementa — troca de backend sem tocar na UI
- **Dependency Injection via Context:** `ApiRepositoryProvider` injeta implementações concretas nos casos de uso, facilitando mock em testes
- **Auth Guard:** `useAuthGuard()` / `useRequireAuth()` protegem ações com redirecionamento automático para login
- **Zustand com selectors:** estado global granular — `useSessionStore(s => s.isAuthenticated)` evita re-renders desnecessários

---

## stampd — Design System

**stampd** é um plugin Babel proprietário que resolve design tokens **em tempo de compilação**. Tokens estáticos (spacing, radius, size) são substituídos por literais numéricos no bundle final — custo zero em runtime. Cores que dependem de tema são resolvidas via React Context em runtime.

### Como funciona

```
stampd.config.ts  →  Babel plugin  →  bundle (literais)
                                   →  runtime (cores via Context)
```

O plugin transforma isso:
```tsx
const Card = Styled.View({
  style: ({ theme }) => ({
    padding: theme.spacing.p4,        // → 16 (literal, compile-time)
    borderRadius: theme.radius.roundedLg, // → 12 (literal, compile-time)
    backgroundColor: theme.colors.surface, // → runtime via Context
  }),
});
```

Em bundle otimizado sem lookups de objeto em runtime para tokens estáticos.

### Dual-brand: Cassino e Esportes

O app mantém **duas identidades visuais independentes** no mesmo tema:

| Token | Cassino | Esportes |
|---|---|---|
| `background` | `#0D0A1A` (roxo profundo) | `#0B1120` (navy) |
| `bgNav` | `#120E22` (roxo escuro) | `#02003D` (azul marinho) |
| `bgCard` | `#1A1229` (roxo card) | `#0A0F2E` (azul card) |
| `primary` | `#00E878` (verde vibrante) | `#023697` (azul) |
| `accent` | `#00E878` (verde) | `#38E67D` (verde claro) |
| `textMuted` | `#9E91BA` (lilás) | `#A0A0B0` (cinza azulado) |

A troca entre modos acontece via `SessionContext.activeCategory` e é propagada para o stampd (`setThemeMode`) e para o `useAuthThemeStore` simultaneamente — uma única mudança sincroniza toda a UI.

### Variantes type-safe e props dinâmicas

```tsx
// Variante com tipos inferidos pelo TypeScript
const Button = Styled.TouchableOpacity({
  variants: {
    size: {
      sm: ({ theme }) => ({ padding: theme.size.s2 }),
      full: ({ theme }) => ({ padding: theme.size.s4, width: '100%' }),
    },
  },
});
// Erro de TypeScript se size="invalid"
<Button size="full" />

// Props dinâmicas sem StyleSheet manual
const Tag = Styled.View({
  style: ({ theme, selected }) => ({
    backgroundColor: selected ? theme.colors.primary : theme.colors.surface,
  }),
});
```

### Fontes automáticas

`Styled.Text` e `Styled.TextInput` injetam `fontFamily` e `fontSize` da config automaticamente — sem repetição de código de fonte em cada componente.

### Shadows

4 níveis de sombra com valores platform-specific (iOS `shadowColor`/Android `elevation`) prontos para uso:

```tsx
import { shadows } from '@/stampd.config';
// shadows.level1, .level2, .level3, .level4
```

---

## Funcionalidades

### Modo Esportes
- Feed de partidas ao vivo e próximas
- Filtro por modalidade esportiva
- Mercados populares com odds
- Bolão da Copa (previsão por fase, mata-mata)
- Busca de ligas e partidas
- Integração SportRadar Live Match Tracker

### Modo Cassino
- Grid de jogos com filtros por categoria
- Carrossel de banners promocionais
- Roleta promocional com notificação push
- Busca de jogos
- Header animado com parallax

### Autenticação
- Login com email + senha (react-hook-form + zod)
- Registro de usuário
- Verificação facial com câmera (expo-camera)
- Token JWT armazenado em SecureStore (nativo, criptografado)
- Injeção automática de Bearer token via interceptor Axios

### Perfil e Configurações
- Alternância de tema (dark/light)
- Modo alto contraste
- Preferências persistidas em SecureStore

### Notificações (Android)
- Notificações de re-engajamento ao fechar o app
- Notificações de lembrete de partida
- Notificações promocionais em ondas (a cada 2 horas)
- Notificação de roleta girada
- Ciclo de vida monitorado via AppState

### Navegação
- Sidebar animada (78% da tela, gestos, botão back do Android)
- Bottom nav adaptativa: tabs de Esportes vs. tabs de Cassino
- Reels de esportes (vertical scroll, formato stories)
- Transições nativas via react-native-screens

---

## Pontos Fortes

### 1. Performance por design
- **stampd tokens estáticos** eliminam lookups em runtime — spacing, radius e size viram literais no bundle
- **Reanimated v4** garante animações na UI thread, sem competir com a JS thread
- **Zustand com selectors granulares** — componentes só re-renderizam quando o slice de estado que usam muda
- **React Query** para estado de servidor com cache, retry e background refetch — sem useEffect de fetch
- **FlatList virtualizada** em todas as listas — sem `.map()` em ScrollView
- **`React.memo()`** em itens de lista e componentes de navegação

### 2. Arquitetura escalável
- Clean Architecture garante que mudanças de backend não afetam UI
- MVVM separa lógica de negócio da renderização — viewmodels testáveis em isolamento
- Dependency injection via Context torna troca de implementações trivial (ex: mock em testes)
- Path aliases (`@/`, `@screens/`, `@components/`) evitam imports relativos frágeis

### 3. Dual-brand sem duplicação
- Um único codebase entrega duas experiências visuais completas (Cassino e Esportes)
- Troca de tema é uma linha: `setActiveCategory('cassino')` — toda a UI adapta automaticamente
- stampd propaga a identidade visual em compile-time, sem overhead de seleção de tema em runtime

### 4. Segurança
- Tokens JWT em **expo-secure-store** (Keychain no iOS, Keystore no Android) — nunca em AsyncStorage plain text
- Injeção de Authorization header via interceptor — repositórios não lidam com token diretamente
- Validação de formulários com zod no cliente antes de qualquer request

### 5. Developer Experience
- TypeScript estrito em todo o projeto — sem `any` implícito
- Navegação completamente tipada com `useAppNavigation()` e `useAppRoute<T>()`
- Rotas, tipos de parâmetro e guards de autenticação centralizados
- stampd gera `stampd-types.d.ts` automaticamente — autocomplete de tokens no editor
- Regras de useEffect documentadas e seguidas — sem cascatas de effects

### 6. Boas práticas de React Native
- `useSafeAreaInsets()` em todos os componentes que precisam respeitar notch/home indicator
- `Platform.select()` para código platform-specific (sombras, comportamentos)
- `InteractionManager.runAfterInteractions()` para work pesado após transições de tela
- Cleanup de todos os listeners e timers em useEffect
- Notificações isoladas em Android-only via config plugin customizado

---

## Estrutura do Projeto

```
esporte-da-sorte-app-mobile/
├── assets/
│   └── icons/          # SVGs otimizados (HomeIcon, BallIcon, etc.)
├── plugins/
│   └── android-only-notifications.js  # Config plugin Expo
├── src/
│   ├── App.tsx
│   ├── AppInitializer.tsx  # Fonts, sessão, permissões, splash
│   ├── providers.tsx       # Árvore de providers
│   ├── stampd.config.ts    # FONTE DE VERDADE dos design tokens
│   ├── components/
│   │   ├── BottomNavBar/   # Adaptativo: Esportes | Cassino
│   │   ├── Button/
│   │   ├── Sidebar/        # Drawer animado com gesture dismiss
│   │   ├── Roulette/       # Roleta animada com Skia
│   │   ├── BottomSheet/
│   │   ├── FormScreen/
│   │   ├── SportradarLMT/  # Live Match Tracker integration
│   │   └── ui/             # Badge, Card, Chip, Input, ProgressBar...
│   ├── contexts/
│   │   ├── ApiRepositoryContext.tsx  # DI de repositórios
│   │   ├── SessionContext.tsx        # activeCategory (cassino|esportes)
│   │   ├── Toast/
│   │   └── Sidebar/
│   ├── core/
│   │   ├── auth/           # useAuthGuard, useAuthThemeStore
│   │   ├── http/           # apiClient (axios), tipos de resposta
│   │   ├── session/        # Zustand store + SecureStore
│   │   ├── services/       # notifications.ts, preferences.storage.ts
│   ├── domain/
│   │   └── auth/           # IAuthRepository, AuthTypes
│   ├── hooks/
│   │   ├── useTimer.ts
│   │   ├── useMatchReminder.ts
│   │   ├── useRequireAuth.ts
│   │   └── useResetNavigation.ts
│   ├── infra/
│   │   └── AuthRepository.ts  # Implementação concreta (hoje: mock)
│   ├── navigation/
│   │   ├── RootNavigator.tsx
│   │   ├── appRoutes.tsx       # AppStack com todas as rotas
│   │   ├── types.ts            # RootStackParamList tipado
│   │   └── hooks.ts            # useAppNavigation, useAppRoute
│   ├── screens/
│   │   ├── home/               # Hub principal com categoria adaptativa
│   │   │   ├── Pages/homeCassino/   # Grid de jogos, carrossel, roleta
│   │   │   └── Pages/homeEsportes/  # Partidas, odds, mercados
│   │   ├── login/              # MVVM: view + viewmodel + schema + types
│   │   ├── register/
│   │   ├── search/
│   │   ├── promotions/
│   │   ├── settings/
│   │   ├── bolao/              # Bolão da Copa
│   │   ├── face-verification/  # Verificação com câmera
│   │   ├── reelsEsportes/      # Stories verticais de esportes
│   │   ├── game-home/
│   │   └── Perfil/
│   ├── shared/
│   │   └── ui/                 # AnimatedHeader, AnimatedScrollView...
│   ├── theme/
│   ├── config/
│   │   ├── environment.ts      # Variáveis de ambiente tipadas
│   │   └── constants.ts        # Estados brasileiros, constantes
│   ├── types/
│   └── useCases/
│       └── Auth/LoginUseCase.ts
├── babel.config.js       # stampd plugin + module-resolver + reanimated
├── tsconfig.json         # Strict + path aliases
├── app.json              # Config Expo
└── stampd-types.d.ts     # Auto-gerado pelo stampd (não editar)
```

---

## Como rodar

```bash
# Instalar dependências
npm install

# Dev server
npx expo start

# Build iOS
npx expo run:ios --device

# Build Android
npx expo run:android

# Limpar cache Metro
npx expo start --clear

# Regenerar projetos nativos (após mudanças em app.json/plugins)
npx expo prebuild --platform ios --clean
npx expo prebuild --platform android --clean
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
EXPO_PUBLIC_API_URL=https://api.seudominio.com
EXPO_PUBLIC_MODE=development
```

---

## Decisões de design notáveis

- **Notificações Android-only:** iOS foi explicitamente excluído via config plugin customizado (`plugins/android-only-notifications.js`). O import de `expo-notifications` é feito com `require()` lazy para evitar erros em iOS.
- **Mock de autenticação:** `AuthRepository` retorna dados hardcoded com delay de 1s. A arquitetura está pronta para substituição por chamada real — basta trocar a implementação em `infra/AuthRepository.ts` sem tocar em nenhuma tela.
- **Cassino em Light Mode:** Por decisão de produto, o modo Cassino usa tema claro (`ThemeMode.LIGHT`) enquanto Esportes usa dark — refletindo paletas de cor distintas configuradas no stampd.
- **`SessionContext` ≠ Session de autenticação:** `SessionContext` gerencia apenas a categoria ativa (cassino/esportes), separado de `useSessionStore` que gerencia JWT e dados do usuário autenticado.
