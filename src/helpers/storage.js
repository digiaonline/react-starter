/*eslint no-undef: 0*/

import { isUndefined } from 'lodash';

if (isUndefined(STORAGE_PREFIX)) {
  throw new Error('STORAGE_PREFIX must be set.');
}

/**
 *
 * @param {string} key
 */
export function getStorageItem(key) {
  return localStorage.getItem(buildStorageKey(key));
}

/**
 *
 * @param {string} key
 * @param {*} value
 */
export function setStorageItem(key, value) {
  localStorage.setItem(buildStorageKey(key), value);
  debug('storage item set: %s => %s', key, value);
}

/**
 *
 * @param {string} key
 */
export function removeStorageItem(key) {
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
