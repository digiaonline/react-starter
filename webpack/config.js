/*eslint no-undef: 0*/

var path = require('path');
var webpack = require('webpack');

module.exports = function(isomorphicToolsPlugin) {
  return {
    context: path.resolve(__dirname, '..'),
    output: {
      path: path.resolve(__dirname, '../static/dist'),
      filename: '[name].[hash].js',
      sourceMapFilename: '[file].map',
      chunkFilename: '[id].[hash].js'
    },
    resolve: {
      modulesDirectories: [
        'src',
        'node_modules'
      ],
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'react-hot!babel!eslint',
          include: path.resolve(__dirname, '../src')
        },
        {
          test: /\.json$/,
          loader: 'json'
        },
        {
          test: isomorphicToolsPlugin.regular_expression('images'),
          loader: 'url?prefix=img/&limit=5000'
        },
        {
          test: /\.(mp3|ogg|wav)$/,
          loader: 'url?prefix=audio/&limit=5000'
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url?prefix=font/&limit=5000&mimetype=application/font-woff'
        },
        {
          test: /\.(ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file'
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
      })
    ]
  };
};
