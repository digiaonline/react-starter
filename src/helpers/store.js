import { fromJS } from 'immutable';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import * as middlewares from '../state/middlewares';
import * as reducers from '../state/reducers';

/**
 *
 * @param {*} initialState
 * @param {Object} handlers
 * @returns {function}
 * @see http://redux.js.org/docs/recipes/ReducingBoilerplate.html
 */
export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

/**
 *
 * @param {Object} state
 * @returns {Object}
 */
export function hydrateState(state = {}) {
  return {
    ...state,
    auth: state.auth ? fromJS(state.auth) : undefined
  };
}

/**
 *
 * @param {Object} history
 * @param {Object} initialState
 * @returns {function}
 */
export function buildStore(history, initialState) {
  const rootReducer = combineReducers(reducers);
  const routerHistoryMiddleware = routerMiddleware(history);

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, routerHistoryMiddleware, ...middlewares)
  );
}
