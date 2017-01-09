const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const webpack = require('webpack');

module.exports = merge(baseConfig, {

    debug: false,

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            mangle: false //ngAnnotate for es6 probably doesn't work
        }),
    ]

});
