/*global module, require, __dirname*/
var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var UnusedFilesWebpackPlugin = require("unused-files-webpack-plugin").default;
var figlet = require("figlet");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
var CleanWebpackPlugin = require("clean-webpack-plugin");
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
    var cssLoader = {
        loader: "css-loader",
        options: {
            minimize: production
        }
    };

    var plugins = [
        new CleanWebpackPlugin(RELEASE_FOLDER),
        new HtmlWebpackPlugin({
            template: INDEX_HTML_PATH,
            hash: true,
            inject: "body"
        }),
        new UnusedFilesWebpackPlugin({
            patterns: SOURCE_FOLDER + "/**/*.*"
        }),
        extractStyles
    ];

    if (production) {
        plugins.push(new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }));
        plugins.push(new UglifyJSPlugin({
            sourceMap: true,
            parallel: true
        }));
    } else {
        plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: "server",
            analyzerPort: 8081,
            openAnalyzer: false
        }));
    }

    var expireDate = new Date(new Date() + (365 * 24 * 60 * 60 * 1000));
    console.log(expireDate);

    return {
        entry: "./" + SOURCE_FOLDER + "/application.tsx",
        devtool: "source-map",
        output: {
            path: path.resolve(__dirname, RELEASE_FOLDER),
            filename: "bundle.js"
        },
        resolve: {
            extensions: [
                ".js", ".jsx",
                ".ts", ".tsx",
                ".css", ".styl", ".less",
                ".gif", ".png", ".jpeg", ".jpg", ".svg"
            ]
        },
        module: {
            rules: [
                { test: /\.tsx?$/i, loader: "awesome-typescript-loader" },
                { test: /\.css$/i, use: extractStyles.extract([cssLoader]) },
                { test: /\.styl$/i, use: extractStyles.extract([cssLoader, "stylus-loader"]) },
                { test: /\.(gif|png|jpe?g|svg)$/i, use: [
                    "file-loader",
                    {
                        loader: "image-webpack-loader",
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: "65-90",
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ] }
            ]
        },
        devServer: {
            compress: true,
            historyApiFallback: true
        },
        plugins: plugins
    };
};
