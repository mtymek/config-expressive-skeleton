const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
// const webpack = require('webpack');

module.exports = merge(baseConfig, {

    debug: true,

    devtool: '#source-map',


});
