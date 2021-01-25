const babelJest = require('babel-jest')

module.exports = babelJest.createTransformer({
	presets: [
		[
			require.resolve('babel-preset-react-app'),
			{
				runtime: 'automatic',
			},
		],
		'@babel/preset-typescript',
		'@linaria/babel-preset',
	],
	babelrc: false,
	configFile: false,
})
