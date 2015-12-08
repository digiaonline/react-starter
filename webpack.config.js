var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './main.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!sass'),
      include: path.join(__dirname, 'src'),
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=8192'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React starter',
      template: './src/main.html',
      inject: 'body'
    }),
    new ExtractTextPlugin('bundle.css')
  ]
};
