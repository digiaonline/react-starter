/*eslint no-undef: 0*/

import { isUndefined } from 'lodash';
import { getStorageItem, setStorageItem, removeStorageItem } from './storage';

if (isUndefined(global.OAUTH_CLIENT_ID)) {
  global.OAUTH_CLIENT_ID = 'app';
}

if (isUndefined(global.OAUTH_CLIENT_SECRET)) {
  global.OAUTH_CLIENT_SECRET = 'secret';
}

/**
 *
 * @param {Object} nextState
 * @param {function} replace
 */
export function requireAuth(nextState, replace) {
  if (!getIsAuthenticated()) {
    replace('login');
  }
}

/**
 *
 * @param {Object} nextState
 * @param {function} replace
 */
export function requireGuest(nextState, replace) {
  if (getIsAuthenticated()) {
    replace('/');
  }
}

/**
 *
 * @param {Object} session
 */
export function setSession(session) {
  setStorageItem('auth_session', session);
}

/**
 *
 * @param {Object} user
 */
export function setUser(user) {
  setStorageItem('auth_user', user);
}
/**
 *
 * @returns {Object}
 */
export function getSession() {
  return getStorageItem('auth_session');
}
/**
 *
 * @returns {Object}
 */
export function getUser() {
  return getStorageItem('auth_user');
}

/**
 *
 */
export function removeSession() {
  removeStorageItem('auth_session');
}

/**
 *
 */
export function removeUser() {
  removeStorageItem('auth_user');
}

/**
 *
 * @returns {boolean}
 */
export function getIsAuthenticated() {
  return Boolean(getAccessToken());
}

/**
 *
 * @returns {string|null}
 */
export function getAccessToken() {
  return getStorageItem('auth_session.access_token');
}

/**
 *
 * @returns {string|null}
 */
export function getRefreshToken() {
  return getStorageItem('auth_session.refresh_token');
}
