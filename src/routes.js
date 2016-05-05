import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { requireAuth, requireGuest } from './helpers/auth';

import { App } from './components/app/app';
import { HelloContainer } from './components/hello/hello';
import { LoginContainer } from './components/login/login';
import { LogoutContainer } from './components/logout/logout';
import { NotFound } from './components/not-found/not-found';

export default () => (
  <Route path="/" component={App}>
    <IndexRoute component={HelloContainer}/>
    <Route path="login" component={LoginContainer} onEnter={requireGuest}/>
    <Route path="logout" component={LogoutContainer} onEnter={requireAuth}/>
    <Route path="*" component={NotFound}/>
  </Route>
);

