/*global module, require, __dirname*/
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UnusedFilesWebpackPlugin = require("unused-files-webpack-plugin").default;

module.exports = {
    entry: './src/application.tsx',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'release'),
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
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/static/index.html",
            hash: true,
            inject: "body"
        }),
        new UnusedFilesWebpackPlugin({
            patterns: 'src/**/*.*'
        })
    ]
};
