require('babel-register')(require('../../package.json').babel);

var path = require('path');
var basePath = path.resolve(__dirname, '../..');
var LocalStorage = require('node-localstorage').LocalStorage;
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var isomorphicToolsConfig = require('../../webpack/isomorphic-tools');

global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

// require('dotenv').config(path.resolve(__dirname, '../.env'));

// console.log(process.env.IS_LOGGING);

// setup local storage
global.localStorage = new LocalStorage('./storage');

// this global variable will be used later in express middleware
global.isomorphicTools = new WebpackIsomorphicTools(isomorphicToolsConfig)
  .development(__DEVELOPMENT__)
  .server(basePath, function() {
    require('./index');
  });
