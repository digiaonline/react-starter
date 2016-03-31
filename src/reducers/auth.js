/*eslint no-unused-vars: 0*/

import { fromJS, Map } from 'immutable';
import { createReducer } from '../helpers/store';
import { AuthActionTypes } from '../actions/auth';
import {
  setAccessToken,
  setRefreshToken,
  setUser,
  getAccessToken,
  getRefreshToken,
  getIsAuthenticated,
  getUser,
  removeAccessToken,
  removeRefreshToken,
  removeUser
} from '../helpers/auth';

const initialState = Map({
  accessToken: getAccessToken(),
  refreshToken: getRefreshToken(),
  isAuthenticated: getIsAuthenticated(),
  user: fromJS(getUser())
});

/**
 * Called when login request is initiated.
 *
 * @param {Map} state
 * @param {Object} action
 * @returns {Map}
 */
export function handleLoginRequest(state, action) {
  return state
    .set('isLoading', true)
    .delete('errorMessage');
}

/**
 * Called when login request is successful.
 *
 * @param {Map} state
 * @param {Object} action
 * @returns {Map}
 */
export function handleLoginSuccess(state, action) {
  if (action.response.status !== 200) {
    return state
      .set('isAuthenticated', false)
      .set('errorMessage', action.data.message)
      .delete('accessToken')
      .delete('refreshToken')
      .delete('isLoading');
  }

  setAccessToken(action.data.access_token);
  setRefreshToken(action.data.refresh_token);

  return state
    .set('isAuthenticated', true)
    .set('accessToken', action.data.access_token)
    .set('refreshToken', action.data.refresh_token)
    .delete('isLoading');
}

/**
 * Called when the login request fails.
 *
 * @param {Map} state
 * @param {Object} action
 * @returns {Map}
 */
export function handleLoginFailure(state, action) {
  return handleLogout(state, action);
}

/**
 * Called when a load request is initiated.
 *
 * @param {Map} state
 * @param {Object} action
 * @returns {Map}
 */
export function handleLoadRequest(state, action) {
  return state
    .set('isLoading', true);
}

/**
 * Called when the load user is successful.
 *
 * @param {Map} state
 * @param {Object} action
 * @returns {Map}
 */
export function handleLoadUser(state, action) {
  if (action.response.status !== 200) {
    return state
      .set('errorMessage', action.data.message)
      .delete('isLoading');
  }

  setUser(action.data);

  return state
    .set('user', action.data)
    .delete('isLoading');
}

/**
 * Called when a load request fails.
 *
 * @param {Map} state
 * @param {Object} action
 * @returns {Map}
 */
export function handleLoadFailure(state, action) {
  return state
    .set('errorMessage', action.error)
    .delete('isLoading');
}

/**
 * Called when the user is logged out.
 *
 * @param {Map} state
 * @param {Object} action
 * @returns {Map}
 */
export function handleLogout(state, action) {
  removeAccessToken();
  removeRefreshToken();
  removeUser();

  return state
    .set('isAuthenticated', false)
    .set('errorMessage', action.error)
    .delete('accessToken')
    .delete('refreshToken')
    .delete('isLoading');
}

export const authReducer = createReducer(initialState, {
  [AuthActionTypes.LOGIN_REQUEST]: handleLoginRequest,
  [AuthActionTypes.LOGIN_SUCCESS]: handleLoginSuccess,
  [AuthActionTypes.LOGIN_FAILURE]: handleLoginFailure,
  [AuthActionTypes.LOAD_REQUEST]: handleLoadRequest,
  [AuthActionTypes.LOAD_USER]: handleLoadUser,
  [AuthActionTypes.LOAD_FAILURE]: handleLoadFailure,
  [AuthActionTypes.LOGOUT]: handleLogout
});
