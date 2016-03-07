/*eslint no-unused-expressions: 0*/
/*eslint no-undef: 0*/

import { isUndefined } from 'lodash';

if (isUndefined(IS_LOGGING)) {
  throw new Error('IS_LOGGING must be set.');
}

if (isUndefined(LOGGING_LEVEL)) {
  throw new Error('LOGGING_LEVEL must be set.');
}

export const LogLevels = {
  LOG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  DEBUG: 5
};

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
