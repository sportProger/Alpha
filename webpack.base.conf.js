let
    webpack = require('webpack'),
    path = require ('path'),
    HtmlWebpackPlugin = require ('html-webpack-plugin'),
    { CleanWebpackPlugin } = require ('clean-webpack-plugin'),
    MiniCssExtractPlugin = require ('mini-css-extract-plugin'),
    CopyWebpackPlugin = require ('copy-webpack-plugin'),
    autoprefixer = require ('autoprefixer'),
    cssnano = require ('cssnano')

const PATHS = {
    src: path.join (__dirname, './src'),
    dist: path.join (__dirname, './dist'),
    assets: 'assets/'
}

let createHTMLWebpackPlugin = filename => {
    return new HtmlWebpackPlugin ({
        template: `./${filename}.html`,
        chunks: [filename],
        filename: `./${filename}.html`
    })
}

module.exports = {
    context: PATHS.src,
    entry: {
        index: `${PATHS.src}/assets/js/index.js`,
    },
    output: {
        path: PATHS.dist,
        filename: `${PATHS.assets}js/[name].js`
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts', '.css', '.sass', '.scss', '.png', '.jpg', '.svg', '.pug']
    },
    plugins: [
        createHTMLWebpackPlugin ('index'),
        new CleanWebpackPlugin (),
        new MiniCssExtractPlugin ({
            filename: `${PATHS.assets}/css/[name].css`
        }),
        new CopyWebpackPlugin ({
            patterns: [
                {
                    from: `${PATHS.src}/${PATHS.assets}images`,
                    to: `${PATHS.assets}images`
                }
            ]
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer ({
                                        overrideBrowserslist: ['ie >= 5', 'last 4 version']
                                    }),
                                    cssnano ()
                                ]
                            }
                        }
                    },
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer ({
                                        overrideBrowserslist: ['ie >= 5', 'last 4 version']
                                    }),
                                    cssnano ()
                                ]
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '../images/',
                            outputPath: `${PATHS.assets}images`
                        }
                    }
                ]
            },
        ]
    }
}