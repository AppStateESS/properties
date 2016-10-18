var setup = require('./exports.js')
var webpack = require('webpack')
var Promise = require('es6-promise').polyfill()

module.exports = {
  entry : setup.entry,
  output: {
    path: setup.path.join(setup.APP_DIR, "dev"),
    filename: "[name].js"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor","vendor.js")
  ],
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'jshint-loader',
      exclude: '/node_modules/',
      include: setup.APP_DIR + "/dev"
    }],
    loaders: [{
      test: /\.jsx?/,
      include: setup.APP_DIR,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }]
  },
  devtool: 'source-map'
}
