/*eslint no-undef: 0*/

require('babel-register')(require('../../package.json').babel);

var fs = require('fs');
var path = require('path');
var fetch = require('node-fetch');

global.fetch = fetch;

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

// Setup isomorphic tools, which in turn starts the application server
require('./isomorphic-tools');
