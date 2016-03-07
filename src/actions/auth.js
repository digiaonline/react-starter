/*eslint no-undef: 0*/

import { fetchFromApi } from '../helpers/api';

export const AuthActionTypes = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT'
};

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

export function refreshSuccess(result) {
  return { type: AuthActionTypes.LOGIN_SUCCESS, ...result };
}

export function logout() {
  return { type: AuthActionTypes.LOGOUT };
}
