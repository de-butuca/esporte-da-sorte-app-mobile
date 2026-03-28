import { Gamepad2, Trophy, Info, User } from 'lucide-react-native';
import { Dimensions } from 'react-native';

export const TAB_ITEMS = [
	{
		path: 'Minigames',
		title: 'Minigames',
		icon: Gamepad2,
	},
	{
		path: 'Leaderboards',
		title: 'Rankings',
		icon: Trophy,
	},
	{
		path: 'Info',
		title: 'Informações',
		icon: Info,
	},
	{
		path: 'Profile',
		title: 'Perfil',
		icon: User,
	},
] as const;

const { width } = Dimensions.get('window');

export const porcentagemWidth = 0.9;

export const TAB_WIDTH = (width * porcentagemWidth) / TAB_ITEMS.length;
