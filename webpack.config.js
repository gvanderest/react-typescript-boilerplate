/*global module, require, __dirname*/
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UnusedFilesWebpackPlugin = require("unused-files-webpack-plugin").default;
var figlet = require("figlet");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


var SOURCE_FOLDER = "src";
var RELEASE_FOLDER = "release";
var STATIC_FOLDER = SOURCE_FOLDER + "/static";
var INDEX_HTML_PATH = STATIC_FOLDER + "/index.html";


module.exports = function(env) {
    var production = env && env.production;

    console.log("Building for..")
    console.log(figlet.textSync(production ? "PRODUCTION" : "development"))

    var extractStyles = new ExtractTextPlugin("styles.css");

    var plugins = [
        new CleanWebpackPlugin(RELEASE_FOLDER),
        new HtmlWebpackPlugin({
            template: INDEX_HTML_PATH,
            hash: true,
            inject: "body"
        }),
        new UnusedFilesWebpackPlugin({
            patterns: SOURCE_FOLDER + '/**/*.*'
        }),
        extractStyles
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
        entry: './' + SOURCE_FOLDER + '/application.tsx',
        devtool: 'source-map',
        output: {
            path: path.resolve(__dirname, RELEASE_FOLDER),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: [
                '.js', '.jsx',
                '.ts', '.tsx',
                '.css', '.styl', '.less',
                '.gif', '.png', '.jpeg', '.jpg', '.svg'
            ]
        },
        module: {
            rules: [
                { test: /\.tsx?$/i, loader: 'awesome-typescript-loader' },
                { test: /\.css$/i, use: extractStyles.extract(['css-loader']) },
                { test: /\.styl$/i, use: extractStyles.extract(['css-loader', 'stylus-loader']) },
                { test: /\.less$/i, use: extractStyles.extract(['css-loader', 'less-loader']) },
                { test: /\.(gif|png|jpe?g|svg)$/i, use: 'file-loader' }
            ]
        },
        devServer: {
            historyApiFallback: true
        },
        plugins: plugins
    };
};
