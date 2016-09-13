var webpack = require('webpack');
var path = require('path');
var Promise = require('es6-promise').polyfill();

var APP_DIR = path.resolve(__dirname, 'javascript');

module.exports = {
    entry: {
        manager: APP_DIR + '/Manager/index.jsx'
    },
    output: {
        path: path.join(APP_DIR, "dev"),
        filename: "[name].js"
    },
    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            loader: 'jshint-loader',
            exclude: '/node_modules/',
            include: APP_DIR + "/dev"
        }],
        loaders: [{
            test: /\.jsx?/,
            include: APP_DIR,
            loader: 'babel'
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    },
    devtool: 'source-map'
}
