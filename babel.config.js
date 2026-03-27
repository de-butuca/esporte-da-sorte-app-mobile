const presets = ['babel-preset-expo'];

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

module.exports = function (api) {
	api.cache(true);

	return {
		presets,
		plugins: [
			moduleResolverPlugin,
			'module:stampd',
			'react-native-reanimated/plugin', // 👈 SEMPRE O ÚLTIMO
		],
	};
};
