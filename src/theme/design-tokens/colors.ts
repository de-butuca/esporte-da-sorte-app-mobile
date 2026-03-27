/**
 * EDS Design System — Dark Arena Theme v1.0.0
 * Cores extraídas do Figma (00 — Foundations)
 *
 * Brand:     primary=#00E878, primaryDark=#00C466, primaryLight=#33ED94
 * Secondary: #1B1464, secondaryLight=#2D2387
 * Accent:    #00B4D8 (cyan)
 * BG:        #0B1120 (primary), #101828 (secondary)
 * Surfaces:  #1A2332, #243447, #2D3F54
 */

export const lightColors = {
	// ── Brand ─────────────────────────────────────────────────
	/** #00E878 — Main brand green */
	primary: '#00E878',
	primaryDark: '#00C466',
	primaryLight: '#33ED94',
	onPrimary: '#0B1120',

	/** #1B1464 — Secondary purple */
	secondary: '#1B1464',
	secondaryLight: '#2D2387',
	onSecondary: '#FFFFFF',

	/**
	 * #00E878 — Green accent used across the app (active states, CTAs)
	 * Mapeia para eds-color-primary no Figma.
	 * O eds-color-accent (#00B4D8 cyan) está disponível como `accentCyan`.
	 */
	accent: '#00E878',
	accentCyan: '#00B4D8',

	// ── Backgrounds ───────────────────────────────────────────
	/** #0B1120 — Main app background */
	background: '#0B1120',
	/** #101828 — Secondary/nav background */
	bgSecondary: '#101828',
	bgNav: '#101828',
	bgCard: '#1A2332',
	onBackground: '#FFFFFF',

	// ── Surfaces ──────────────────────────────────────────────
	surface1: '#1A2332',
	surface2: '#243447',
	surface3: '#2D3F54',
	surface: '#1A2332',
	onSurface: '#E2E8F0',

	// ── Text ──────────────────────────────────────────────────
	/** #FFFFFF */
	textPrimary: '#FFFFFF',
	/** #94A3B8 */
	textSecondary: '#94A3B8',
	/** #94A3B8 — alias for textSecondary */
	textMuted: '#94A3B8',
	/** #475569 */
	textDisabled: '#475569',
	/** #475569 — alias for textDisabled */
	textInactive: '#475569',
	/** #0B1120 — text on green/primary backgrounds */
	textOnPrimary: '#0B1120',
	/** #E2E8F0 — text on surface backgrounds */
	textOnSurface: '#E2E8F0',

	// ── Semantic ──────────────────────────────────────────────
	success: '#22C55E',
	error: '#EF4444',
	warning: '#F59E0B',
	info: '#3B82F6',
	live: '#FF3B30',

	// ── Border ────────────────────────────────────────────────
	border: 'rgba(148,163,184,0.2)',

	// ── Input (legacy) ────────────────────────────────────────
	label: '#FFFFFF',
	inputText: '#FFFFFF',
	inputPlaceholder: '#475569',
	inputIcon: '#94A3B8',
	inputBackground: '#1A2332',
	inputPrimary: '#00E878',
	inputSercundary: '#00B4D8',

	onError: '#FFFFFF',
};

export const darkColors = lightColors;
