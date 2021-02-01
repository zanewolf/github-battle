const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')

module.exports={
    entry: './app/index.js', //the entry point is the file that kicks everything off and is often index.js
    module:{
        rules: [
            { test: /\.svg$/, use: 'svg-inline-loader'}, //if it has the svg file path, use this loader
            {test: /\.css$/, use: ['style-loader', 'css-loader']}, //using two loaders, so use array, and the array is processed in reverse order
            {test: /\.(js)$/, use: 'babel-loader'}
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js', //create dist folder and inside dist folder, add the bundle of files and name it index_bundle.js
        publicPath:'/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        }),
        new CopyPlugin({
            patterns: [
                { "from": "_redirects" }
            ],
        })
        // new webpack.EnvironmentPlugin({
        //     'NODE_ENV': 'production'
        // })
    ],
    mode: process.env.NODE_ENV === 'production'? 'production' :"development",
    devServer:{
        historyApiFallback: true
    }
}
