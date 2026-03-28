import { create } from 'zustand';
import {
	type ThemeVariant,
	type AppThemeColors,
	getThemeColors,
} from '@/stampd.config';

interface AuthThemeState {
	variant: ThemeVariant;
	colors: AppThemeColors;
	setVariant: (variant: ThemeVariant) => void;
}

export const useAuthThemeStore = create<AuthThemeState>((set) => ({
	variant: 'esportes',
	colors: getThemeColors('esportes'),
	setVariant: (variant) =>
		set({ variant, colors: getThemeColors(variant) }),
}));
