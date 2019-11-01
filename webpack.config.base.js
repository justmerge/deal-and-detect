'use strict';

const webpack = require('webpack'),
	path = require('path'),
	htmlPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/js/main.js',
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
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
		}, {
			test: /\.html$/,
			use: {
				loader: 'html-loader'
			}
		}]
	},
	output: {
		filename: 'js/deal-and-detect.js'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			API: path.resolve(__dirname, 'src/js/utils/api.js'),
			ComboDetector: path.resolve(__dirname, 'src/js/ComboDetector'),
			components: path.resolve(__dirname, 'src/js/components'),
			constants: path.resolve(__dirname, 'src/js/utils/constants.js'),
			core: path.resolve(__dirname, 'src/js/main.js'),
			Detectors: path.resolve(__dirname, 'src/js/ComboDetector/detectors'),
			styles: path.resolve(__dirname, 'src/scss'),
			Utils: path.resolve(__dirname, 'src/js/utils'),
			'window': path.resolve(__dirname, 'src/js/utils/window.js')
		}
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new htmlPlugin({
			template: path.resolve(__dirname, 'src/html/index.html'),
			filename: path.resolve(__dirname, 'dist/index.html')
		})
	]
};
