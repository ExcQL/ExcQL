const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./client/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
        port: 8080,
        historyApiFallback: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        proxy: { '/orders': 'http://localhost:3000/' }
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env', '@babel/preset-react'] }
                }
            }, {
                test: /.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './client/index.html' })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
}