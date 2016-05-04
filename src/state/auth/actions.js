/*eslint no-undef: 0*/

import { fetchFromApi } from '../../helpers/api';

export const AuthActionTypes = {
  LOGIN_REQUEST: 'AUTH/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'AUTH/LOGIN_FAILURE',
  LOGOUT: 'AUTH/LOGOUT',
  USER_LOAD_REQUEST: 'AUTH/USER_LOAD_REQUEST',
  USER_LOAD_SUCCESS: 'AUTH/USER_LOAD_SUCCESS',
  USER_LOAD_FAILURE: 'AUTH/USER_LOAD_FAILURE'
};

/**
 *
 * @param {string} username
 * @param {string }password
 * @returns {Object}
 */
export function login(username, password) {
  const body = {
    grant_type: 'password',
    client_id: OAUTH_CLIENT_ID,
    client_secret: OAUTH_CLIENT_SECRET,
    username,
    password
  };
  
  const init = {
    method: 'POST',
    body: JSON.stringify(body)
  };

  return {
    types: [AuthActionTypes.LOGIN_REQUEST, AuthActionTypes.LOGIN_SUCCESS, AuthActionTypes.LOGIN_FAILURE],
    shouldCallApi: state => !state.auth.get('isAuthenticated'),
    callApi: dispatch => fetchFromApi('auth/login', init, dispatch)
  };
}

/**
 *
 * @returns {Object}
 */
export function loadUser() {
  return {
    types: [AuthActionTypes.USER_LOAD_REQUEST, AuthActionTypes.USER_LOAD_SUCCESS, AuthActionTypes.USER_LOAD_FAILURE],
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
