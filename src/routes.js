import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { App } from './components/app/app';
import { HelloContainer } from './components/hello/hello';
import { NotFound } from './components/not-found/not-found';

import PlanetsContainer from './components/planets/container';

const RouteTypes = {
  planets: 'planets'
};

export const route = name => RouteTypes[name];

export default () => (
  <Route path="/" component={App}>
    <IndexRoute component={HelloContainer}/>
    <Route path={RouteTypes.planets} component={PlanetsContainer}/>
    <Route path="*" component={NotFound}/>
  </Route>
);

