/*eslint no-undef: 0*/

import { fetchFromApi } from '../helpers/api';

export const AuthActionTypes = {
  LOGIN_REQUEST: 'AUTH/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'AUTH/LOGIN_FAILURE',
  LOAD_REQUEST: 'AUTH/LOAD_REQUEST',
  LOAD_USER: 'AUTH/LOAD_USER',
  LOAD_FAILURE: 'AUTH/LOAD_FAILURE',
  LOGOUT: 'AUTH/LOGOUT'
};

/**
 *
 * @param {string} username
 * @param {string }password
 * @returns {Object}
 */
export function login(username, password) {
  const form = new FormData();

  form.append('grant_type', 'password');
  form.append('client_id', OAUTH_CLIENT_ID);
  form.append('client_secret', OAUTH_CLIENT_SECRET);
  form.append('username', username);
  form.append('password', password);

  return {
    types: [AuthActionTypes.LOGIN_REQUEST, AuthActionTypes.LOGIN_SUCCESS, AuthActionTypes.LOGIN_FAILURE],
    shouldCallApi: state => !state.auth.get('isAuthenticated'),
    callApi: dispatch => fetchFromApi('auth/login', { method: 'POST', body: form }, dispatch)
  };
}

/**
 *
 * @returns {Object}
 */
export function loadUser() {
  return {
    types: [AuthActionTypes.LOAD_REQUEST, AuthActionTypes.LOAD_USER, AuthActionTypes.LOAD_FAILURE],
    shouldCallApi: state => state.auth.get('isAuthenticated'),
    callApi: dispatch => fetchFromApi('me', null, dispatch)
  };
}

/**
 *
 * @param {Object} result
 * @returns {Object}
 */
export function refreshSuccess(result) {
  return { type: AuthActionTypes.LOGIN_SUCCESS, ...result };
}

/**
 *
 * @returns {Object}
 */
export function logout() {
  return { type: AuthActionTypes.LOGOUT };
}
