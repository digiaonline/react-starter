/*eslint no-undef: 0*/

var path = require('path');

module.exports = {
  context: path.resolve(__dirname, '..'),
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.jsx?$/,
    //     loader: 'source-map'
    //   }
    // ],
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
        test: /\.scss$/,
        loader: 'style!css!sass?sourceMap',
        include: path.resolve(__dirname, '../src')
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
  }
};
