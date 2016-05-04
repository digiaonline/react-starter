/*eslint no-unused-vars: 0*/

import { fromJS, Map } from 'immutable';
import { createReducer } from '../../helpers/store';
import { AuthActionTypes } from './actions';
import {
  setSession,
  setUser,
  getSession,
  getIsAuthenticated,
  getUser,
  removeSession,
  removeUser
} from '../../helpers/auth';

const initialState = fromJS({
  session: getSession(),
  user: getUser(),
  isAuthenticated: getIsAuthenticated()
});

/**
 * Called when login request is initiated.
 *
 * @param {Map} state
 * @param {Object} action
 * @returns {Map}
 */
export function handleLoginRequest(state, action) {
  return state.set('session', fromJS({ isLoading: true }));
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
    return handleLoginFailure(state, { error: action.data.message });
  }

  setSession(action.data);

  return state
    .set('session', fromJS(action.data))
    .set('isAuthenticated', true);
}

/**
 * Called when the login request fails.
 *
 * @param {Map} state
 * @param {Object} action
 * @returns {Map}
 */
export function handleLoginFailure(state, action) {
  return state.set('session', fromJS({ errorMessage: action.error }));
}

/**
 * Called when the user is logged out.
 *
 * @param {Map} state
 * @param {Object} action
 * @returns {Map}
 */
export function handleLogout(state, action) {
  removeSession();
  removeUser();

  return state
    .delete('session')
    .delete('user')
    .set('isAuthenticated', false);
}

/**
 * Called when a load request is initiated.
 *
 * @param {Map} state
 * @param {Object} action
 * @returns {Map}
 */
export function handleUserLoadRequest(state, action) {
  return state.set('user', fromJS({ isLoading: true }));
}

/**
 * Called when the load user is successful.
 *
 * @param {Map} state
 * @param {Object} action
 * @returns {Map}
 */
export function handleUserLoadSuccess(state, action) {
  if (action.response.status !== 200) {
    return handleUserLoadFailure(action, { error: action.data.message });
  }

  setUser(action.data);

  return state.set('user', fromJS(action.data));
}

/**
 * Called when a load request fails.
 *
 * @param {Map} state
 * @param {Object} action
 * @returns {Map}
 */
export function handleUserLoadFailure(state, action) {
  return state.set('user', fromJS({ errorMessage: action.error }));
}

export const authReducer = createReducer(initialState, {
  [AuthActionTypes.LOGIN_REQUEST]: handleLoginRequest,
  [AuthActionTypes.LOGIN_SUCCESS]: handleLoginSuccess,
  [AuthActionTypes.LOGIN_FAILURE]: handleLoginFailure,
  [AuthActionTypes.LOGOUT]: handleLogout,
  [AuthActionTypes.USER_LOAD_REQUEST]: handleUserLoadRequest,
  [AuthActionTypes.USER_LOAD_SUCCESS]: handleUserLoadSuccess,
  [AuthActionTypes.USER_LOAD_FAILURE]: handleUserLoadFailure
});
