/*global module, require, __dirname*/
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var UnusedFilesWebpackPlugin = require("unused-files-webpack-plugin").default;

module.exports = {
    entry: './media/operators/11/application.tsx',
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
            title: 'FantasyDraft | Experience Daily Fantasy Sports on a Level Playing Field'
        })
        // new UnusedFilesWebpackPlugin({
        //     pattern: 'media/{operators/11,default}/**/*.*'
        // })
    ]
};
