/* eslint no-undef: 0*/

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var helpers = require('./helpers');

global.isomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic-tools'));

var environment = helpers.getEnvironment(path.resolve(__dirname, '../.env'));

module.exports = Object.assign({
  devtool: 'inline-source-map',
  entry: {
    main: [
      'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr&timeout=2000&overlay=false',
      './src/main.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js',
    publicPath: 'http://localhost:3001/'
  },
  plugins: [
    new webpack.DefinePlugin(Object.assign({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }, environment)),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'src/main.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    isomorphicToolsPlugin.development()
  ]
}, require('./config'));
