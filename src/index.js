const {
	getLoader,
	loaderByName,
	throwUnexpectedConfigError,
} = require('@craco/craco')
const cosmiconfig = require('cosmiconfig')

module.exports = {
	overrideJestConfig,
	overrideWebpackConfig,
}

function overrideJestConfig({ jestConfig }) {
	jestConfig.transform['^.+\\.(js|jsx|ts|tsx)$'] = require.resolve(
		'./babelTransform.js',
	)
	return jestConfig
}

function overrideWebpackConfig({ context, pluginOptions, webpackConfig }) {
	const throwError = (message, githubIssueQuery) =>
		throwUnexpectedConfigError({
			packageName: 'craco-linaria',
			githubRepo: 'jedmao/craco-linaria',
			message,
			githubIssueQuery,
		})

	if (!webpackConfig.module) {
		throwError(
			`Can't find 'module' key in the ${context.env} webpack config!`,
			'webpack+module',
		)
	}

	const { isFound, match: babelLoaderMatch } = getLoader(
		webpackConfig,
		loaderByName('babel-loader'),
	)

	if (!isFound) {
		throwError(
			`Can't find babel-loader in the ${context.env} webpack config!`,
			'webpack+babel-loader',
		)
	}

	const oneOfRules = webpackConfig.module.rules.find(rule => rule.oneOf)
	if (!oneOfRules) {
		throwError(
			`Can't find 'oneOf' rules under module.rules in the ${context.env} webpack config!`,
			'webpack+rules+oneOf',
		)
	}

	oneOfRules.oneOf[1] = transformBabelLoader(
		babelLoaderMatch.loader,
		pluginOptions,
	)

	return webpackConfig
}

function transformBabelLoader(loader, pluginOptions) {
	const options = loader.options || {}
	const presets = options.presets || []
	options.presets = presets
	const { babelOptions, ...linariaOptions } =
		pluginOptions ||
		(cosmiconfig('@linaria/babel-preset').searchSync() || {}).config ||
		{}

	return {
		test: loader.test,
		include: loader.include,
		rules: [
			{
				loader: loader.loader,
				options: {
					...options,
					presets: presets.concat('@linaria/babel-preset'),
				},
			},
			{
				loader: '@linaria/webpack-loader',
				options: {
					cacheDirectory: 'src/.linaria_cache',
					sourceMap: process.env.NODE_ENV !== 'production',
					babelOptions: {
						presets,
						...babelOptions,
					},
					...linariaOptions,
				},
			},
		],
	}
}
