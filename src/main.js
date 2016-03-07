/*eslint no-undef: 0*/

import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { buildStore } from './helpers/store';
import { requireAuth, requireGuest } from './helpers/auth';
import { AppContainer } from './components/app/app';
import { LoginContainer } from './components/login/login';
import { LogoutContainer } from './components/logout/logout';
import { Hello } from './components/hello/hello';
import { NotFound } from './components/not-found/not-found';
import './main.scss';

const store = buildStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={Hello} onEnter={requireAuth}/>
        <Route path="login" component={LoginContainer} onEnter={requireGuest}/>
        <Route path="logout" component={LogoutContainer} onEnter={requireAuth}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
