const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/* Configuration */
module.exports = {
    entry: './src/index.js', /* Entry point for application default value: './src/index.js' */
    output: {
        filename: 'main.js', /* Output filename default value 'main.js' */
        path: path.resolve(__dirname, 'dist') /* Destination folder default value 'dist' */
    },
    /* Live in memory server */
    devServer: {
        contentBase: './dist', /* Content folder default './dist' */        
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin([
            {
                from: './src/index.html',
            },
        ]),
    ],    
    module: {
        rules: [
            /* Adding loaders for processing CSS */
            {
                test: /\.css$/,
                use: [
                    /* style-loader loads css into style tags from bundled js */
                    {
                        /* Css extractor loader for Css extractor plugin */
                        loader: MiniCssExtractPlugin.loader,
                        /* options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        }, */
                    },
                    'css-loader'
                ],
            }, 
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            }, 
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: '$',
                }],
            },
        ],
    },
};