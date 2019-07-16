const path = require('path')
const CopyWebPackPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} =  require('clean-webpack-plugin')
const WebpackManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = env => {
    const mode = env && env.production ? 'production' : 'development'

    return {
        mode,
        //entry : './src/index.js',
        output: {
            filename : '[name].js',
            path: path.resolve(__dirname, '../dist')
        },
        plugins: [
            // new CopyWebPackPlugin([
            //     {
            //         from: './src/index.html',
            //         to:path.resolve(__dirname, 'dist')
            //     }
            // ]),
            new CleanWebpackPlugin(),
            new WebpackManifestPlugin(),
            new MiniCssExtractPlugin(),
            new webpack.ProvidePlugin({
                React:'react'
            })
        ],
        module:{
            rules:[
                {test:/\.jsx?$/,use:'babel-loader',exclude:/node_modules/},
                {test:/\.scss$/,use:[MiniCssExtractPlugin.loader,{loader:'css-loader',options:{modules:true}},'sass-loader']}
            ]
        },
        devtool:'inline-source-map',
        resolve:{
            alias: {
                Components: path.resolve(__dirname,'../src/component'),
                Utils: path.resolve(__dirname,'../src/utils'),
            }
        }
    }

}