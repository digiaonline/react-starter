/*eslint no-undef: 0*/

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { fetchDataOnServer, FetchData } from '../../state/modules/fetch-data';
import createHistory from 'react-router/lib/createMemoryHistory';

import { buildStore } from '../../helpers/store';
import getRoutes from '../../routes';

import { Html } from '../components/html';

/**
 * Express middleware that handles server-side rendering.
 *
 * @param {Object} isomorphicTools
 */
const renderMiddleware = isomorphicTools => (req, res) => {
  if (__DEVELOPMENT__) {
    isomorphicTools.refresh();
  }

  const memoryHistory = createHistory(req.originalUrl);
  const store = buildStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({ routes: getRoutes(), location: req.url, history }, (err, redirect, renderProps) => {
    fetchDataOnServer(renderProps, store).then(() => {
      if (err) {
        res.status(500).send(err.message);
      } else if (redirect) {
        res.redirect(redirect.pathname + redirect.search);
      } else if (renderProps) {
        const component = (
          <Provider store={store} key="provider">
            <FetchData {...renderProps}/>
          </Provider>
        );

        const renderedHtml = renderToString(<Html assets={isomorphicTools.assets()}
                                                  component={component}
                                                  initialState={store.getState()}/>);

        // Send the rendered page back to the client
        res.status(200).send(`<!doctype html>${renderedHtml}`);
      } else {
        res.status(404).send('Not found.');
      }
    });
  });
};

export default renderMiddleware;
