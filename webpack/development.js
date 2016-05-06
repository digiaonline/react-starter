/* eslint no-undef: 0*/

var path = require('path');
var webpack = require('webpack');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var helpers = require('./helpers');
var merge = require('merge-deep');

var isomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic-tools'));

var environment = helpers.getEnvironment(path.resolve(__dirname, '../.env'));

environment['process.env.NODE_ENV'] = "'development'";

module.exports = merge({}, require('./config')(isomorphicToolsPlugin), {
  devtool: 'inline-source-map',
  entry: {
    main: [
      'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr&timeout=2000&overlay=false',
      './src/main.js'
    ]
  },
  output: {
    publicPath: 'http://localhost:3001/'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!sass?sourceMap',
        include: path.resolve(__dirname, '../src')
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(environment),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    isomorphicToolsPlugin.development()
  ]
});
