const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const pkg = require("./package").dependencies;

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "build"),
        historyApiFallback: true, //不跳转
        compress: true,
        port: 4000,
        hot: true
    },
    entry: {
        main: './app/index.js',
        vendor: Object.keys(pkg)
    },
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'build')
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
                    loader: "babel-loader",
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
    plugins: [
        new CleanWebpackPlugin(['build']),
        new webpack.BannerPlugin('我的音乐'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.ProvidePlugin({
            "React": "react",
            _: 'lodash'
        }),
        new ExtractTextPlugin("styles.css"),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './app/index.tmp.html',
        })
    ]
};