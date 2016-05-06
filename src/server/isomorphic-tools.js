var path = require('path');
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var isomorphicToolsConfig = require('../../webpack/isomorphic-tools');
var basePath = path.resolve(__dirname, '../..');

const isomorphicTools = new WebpackIsomorphicTools(isomorphicToolsConfig)
  .development(__DEVELOPMENT__)
  .server(basePath, () => {
    require('./index');
  });

export default isomorphicTools;
