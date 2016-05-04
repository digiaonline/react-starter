/*eslint no-undef: 0*/

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import { buildStore } from './helpers/store';
import getRoutes from './routes';
import './main.scss';

const store = buildStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      {getRoutes()}
    </Router>
  </Provider>,
  document.getElementById('root')
);
