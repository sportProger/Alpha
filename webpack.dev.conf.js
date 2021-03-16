let
    { merge } = require ('webpack-merge'),
    webpack = require ('webpack'),
    baseWebpackConfig = require ('./webpack.base.conf')

let devWebpackConfig = merge (baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 3000
    }
})

module.exports = new Promise (resolve => {
    resolve (devWebpackConfig)
})