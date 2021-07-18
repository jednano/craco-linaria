const { overrideJestConfig, overrideWebpackConfig } = require('..')

describe('craco-linaria plugin', () => {
	describe(overrideJestConfig.name, () => {
		it('throws if missing babel transform key', () => {
			expect(() => {
				overrideJestConfig({ jestConfig: { transform: {} } })
			}).toThrow(
				`Can't find babel transform key '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$' in Jest config's 'transform' property!`,
			)
		})

		it('adds babel transform script to jestConfig', () => {
			expect(
				overrideJestConfig({
					jestConfig: {
						transform: {
							'^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'some-path-here.js',
						},
					},
				}),
			).toMatchInlineSnapshot(`
			Object {
			  "transform": Object {
			    "^.+\\\\.(js|jsx|mjs|cjs|ts|tsx)$": "${process.cwd()}/src/babelTransform.js",
			  },
			}
		`)
		})
	})
	describe(overrideWebpackConfig.name, () => {
		const context = { env: 'test' }

		it('throws if missing "module" key', () => {
			expect(() => {
				overrideWebpackConfig({ context, webpackConfig: {} })
			}).toThrow(`Can't find 'module' key in the test webpack config!`)
		})

		it('throws if missing "babel-loader" rule', () => {
			expect(() => {
				overrideWebpackConfig({
					context,
					webpackConfig: { module: { rules: [] } },
				})
			}).toThrow(`Can't find babel-loader in the test webpack config!`)
		})

		it('throws if missing "oneOf" rule', () => {
			expect(() => {
				overrideWebpackConfig({
					context,
					webpackConfig: {
						module: { rules: [{ loader: '/babel-loader/' }] },
					},
				})
			}).toThrow(
				`Can't find 'oneOf' rules under module.rules in the test webpack config!`,
			)
		})

		it('extends webpackConfig with linaria loader', () => {
			const result = overrideWebpackConfig({
				context,
				webpackConfig: {
					module: {
						rules: [{ loader: '/babel-loader/' }, { oneOf: [] }],
					},
				},
			})
			expect(result).toMatchInlineSnapshot(`
			Object {
			  "module": Object {
			    "rules": Array [
			      Object {
			        "loader": "/babel-loader/",
			      },
			      Object {
			        "oneOf": Array [
			          undefined,
			          Object {
			            "include": undefined,
			            "rules": Array [
			              Object {
			                "loader": "/babel-loader/",
			                "options": Object {
			                  "presets": Array [
			                    "linaria/babel",
			                  ],
			                },
			              },
			              Object {
			                "loader": "linaria/loader",
			                "options": Object {
			                  "babelOptions": Object {
			                    "presets": Array [],
			                  },
			                  "cacheDirectory": "src/.linaria_cache",
			                  "sourceMap": true,
			                },
			              },
			            ],
			            "test": undefined,
			          },
			        ],
			      },
			    ],
			  },
			}
		`)
		})
	})
})
