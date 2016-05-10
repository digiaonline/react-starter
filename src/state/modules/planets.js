import { fromJS } from 'immutable';
import { find } from 'lodash';
import { createAction, handleActions } from 'redux-actions';
import { fetchPlanets } from '../../helpers/swapi';

const LOAD_DATA = 'planets/LOAD_DATA';
const FETCH_DATA = 'planets/FETCH_DATA';

export function handleLoadData(state) {
  return state.set('loading', true);
}

export function handleFetchData(state, action) {
  return state
    .update('data', data => {
      const newData = data.toJS();
      action.payload.data.results.filter(item => !find(newData, item)).map(item => {
        newData.push(item);
      });
      return fromJS(newData);
    })
    .delete('loading');
}

const defaultState = fromJS({
  data: []
});

const reducer = handleActions({
  [LOAD_DATA]: handleLoadData,
  [FETCH_DATA]: handleFetchData
}, defaultState);

export const loadData = createAction(LOAD_DATA);
export const fetchData = createAction(FETCH_DATA, fetchPlanets);

export default reducer;
