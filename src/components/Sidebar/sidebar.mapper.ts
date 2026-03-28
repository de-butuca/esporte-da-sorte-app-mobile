import { TraderNavbarMenu } from '../../../backend/models/config.models';

export type SidebarIconKey =
	| 'home'
	| 'sports'
	| 'casino'
	| 'promo'
	| 'support'
	| 'live'
	| 'jackpot';

export interface SidebarNavItemViewModel {
	key: string;
	label: string;
	iconKey: SidebarIconKey;
	target: 'Home' | 'GameHome' | 'Promotions' | 'Support' | 'alert';
	authRequired?: boolean;
	alertTitle?: string;
	alertMessage?: string;
}

export function mapSidebarNavbar(navbarItems: TraderNavbarMenu[]): SidebarNavItemViewModel[] {
	const mappedItems = navbarItems
		.slice()
		.sort((left, right) => (left.order ?? 0) - (right.order ?? 0))
		.map(mapNavbarItem)
		.filter((item): item is SidebarNavItemViewModel => Boolean(item));

	return mappedItems.length ? mappedItems : getSidebarFallbackItems();
}

export function getSidebarFallbackItems(): SidebarNavItemViewModel[] {
	return [
		{ key: 'home', label: 'Inicio', iconKey: 'home', target: 'Home' },
		{ key: 'casino', label: 'Cassino', iconKey: 'casino', target: 'Home' },
		{ key: 'sports', label: 'Esportes', iconKey: 'sports', target: 'GameHome' },
		{ key: 'promotions', label: 'Promocoes', iconKey: 'promo', target: 'Promotions', authRequired: true },
	];
}

function mapNavbarItem(item: TraderNavbarMenu): SidebarNavItemViewModel | null {
	const url = item.url?.toLowerCase();
	const label = item.menu_name ?? 'Menu';

	switch (url) {
		case '/sports':
			return { key: 'sports', label, iconKey: 'sports', target: 'GameHome' };
		case '/casino':
			return { key: 'casino', label, iconKey: 'casino', target: 'Home' };
		case '/promotions':
			return { key: 'promotions', label, iconKey: 'promo', target: 'Promotions', authRequired: true };
		case '/live':
			return {
				key: 'live',
				label,
				iconKey: 'live',
				target: 'alert',
				alertTitle: 'Ao vivo',
				alertMessage: 'O menu mockado ja inclui Ao Vivo, mas a rota mobile ainda nao existe no app atual.',
			};
		case '/jackpot':
			return {
				key: 'jackpot',
				label,
				iconKey: 'jackpot',
				target: 'alert',
				alertTitle: 'Jackpot',
				alertMessage: 'O contrato de navegacao ja entrega Jackpot, mas a tela ainda nao faz parte deste escopo.',
			};
		default:
			return null;
	}
}
