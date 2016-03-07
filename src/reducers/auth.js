import { Map } from 'immutable';
import { createReducer } from '../helpers/store';
import { handlers } from '../handlers/auth';
import { getAccessToken, getRefreshToken, getIsAuthenticated } from '../helpers/auth';

const initialState = Map({
  accessToken: getAccessToken(),
  refreshToken: getRefreshToken(),
  isAuthenticated: getIsAuthenticated()
});

export const authReducer = createReducer(initialState, handlers);
