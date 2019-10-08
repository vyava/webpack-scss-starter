const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin}   = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

    entry : {
        main : "./src/index.js"
    },
    output : {
        path : path.resolve(__dirname, "dist"),
        filename : "main.bundle.js"
    },
    module : {
        rules : [
            {
                test: /\.(sa|sc|c)ss$/,
                use : [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath : path.resolve(__dirname, 'dist'),
                            // publicPath: (resourcePath, context) => {
                            // // publicPath is the relative path of the resource to the context
                            // // e.g. for ./css/admin/main.css the publicPath will be ../../
                            // // while for ./css/main.css the publicPath will be ../
                            // return path.relative(path.dirname(resourcePath), context) + '/';
                            // },
                        },
                    },
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins : [
        new MiniCssExtractPlugin({
            filename : 'style.css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            title : "Test Title",
            template : './src/index.html',
            inject : true
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin([
            { from: '.src/img', to: 'dist/img' }
        ])
    ],
    resolve : { extensions : ['.js', '.css', '.scss']}
}