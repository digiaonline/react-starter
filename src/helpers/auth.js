/*eslint no-undef: 0*/

import { getStorageItem, setStorageItem, removeStorageItem } from './storage';

import { isUndefined } from 'lodash';

if (isUndefined(OAUTH_CLIENT_ID)) {
  throw new Error('OAUTH_CLIENT_ID must be set.');
}

if (isUndefined(OAUTH_CLIENT_SECRET)) {
  throw new Error('OAUTH_CLIENT_SECRET must be set.');
}

/**
 *
 * @param {Object} nextState
 * @param {function} replace
 */
export function requireAuth(nextState, replace) {
  if (!getIsAuthenticated()) {
    replace({ nextPathname: nextState.location.pathname }, 'login');
  }
}

/**
 *
 * @param {Object} nextState
 * @param {function} replace
 */
export function requireGuest(nextState, replace) {
  if (getIsAuthenticated()) {
    replace({ nextPathname: nextState.location.pathname }, '/');
  }
}

/**
 *
 * @param {string} token
 */
export function setAccessToken(token) {
  setStorageItem('access_token', token);
}

/**
 *
 * @param {string} token
 */
export function setRefreshToken(token) {
  setStorageItem('refresh_token', token);
}

/**
 *
 * @returns {string}
 */
export function getAccessToken() {
  return getStorageItem('access_token');
}

/**
 *
 * @returns {string}
 */
export function getRefreshToken() {
  return getStorageItem('refresh_token');
}

/**
 *
 */
export function removeAccessToken() {
  removeStorageItem('access_token');
}

/**
 *
 */
export function removeRefreshToken() {
  removeStorageItem('refresh_token');
}

/**
 *
 * @returns {boolean}
 */
export function getIsAuthenticated() {
  return Boolean(getAccessToken());
}
