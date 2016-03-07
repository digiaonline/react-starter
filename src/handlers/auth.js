/*eslint no-unused-vars: 0*/

import { setAccessToken, setRefreshToken, removeAccessToken, removeRefreshToken } from '../helpers/auth';
import { AuthActionTypes } from '../actions/auth';

export function handleLoginRequest(state, action) {
  return state
    .set('isLoading', true)
    .delete('errorMessage');
}

export function handleLoginSuccess(state, action) {
  if (action.response.status !== 200) {
    return state
      .set('isLoading', false)
      .set('isAuthenticated', false)
      .set('errorMessage', action.data.message)
      .delete('accessToken')
      .delete('refreshToken');
  }

  setAccessToken(action.data.access_token);
  setRefreshToken(action.data.refresh_token);

  return state
    .set('isLoading', false)
    .set('isAuthenticated', true)
    .set('accessToken', action.data.access_token)
    .set('refreshToken', action.data.refresh_token);
}

export function handleLoginFailure(state, action) {
  return handleLogout(state, action);
}

export function handleLogout(state, action) {
  removeAccessToken();
  removeRefreshToken();

  return state
    .set('isLoading', false)
    .set('isAuthenticated', false)
    .set('errorMessage', action.error)
    .delete('accessToken')
    .delete('refreshToken');
}

export const handlers = {
  [AuthActionTypes.LOGIN_REQUEST]: handleLoginRequest,
  [AuthActionTypes.LOGIN_SUCCESS]: handleLoginSuccess,
  [AuthActionTypes.LOGIN_FAILURE]: handleLoginFailure,
  [AuthActionTypes.LOGOUT]: handleLogout
};
