var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var polyfill = require('babel-polyfill');
var nodeEnv    = process.env.NODE_ENV;
var css  = nodeEnv === 'production' ? 'css' : 'css?sourceMap';

module.exports = {
    resolve: {
        modulesDirectories: ["node_modules", "src", ".", "public"],
        extensions: ['', '.js', '.jsx']
    },

    entry: [
        'babel-polyfill',
        './public/web/src/index.js'
    ],

    output: {
        path: __dirname + "/public/web",
        filename: "bundle.js"
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],

    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
            {
                test: /\.js.*$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.(otf|svg|eot|woff|woff2|ttf|jpg|png|gif)$/,
                loaders: ['url-loader']
            },
            {
                test: /\.json$/,
                loaders: ['json']
            }
        ]
    }
};
