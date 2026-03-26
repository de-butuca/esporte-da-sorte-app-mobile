// This file is no longer used — styles are in login.view.tsx
// Kept for backwards compatibility with any imports
import { Styled } from '@/theme/useStyled';

const Background = Styled.View({
	style: { flex: 1 },
});
const Body = Styled.View({
	style: { flex: 1 },
});
const Footer = Styled.View({
	style: {},
});
const Logo = Styled.Image({
	style: { height: 240, width: '100%' },
	attrs: { resizeMode: 'contain' },
});
const Text = Styled.Text({
	style: { color: '#fff' },
});

export const SL = { Text, Footer, Body, Background, Logo };
