var fs = require('fs');
var dotenv = require('dotenv');

function parseDotenvConfig(config) {
  const define = {};
  for (var key in config) {
    if (config.hasOwnProperty(key)) {
      define[key] = JSON.stringify(config[key]);
    }
  }
  return define;
}

/**
 *
 * @param {Object} config
 * @return {Object}
 */
module.exports = {
  getEnvironment: function(path) {
    var environment = {};
    try {
      environment = fs.lstatSync(path).isFile() ? parseDotenvConfig(dotenv.config(path)) : {};
    } catch (e) {
      // Do nothing...
    }
    return environment;
  }
};
