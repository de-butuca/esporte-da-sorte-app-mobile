/**
 * ========================================
 * Presets
 * ========================================
 */
const presets = ['babel-preset-expo'];

/**
 * ========================================
 * Module Resolver
 * ========================================
 */
const moduleResolverPlugin = [
	'module-resolver',
	{
		root: ['./src'],

		extensions: ['.js', '.jsx', '.ts', '.tsx'],

		alias: {
			'@': './src',

			'@assets': './assets',
			'@components': './src/components',
			'@config': './src/config',
			'@hooks': './src/hooks',
			'@routes': './src/routes',
			'@screens': './src/screens',
			'@services': './src/services',
			'@styles': './src/styles',
			'@utils': './src/utils',
		},
	},
];

/**
 * ========================================
 * React Native Worklets
 * ========================================
 * @type {import('react-native-worklets/plugin').PluginOptions}
 */
const workletsPluginOptions = {
	// coloque opções aqui se necessário
};

const workletsPlugin = ['react-native-worklets/plugin', workletsPluginOptions];

/**
 * ========================================
 * Plugins
 * ========================================
 */
const plugins = [moduleResolverPlugin, workletsPlugin];

/** @type {import('@babel/core').ConfigFunction} */
module.exports = function (api) {
	api.cache(true);

	return {
		presets: presets,
		plugins: plugins,
	};
};
