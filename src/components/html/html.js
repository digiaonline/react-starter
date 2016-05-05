import React, { PropTypes } from 'react';
import { renderToString } from 'react-dom/server';

export const Html = ({ assets, component, initialState }) => (
  <html>
  <head>
    <meta charSet="utf-8"/>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="description" content="React starter template"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>React starter</title>
    {Object.keys(assets.styles).map((style, i) =>
      <link href={assets.styles[style]} key={i} media="screen, projection" rel="stylesheet" type="text/css"/>)}
  </head>
  <body>
  <div id="root" dangerouslySetInnerHTML={{ __html: renderToString(component) }}></div>
  {<script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${JSON.stringify(initialState)};` }}
          charSet="UTF-8"></script>}
  {Object.keys(assets.javascript).map((script, i) => <script src={assets.javascript[script]} key={i}></script>)}
  </body>
  </html>
);

Html.propTypes = {
  assets: PropTypes.object.isRequired,
  component: PropTypes.object.isRequired,
  initialState: PropTypes.object.isRequired
};
