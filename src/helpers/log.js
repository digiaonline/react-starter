/*eslint no-unused-expressions: 0*/
/*eslint no-undef: 0*/

export const LogLevels = {
  LOG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  DEBUG: 5
};

global.IS_LOGGING = global.IS_LOGGING || false;
global.LOGGING_LEVEL = global.LOGGING_LEVEL || LogLevels.LOG;

export function log() {
  shouldLog(LogLevels.LOG) && console.log.apply(console, arguments);
}

export function info() {
  shouldLog(LogLevels.INFO) && console.info.apply(console, arguments);
}

export function warn() {
  shouldLog(LogLevels.WARN) && console.warn.apply(console, arguments);
}

export function error() {
  shouldLog(LogLevels.ERROR) && console.error.apply(console, arguments);
}

export function debug() {
  shouldLog(LogLevels.DEBUG) && console.debug.apply(console, arguments);
}

function shouldLog(logLevel) {
  return Boolean(IS_LOGGING) && LOGGING_LEVEL >= logLevel;
}
