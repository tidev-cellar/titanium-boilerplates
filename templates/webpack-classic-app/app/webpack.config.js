'use strict';

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
	GenerateAppJsPlugin,
	PlatformAwareFileSystemPlugin,
	titaniumTarget,
	WatchStateNotifierPlugin
} = require('webpack-target-titanium');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');

const projectRootDirectory = path.resolve(__dirname, '..');
const outputDirectory = path.join(projectRootDirectory, 'Resources');

module.exports = (env, args) => {
	const config = {
		context: __dirname,
		target: titaniumTarget,
		mode: env.production ? 'production' : 'development',
		entry: {
			bundle:'./src/main.js',
		},
		output: {
			pathinfo: true,
			path: outputDirectory,
			libraryTarget: 'commonjs2',
			filename: '[name].js',
			globalObject: 'global'
		},
		devtool: env.production ? 'source-map' : 'inline-source-map',
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}
			]
		},
		resolve: {
			alias: {
				'@': path.join(__dirname, 'src')
			},
			extensions: ['.js'],
			symlinks: false
		},
		node: false,
		plugins: [
			new CleanWebpackPlugin(),
			new webpack.DefinePlugin({
				'process.env.TARGET_PLATFORM': JSON.stringify(env.platform)
			}),
			new CopyWebpackPlugin([
				{ context: 'assets', from: '**/*' },
				{ from: 'platform/**/*', to: '..' }
			]),
			new GenerateAppJsPlugin([
				'bundle'
			]),
			new PlatformAwareFileSystemPlugin({ platform: env.platform }),

			new WebpackBar({
				fancy: false,
				basic: false,
				reporter: {
					start(context) {
						// Called when (re)compile is started
					},
					change(context) {
						// Called when a file changed on watch mode
					},
					update(context) {
						// Called after each progress update
					},
					done(context) {
						// Called when compile finished
						process.send({ type: 'webpackbar', event: 'done' })
					},
					progress(context) {
						// Called when build progress updated
						//process.send({ type: 'webpackbar', event: 'progress', context })
					},
					allDone(context) {
						// Called when _all_ compiles finished
						//process.send({ type: 'webpackbar', event: 'allDone', context })
					},
					beforeAllDone(context) {
					},
					afterAllDone(context) {
					}
				}
			})

		]
	};

	if (!env.production) {
		config.plugins.push(new WatchStateNotifierPlugin());
	}

	return config;
};
