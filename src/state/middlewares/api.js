/*eslint consistent-return: 0*/

/**
 *
 * @param {function} dispatch
 * @param {function} getState
 * @returns {Promise}
 */
export default function apiMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      types,
      callApi,
      shouldCallApi = () => true,
      payload = {}
    } = action;

    if (!types) {
      // Normal action: pass it on
      return next(action);
    }

    if (!Array.isArray(types) || types.length !== 3 || !types.every(type => typeof type === 'string')) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callApi !== 'function') {
      throw new Error('Expected `callApi` to be a function.');
    }

    if (!shouldCallApi(getState())) {
      return;
    }

    const [ requestType, successType, failureType ] = types;

    dispatch({ ...payload, type: requestType });

    return callApi(dispatch).then(
      response => {
        response.json().then(
          data => dispatch({ ...payload, response, data, type: successType })
        );
      },
      error => dispatch({ ...payload, error, type: failureType })
    );
  };
}
