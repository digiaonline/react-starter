import { combineReducers, applyMiddleware, createStore } from 'redux';
import { hashHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import apiMiddleware from '../middleware/api';
import { authReducer } from '../reducers/auth';

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
  const rootReducer = combineReducers({
    auth: authReducer,
    routing: routerReducer
  });

  const routerHistoryMiddleware = routerMiddleware(hashHistory);

  return applyMiddleware(thunk, apiMiddleware, routerHistoryMiddleware)(createStore)(rootReducer);
}
