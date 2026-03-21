import React, { createContext, useContext, useState } from 'react';
import { darkTheme } from './dark';
import { lightTheme } from './light';

export type ThemeType = typeof lightTheme | typeof darkTheme;

type ThemeContextProps = {
	theme: ThemeType;
	toggleTheme: () => void;
	isDark: boolean;
	fontDefault?: string;
};

const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider: React.FC<{ fontDefault: string; children: React.ReactNode }> = ({
	fontDefault,
	children,
}) => {
	const [isDark, setIsDark] = useState(true);

	const toggleTheme = () => setIsDark((prev) => !prev);

	const theme = isDark ? darkTheme : lightTheme;

	return <ThemeContext.Provider value={{ theme, fontDefault, toggleTheme, isDark }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
