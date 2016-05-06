import path from 'path';
import Express from 'express';
import isomorphicTools from './isomorphic-tools';
import renderMiddleware from './middlewares/render';

const app = Express();
const port = process.env.PORT || 3000;

app.use(Express.static(path.resolve(__dirname, '../../static')));
app.use(renderMiddleware(isomorphicTools));

app.listen(port, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> Application server is listening on port %s', port);
  }
});
