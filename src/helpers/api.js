/*eslint consistent-return: 0*/
/*eslint no-undef: 0*/

import { forEach, isUndefined } from 'lodash';
import { push } from 'react-router-redux';
import { getIsAuthenticated, getAccessToken, getRefreshToken } from './auth';
import { defer } from './promise';
import { refreshSuccess } from '../state/actions/auth';

if (isUndefined(global.API_URL)) {
  global.API_URL = '//api.example.com/v1';
}

if (isUndefined(global.LOGIN_URL)) {
  global.LOGIN_URL = 'auth/login';
}

if (isUndefined(global.REFRESH_URL)) {
  global.REFRESH_URL = 'auth/refresh';
}

if (isUndefined(global.LOGOUT_ROUTE)) {
  global.LOGOUT_ROUTE = '/logout';
}

/**
 *
 * @param {string} url
 * @param {Object} init
 * @param {function} dispatch
 * @returns {Promise}
 */
export function fetchFromApi(url, init, dispatch) {
  const deferred = defer();
  const request = buildRequest(url, init);

  fetch(request)
    .then(response => handleResponse(deferred, request, response, dispatch))
    .catch(err => deferred.reject(err));

  return deferred.promise;
}

/**
 *
 * @param {Object} deferred
 * @param {Request} request
 * @param {Object} response
 * @param {function} dispatch
 * @returns {*}
 */
export function handleResponse(deferred, request, response, dispatch) {
  switch (response.status) {
    case 401:
      return handleAccessDenied(deferred, request, response, dispatch);

    case 403:
      return handleForbidden(deferred, response, dispatch);

    case 200:
    default:
      return handleOk(deferred, response);
  }
}

/**
 *
 * @param {Object} deferred
 * @param {Request} request
 * @param {Object} response
 * @param {function} dispatch
 * @returns {*}
 */
export function handleAccessDenied(deferred, request, response, dispatch) {
  if (response.url === buildApiUrl(LOGIN_URL)) {
    // Login failed
    deferred.resolve(response);
  }

  // Access token has expired
  const refreshToken = getRefreshToken();

  if (refreshToken) {
    return refresh(refreshToken, dispatch)
      .then(result => {
        dispatch(refreshSuccess(result));
        // Retry the original request
        fetch(request).then(res => deferred.resolve(res));
      });
  }

  return deferred.reject();
}

/**
 *
 * @param {Object} deferred
 * @param {Object} response
 * @param {function} dispatch
 * @returns {*}
 */
export function handleForbidden(deferred, response, dispatch) {
  if (response.url === buildApiUrl(REFRESH_URL)) {
    // Refresh token has expired, log out the user
    dispatch(push(LOGOUT_ROUTE));
  }

  return deferred.resolve(response);
}

/**
 *
 * @param {Object} deferred
 * @param {Object} response
 */
export function handleOk(deferred, response) {
  return deferred.resolve(response);
}

/**
 *
 * @param {string} url
 * @param {Object} init
 * @returns {Request}
 */
export function buildRequest(url, init) {
  const request = new Request(buildApiUrl(url), { ...init, mode: 'cors' });

  request.headers.set('Accept', 'application/json');

  if (getIsAuthenticated()) {
    request.headers.set('Authorization', `Bearer ${getAccessToken()}`);
  }

  return request;
}

/**
 *
 * @param {string} token
 * @param {function} dispatch
 * @returns {Promise}
 */
function refresh(token, dispatch) {
  return new Promise((resolve, reject) => {
    const form = new FormData();

    form.append('grant_type', 'refresh_token');
    form.append('client_id', OAUTH_CLIENT_ID);
    form.append('client_secret', OAUTH_CLIENT_SECRET);
    form.append('refresh_token', token);

    fetchFromApi('auth/refresh', { method: 'POST', body: form }, dispatch)
      .then(response => response.status === 200
        ? response.json().then(data => resolve({ response, data }))
        : reject(response))
      .catch(err => reject(err));
  });
}

/**
 *
 * @param {Object} query
 * @returns {string}
 */
export function buildQueryString(query) {
  const pairs = [];

  forEach(query, (value, key) => {
    pairs.push([key, value].join('='));
  });

  return pairs.length ? '?' + pairs.join('&') : '';
}

/**
 *
 * @param {string} url
 * @returns {string}
 */
function buildApiUrl(url) {
  return [API_URL, url].join('/');
}
