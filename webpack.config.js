'use strict';

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
    /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
    var config = {};

    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     * Should be an empty object if it's generating a test build
     * Karma will set this when it's a test build
     */
    config.entry = isTest ? {} : {
            app: ['./module/AppFrontend/src/app.module.js']
        };

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     * Should be an empty object if it's generating a test build
     * Karma will handle setting it up for you when it's a test build
     */
    config.output = isTest ? {} : {
            path: './public/asset',

            // publicPath: '/dist/',

            filename: isProd ? '[name].[hash].js' : '[name].bundle.js',

            chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
        };

    /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
    if (isTest) {
        config.devtool = 'inline-source-map';
    } else if (isProd) {
        config.devtool = 'cheap-source-map';
    } else {
        config.devtool = 'inline-source-map';
    }

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */

    // Initialize module
    config.module = {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel']
        }, {
            // Reference: https://github.com/webpack/css-loader
            // Reference: https://github.com/postcss/postcss-loader
            test: /\.css$/,
            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            // Reference: https://github.com/webpack/style-loader
            loader: isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
        }, {
            // Reference: https://github.com/webpack/sass-loader
            // Reference: https://github.com/postcss/postcss-loader
            test: /\.scss$/,
            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            // Reference: https://github.com/webpack/style-loader
            loader: isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap!postcss')
        }, {
            // Reference: https://github.com/webpack/file-loader
            test: /\.(png|jpg|jpeg|gif)$/,
            loader: 'file'
        }, {
            // Reference: https://github.com/webpack/raw-loader
            test: /\.html$/,
            loader: 'raw'
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=65000&mimetype=application/font-woff"
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=65000&mimetype=application/font-woff"
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=65000&mimetype=application/octet-stream"
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file"
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=65000&mimetype=image/svg+xml"
        }]
    };

    config.module.preLoaders = [];

    // ISPARTA LOADER
    // Reference: https://github.com/ColCh/isparta-instrumenter-loader
    if (isTest) {
        config.module.preLoaders.push({
            test: /\.js$/,
            exclude: [
                /node_modules/,
                /\.spec\.js$/
            ],
            loader: 'isparta-instrumenter'
        })
    }

    /**
     * PostCSS
     * Reference: https://github.com/postcss/autoprefixer-core
     * Add vendor prefixes to your css
     */
    config.postcss = [
        autoprefixer({
            browsers: ['last 2 version']
        })
    ];

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [];

    // if (!isTest) {
    //     // Reference: https://github.com/ampedandwired/html-webpack-plugin
    //     config.plugins.push(
    //         new HtmlWebpackPlugin({
    //             template: './src/public/index.html',
    //             filename: 'index.html',
    //             inject: 'body'
    //         }),
    //         new WebpackNotifierPlugin(),
    //         new webpack.ProvidePlugin({
    //             $: "jquery",
    //             jQuery: "jquery",
    //             "window.jQuery": "jquery"
    //         })
    //     )
    // }

    // Add build specific plugins
    if (isProd) {
        config.plugins.push(
            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            new ExtractTextPlugin('[name].[hash].css'),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            new webpack.NoErrorsPlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
            new webpack.optimize.DedupePlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            new webpack.optimize.UglifyJsPlugin({
                mangle: false //ngAnnotate for es6 probably doesn't work
            }),
            // Reference: https://github.com/kevlened/copy-webpack-plugin
            new CopyWebpackPlugin([{
                from: __dirname + '/src/public'
            }])
        );
    }

    if (!isProd && !isTest) {
        config.plugins.push(
            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            new ExtractTextPlugin('[name].css'),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            new webpack.NoErrorsPlugin(),

            // Reference: https://github.com/kevlened/copy-webpack-plugin
            new CopyWebpackPlugin([{
                from: __dirname + '/module/AppFrontend/public'
            }])
        );
    }

    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    config.devServer = {
        contentBase: './src/public',
        stats: 'minimal'
    };

    /**
     * Path references
     * http://webpack.github.io/docs/configuration.html#resolve-modulesdirectories
     */
    config.resolve = {
        modulesDirectories: [
            'node_modules',
            'app'
        ]
    };

    return config;
}();
