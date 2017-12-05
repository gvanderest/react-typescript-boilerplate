/*global module, require, __dirname*/
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UnusedFilesWebpackPlugin = require("unused-files-webpack-plugin").default;
var figlet = require("figlet");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var CleanWebpackPlugin = require('clean-webpack-plugin');


var RELEASE_FOLDER = 'release';


module.exports = function(env) {
    var production = env && env.production;

    console.log("Building for..")
    console.log(figlet.textSync(production ? "PRODUCTION" : "development"))

    var plugins = [
        new CleanWebpackPlugin(RELEASE_FOLDER),
        new HtmlWebpackPlugin({
            template: "src/static/index.html",
            hash: true,
            inject: "body"
        }),
        new UnusedFilesWebpackPlugin({
            patterns: 'src/**/*.*'
        })
    ];

    if (production) {
        plugins.push(new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }));
        plugins.push(new UglifyJSPlugin({
            sourceMap: true,
            parallel: true
        }));
    } else {
        plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false
        }));
    }

    return {
        entry: './src/application.tsx',
        devtool: 'source-map',
        output: {
            path: path.resolve(__dirname, RELEASE_FOLDER),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        module: {
            rules: [
                { test: /\.tsx?$/, loader: 'awesome-typescript-loader' }
            ]
        },
        devServer: {
            historyApiFallback: true
        },
        plugins: plugins
    };
};
