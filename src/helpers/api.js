/*eslint consistent-return: 0*/
/*eslint no-undef: 0*/

import { forEach, isUndefined } from 'lodash';
import { push } from 'react-router-redux';
import { getIsAuthenticated, getAccessToken, getRefreshToken } from './auth';
import { refreshSuccess } from '../state/auth/actions';

if (isUndefined(API_URL)) {
  throw new Error('API_URL must be set.');
}

/**
 *
 * @param {string} url
 * @param {Object} init
 * @param {function} dispatch
 * @returns {Promise}
 */
export function fetchFromApi(url, init, dispatch) {
  return new Promise((resolve, reject) => {
    fetch(buildRequest(url, init))
      .then(response => {
        switch (response.status) {
          case 401:
            if (response.url === buildApiUrl('auth/login')) {
              // Login failed
              resolve(response);
            }

            // Access denied (Access token has expired)
            const refreshToken = getRefreshToken();

            if (refreshToken) {
              return refresh(refreshToken, dispatch)
                .then(result => {
                  dispatch(refreshSuccess(result));

                  fetch(buildRequest(url, init)).then(res => resolve(res));
                });
            }

            return reject();

          case 403:
            // Forbidden
            if (response.url === buildApiUrl('auth/refresh')) {
              // Refresh token has expired, log out the user
              dispatch(push('/logout'));
            }

            return resolve(response);

          default:
            // Ok
            return resolve(response);
        }
      })
      .catch(err => reject(err));
  });
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
