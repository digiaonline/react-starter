/**
 *
 * @param {Object} config
 * @return {Object}
 */
module.exports = {
  parseDotenvConfig: function(config) {
    const define = {};
    for (var key in config) {
      if (config.hasOwnProperty(key)) {
        define[key] = JSON.stringify(config[key]);
      }
    }
    return define;
  }
};
