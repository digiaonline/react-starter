import { combineReducers, applyMiddleware, createStore } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import apiMiddleware from '../middleware/api';
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
 * @returns {function}
 */
export function buildStore() {
  const rootReducer = combineReducers(reducers);
  const routerHistoryMiddleware = routerMiddleware(browserHistory);

  return applyMiddleware(thunk, apiMiddleware, routerHistoryMiddleware)(createStore)(rootReducer);
}
