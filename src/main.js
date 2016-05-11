/*eslint no-undef: 0*/

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import { FetchData } from './redux-fetch-data/index';

import { buildStore, hydrateState } from './helpers/store';
import routes from './routes';
import './main.scss';

const initialState = hydrateState(window.__INITIAL_STATE__);
const store = buildStore(browserHistory, initialState);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store} key="provider">
    <Router onUpdate={() => window.scrollTo(0, 0)}
            render={props => <FetchData {...props}/>}
            history={history}
            routes={routes}/>
  </Provider>,
  document.getElementById('root')
);
