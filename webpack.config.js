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
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React Boilerplate'
        }),
        new UnusedFilesWebpackPlugin()
    ]
};
