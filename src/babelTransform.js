'use strict'

const babelJest = require('babel-jest')

const hasJsxRuntime = (() => {
	if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
		return false
	}

	try {
		require.resolve('react/jsx-runtime')
		return true
	} catch (e) {
		return false
	}
})()

module.exports = babelJest.createTransformer({
	presets: [
		[
			require.resolve('babel-preset-react-app'),
			{
				runtime: hasJsxRuntime ? 'automatic' : 'classic',
			},
		],
		/** The next line is the only necessary addition compared to react-scripts@4.0.3.
		 *  The rest of the file is just a copy of the same file in `react-scripts`.
		 */
		'linaria/babel',
	],
	babelrc: false,
	configFile: false,
})
