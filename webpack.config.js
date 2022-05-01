const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/scripts/index.js',
    output: {
        filename: 'main[hash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new MiniCssExtractPlugin(),
    ],

    mode: 'development',

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader, 
                }, 
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    },
                },
                {
                    loader: 'postcss-loader',
                }],
            },
            {
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
            {
                test: /\.js$/,
                //use: 'babel-loader',
                loader: 'babel-loader',
                exclude: /node-modules/,
            },
        ],
    },

    devServer: {
        static: path.resolve(__dirname, './dist'),
        compress: true,
        port: 8088,
        open: true,
    },

    devtool: 'inline-source-map',
};