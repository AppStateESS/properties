var setup = require('./exports.js')
var webpack = require('webpack')
var WebpackStripLoader = require('strip-loader')
var Promise = require('es6-promise').polyfill()

module.exports = {
  entry : setup.entry,
  output: {
    path: setup.path.join(setup.APP_DIR, "build"),
    filename: "[name].js"
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      include: setup.APP_DIR,
      loader: 'babel'
    }, {
      test: [/\.js$/, /\.es6$/, /\.jsx$/],
      exclude: /node_modules/,
      loader: WebpackStripLoader.loader('console.log')
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })
  ]
}
