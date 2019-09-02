'use strict';
const webpack = require('webpack'),
	path = require('path');

module.exports = {
	entry: './src/js/main.js',
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader'
			}
		}, {
			test: /\.worker\.js$/,
			use: {
				loader: 'worker-loader'
			}
		}, {
			test: /\.scss$/,
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader'
			}, {
				loader: 'sass-loader'
			}]
		}]
	},
	output: {
		filename: 'js/deal-and-detect.js'
	},
	resolve: {
		alias: {
			API: path.resolve(__dirname, 'src/js/utils/api.js'),
			constants: path.resolve(__dirname, 'src/js/utils/constants.js'),
			ComboDetector: path.resolve(__dirname, 'src/js/ComboDetector'),
			Utils: path.resolve(__dirname, 'src/js/utils'),
			Detectors: path.resolve(__dirname, 'src/js/ComboDetector/detectors'),
			'window': path.resolve(__dirname, 'src/js/utils/window.js')
		}
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin()
	]
};
