import { ImageSourcePropType } from 'react-native';
import DefaultBackground from '@assets/images/stores-background.png';

// Team-specific backgrounds (using require to load webp files)
const CorinthiansBackground = require('@assets/images/stores/corinthians-background.webp');
const GremioBackground = require('@assets/images/stores/gremio-background.webp');
const InternacionalBackground = require('@assets/images/stores/internacional-background.webp');
const PalmeirasBackground = require('@assets/images/stores/palmeiras-background.webp');
const SaoPauloBackground = require('@assets/images/stores/sao-paulo-background.webp');

export const TEAM_BACKGROUNDS: Record<string, ImageSourcePropType> = {
	// Implemented backgrounds
	Corinthians: CorinthiansBackground,
	Grêmio: GremioBackground,
	Internacional: InternacionalBackground,
	Palmeiras: PalmeirasBackground,
	'São Paulo': SaoPauloBackground,

	// TODO: Add remaining teams
	Flamengo: DefaultBackground,
	Botafogo: DefaultBackground,
	'Vasco da Gama': DefaultBackground,
	'Atlético Mineiro': DefaultBackground,
	Cruzeiro: DefaultBackground,
};

export function getTeamBackground(teamName: string): ImageSourcePropType {
	return TEAM_BACKGROUNDS[teamName] || DefaultBackground;
}

/**
 * IMPLEMENTED TEAMS (5/10):
 * ✅ Corinthians - corinthians-background.webp
 * ✅ Grêmio - gremio-background.webp
 * ✅ Internacional - internacional-background.webp
 * ✅ Palmeiras - palmeiras-background.webp
 * ✅ São Paulo - sao-paulo-background.webp
 *
 * PENDING TEAMS (5/10):
 * ⏳ Flamengo - flamengo-background.webp
 * ⏳ Botafogo - botafogo-background.webp
 * ⏳ Vasco da Gama - vasco-background.webp
 * ⏳ Atlético Mineiro - atletico-mineiro-background.webp
 * ⏳ Cruzeiro - cruzeiro-background.webp
 *
 * NAMING CONVENTION:
 * - Format: [team-name]-background.webp
 * - Lowercase team names with hyphens
 * - Dimensions: 1080x1920px (vertical)
 * - Format: WebP (optimized)
 * - Max size: 500KB
 * - Location: assets/images/stores/
 */
