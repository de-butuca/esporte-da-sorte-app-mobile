import React, { useMemo } from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	TextInput,
	Pressable,
	TouchableOpacity,
	FlatList,
	SectionList,
	StyleSheet,
	ImageStyle,
	TextStyle,
	ViewStyle,
	KeyboardAvoidingView,
	ImageBackground,
	TouchableWithoutFeedback,
} from 'react-native';

import { ThemeType, useTheme } from './ThemeContext';
import { fontFamily } from './design-tokens';

type RNStyle = ViewStyle | TextStyle | ImageStyle;

type StyleInput<P> = RNStyle | ((props: P & { theme: ThemeType }) => RNStyle);

type Variants<P> = Record<string, Record<string, StyleInput<P>>>;

type Options<P> = {
	style?: StyleInput<P>;
	variants?: Variants<P>;
	attrs?: Partial<P> | ((props: P & { theme: ThemeType }) => Partial<P>);
};

const cache = new Map<string, any>();

function css(style: RNStyle) {
	const key = JSON.stringify(style);

	if (!cache.has(key)) {
		cache.set(key, StyleSheet.create({ s: style }).s);
	}

	return cache.get(key);
}

function resolve(input: any, props: any, theme: any) {
	if (!input) return undefined;

	const style = typeof input === 'function' ? input({ ...props, theme }) : input;

	return css(style);
}

function resolveVariants(variants: any, props: any, theme: any) {
	if (!variants) return [];

	const result = [];

	for (const name in variants) {
		const value = props[name];
		const variant = variants[name]?.[value];

		if (variant) {
			result.push(resolve(variant, props, theme));
		}
	}

	return result;
}

// function resolveAttrs(attrs: any, props: any, theme: any) {
// 	if (!attrs) return {}

// 	return typeof attrs === "function"
// 		? attrs({ ...props, theme })
// 		: attrs
// }

type VariantProps<V> =
	V extends Record<string, Record<string, any>>
		? {
				[K in keyof V]?: keyof V[K];
			}
		: {};

interface styledConfig {
	isText: boolean;
}

function styled<C extends React.ElementType>(Component: C, config: styledConfig = { isText: false }) {
	return function <P = React.ComponentProps<C>, V extends Variants<any> = {}>(options: Options<P> & { variants?: V }) {
		type FinalProps = React.ComponentPropsWithRef<C> & VariantProps<V>;
		function Styled(props: FinalProps) {
			const { theme, fontDefault } = useTheme();

			const baseStyle = useMemo(() => resolve(options.style, props, theme), [props, theme]);

			const variantStyles = useMemo(() => resolveVariants(options.variants, props, theme), [props, theme]);

			const Component2 = Component as any;

			if (config.isText && fontDefault)
				return (
					<Component2
						{...props}
						{...options.attrs}
						style={[{ fontFamily: fontDefault }, baseStyle, variantStyles, (props as any)?.style]}
					/>
				);

			return <Component2 {...props} {...options.attrs} style={[baseStyle, variantStyles, (props as any)?.style]} />;
		}

		// ✅ AQUI é onde você força o tipo final corretamente
		return Styled as (props: FinalProps) => React.JSX.Element;
	};
}

export const Styled = {
	View: styled(View),
	Text: styled(Text, { isText: true }),
	Image: styled(Image),
	ImageBackground: styled(ImageBackground),
	ScrollView: styled(ScrollView),
	TextInput: styled(TextInput),
	Pressable: styled(Pressable),
	TouchableOpacity: styled(TouchableOpacity),
	TouchableWithoutFeedback: styled(TouchableWithoutFeedback),
	FlatList: styled(FlatList),
	SectionList: styled(SectionList),
	KeyboardAvoidingView: styled(KeyboardAvoidingView),
};
