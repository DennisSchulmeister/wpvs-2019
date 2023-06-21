/*
 * wpvs-2019 (https://github.com/DennisSchulmeister/wpvs-2019)
 * © 2019 Dennis Schulmeister-Zimolong <dennis@pingu-mail.de>
 * License of this file: 3-clause BSD
 */
"use strict";

// Imports
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

// Webpack base configuration
let cssLoader = {
    loader: "css-loader",
    options: {
        esModule: true,
        modules: {
            namedExport: true,
        },
    },
};

let webpackConfig = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.bundle.css"
        }),

        new webpack.ProvidePlugin({
            //$: 'jquery',
            //jQuery: 'jquery',
            //'window.jQuery': 'jquery',
            //Popper: ['popper.js', 'default'],
        }),
    ],

    entry: {
        "index": path.join(__dirname, "js", "index.js"),
    },

    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, process.env.npm_package_config_build_dir),
        publicPath: `${process.env.npm_package_config_public_url}/`,
    },

    devtool: "source-map",

    module: {
        rules: [{
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, cssLoader], 
        }, {
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader, cssLoader, "less-loader"],
        },{
            test: /\.(svg|jpg|png|gif|eot|ttf|woff|woff2)$/, 
            type: "asset",
        },{
            test: /\.(htm|html)/,
            use: "html-loader",
        },],
    },

    optimization: {
        minimize: false,
    },
};

// Export configuration
module.exports = webpackConfig;
