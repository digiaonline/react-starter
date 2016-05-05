/*eslint no-undef: 0*/

require('babel-register')(require('../../package.json').babel);

var fs = require('fs');
var path = require('path');
var basePath = path.resolve(__dirname, '../..');
var LocalStorage = require('node-localstorage').LocalStorage;
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var isomorphicToolsConfig = require('../../webpack/isomorphic-tools');

global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

var environment = {};

try {
  var envFilePath = path.resolve(__dirname, '../../.env');
  environment = fs.lstatSync(envFilePath).isFile() ? require('dotenv').config(envFilePath) : {};
} catch (e) {
  // Do nothing
}

// expose the environment variables to the global scope, required for server-side rendering
Object.keys(environment).map((key) => {
  global[key] = environment[key];
});

// setup local storage
global.localStorage = new LocalStorage('./storage');

// this global variable will be used later in express middleware
global.isomorphicTools = new WebpackIsomorphicTools(isomorphicToolsConfig)
  .development(__DEVELOPMENT__)
  .server(basePath, () => {
    require('./index');
  });
