const webpackBaseConfig = require('./webpack.config.base'),
	merge = require('webpack-merge');

module.exports = merge(webpackBaseConfig, {
	mode: "development",
	devtool: "inline-source-map"
});
