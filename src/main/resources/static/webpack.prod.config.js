const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const pkg = require("./package").dependencies;

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        main: './app/index.js',
        vendor: Object.keys(pkg)
    },
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'prod'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /(\.jsx|\.js)$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                        }
                    }]
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }

        ]
    },
    resolve: {
        modules: [ 'node_modules' ],
        extensions: [ '.js', '.json' ]
    },
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "async"
                },
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        },
        minimize: true
    },
    performance: {
        maxEntrypointSize: 400000,
        maxAssetSize: 100000
    },
    plugins: [
        new CleanWebpackPlugin(['prod']),
        new webpack.BannerPlugin('我的音乐'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.ProvidePlugin({
            "React": "react",
            _: 'lodash'
        }),
        new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                ie8: false,
                ecma: 8,
                parse: {},
                mangle: false,
                output: {
                    comments: false,
                    beautify: false,
                },
                compress: false,
                warnings: false
            }
        }),
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            template: './app/index.tmp.html',
        })
    ]
};