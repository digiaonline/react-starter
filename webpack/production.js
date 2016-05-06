/* eslint no-undef: 0*/

var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var helpers = require('./helpers');
var merge = require('merge-deep');

var isomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic-tools'));

var environment = helpers.getEnvironment(path.resolve(__dirname, '../.env'));

environment['process.env.NODE_ENV'] = "'production'";

var extractStylesPlugin = new ExtractTextPlugin('[name].[hash].css');

module.exports = merge({}, require('./config')(isomorphicToolsPlugin), {
  devtool: 'source-map',
  entry: {
    main: [
      './src/main.js'
    ]
  },
  output: {
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: extractStylesPlugin.extract('css!sass?sourceMap'),
        include: path.resolve(__dirname, '../src')
      }
    ]
  },
  plugins: [
    new CleanPlugin(['./static/dist'], { root: path.resolve(__dirname, '..') }),
    new webpack.DefinePlugin(environment),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    extractStylesPlugin,
    isomorphicToolsPlugin
  ]
});
