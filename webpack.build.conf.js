let
    { merge } = require ('webpack-merge'),
    glob = require ('glob'),
    ImageminWebpackPlugin = require ('imagemin-webpack-plugin').default,
    baseWebpackConfig = require ('./webpack.base.conf')

let buildWebpackConfig = merge (baseWebpackConfig, {
    mode: 'production',
    plugins: [
        new ImageminWebpackPlugin ({
            test: /.(png|jpg|svg)$/
        }),
        new ImageminWebpackPlugin ({
            externalImages: {
                context: 'src',
                sources: glob.sync ('src/images/**/*.png'),
                destination: `src/assets/images`,
                fileName: '[path][name].[ext]'
            }
        }),
        new ImageminWebpackPlugin ({
            jpegtran: {
                progressive: false,
                quality: '50-70'
            },
            optipng: {
                interlaced: null,
                quality: '50-70',
                optimizationLevel: 7
            }
        })
    ]
})

module.exports = new Promise (resolve => {
    resolve (buildWebpackConfig)
})