/*eslint no-undef: 0*/

import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { buildStore } from './helpers/store';
import { requireAuth, requireGuest } from './helpers/auth';
import { App } from './components/app/app';
import { LoginContainer } from './components/login/login';
import { LogoutContainer } from './components/logout/logout';
import { Hello } from './components/hello/hello';
import { NotFound } from './components/not-found/not-found';
import './main.scss';

const store = buildStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Hello}/>
        <Route path="login" component={LoginContainer} onEnter={requireGuest}/>
        <Route path="logout" component={LogoutContainer} onEnter={requireAuth}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
