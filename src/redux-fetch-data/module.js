import { handleActions, createAction } from 'redux-actions';

const DONE_FETCHING = 'fetch-data/DONE_FETCHING';

const reducer = handleActions({
  [DONE_FETCHING]: state => {
    return { ...state, fetched: true };
  }
}, { fetched: false });

export const doneFetching = createAction(DONE_FETCHING);

export default reducer;
