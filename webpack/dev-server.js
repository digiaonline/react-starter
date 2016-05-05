var Express = require('express');
var webpack = require('webpack');
var WebpackDevMiddleware = require('webpack-dev-middleware');
var WebpackHotMiddleware = require('webpack-hot-middleware');

var webpackConfig = require('./development');
var compiler = webpack(webpackConfig);

var port = (+process.env.PORT || 3000) + 1;
var app = Express();

app.use(WebpackDevMiddleware(compiler, {
  contentBase: 'http://localhost:' + port,
  quiet: true,
  noInfo: true,
  hot: true,
  historyApiFallback: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true }
}));

app.use(WebpackHotMiddleware(compiler));

app.listen(port, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> Webpack development server listening on port %s', port);
  }
});
