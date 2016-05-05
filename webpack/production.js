/* eslint no-undef: 0*/

var path = require('path');
var webpack = require('webpack');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var helpers = require('./helpers');

global.isomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic-tools'));

var environment = helpers.getEnvironment(path.resolve(__dirname, '../.env'));

module.exports = Object.assign({}, {
  devtool: 'source-map',
  entry: {
    main: [
      './src/main.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../static/dist'),
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.DefinePlugin(Object.assign({}, {
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }, environment)),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    isomorphicToolsPlugin
  ]
}, require('./config'));
