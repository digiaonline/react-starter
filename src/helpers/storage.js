/*eslint no-undef: 0*/

import { isString, isUndefined } from 'lodash';
import { debug } from './log';

if (isUndefined(global.STORAGE_PREFIX)) {
  global.STORAGE_PREFIX = 'app';
}

/**
 *
 * @param {string} key
 */
export function getStorageItem(key) {
  if (typeof localStorage === 'undefined') {
    return null;
  }
  const value = localStorage.getItem(buildStorageKey(key));
  return isJson(value) ? JSON.parse(value) : value;
}

/**
 *
 * @param {string} key
 * @param {*} value
 */
export function setStorageItem(key, value) {
  if (typeof localStorage === 'undefined') {
    return;
  }
  if (!isString(value)) {
    value = JSON.stringify(value);
  }
  localStorage.setItem(buildStorageKey(key), value);
  debug('storage item set: %s -> %s', key, value);
}

/**
 *
 * @param {string} key
 */
export function removeStorageItem(key) {
  if (typeof localStorage === 'undefined') {
    return;
  }
  localStorage.removeItem(buildStorageKey(key));
  debug('storage item removed: %s', key);
}

/**
 *
 * @param {string} key
 * @returns {string}
 */
function buildStorageKey(key) {
  return [STORAGE_PREFIX, key].join('.');
}

/**
 *
 * @param {*} value
 * @returns {boolean}
 */
function isJson(value) {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }
  return true;
}
