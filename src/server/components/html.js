import React, { PropTypes } from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';

export const Html = ({ assets, component, initialState }) => {
  const content = component ? renderToString(component) : '';
  const head = Helmet.rewind();

  return (
    <html>
    <head>
      {head.base.toComponent()}
      {head.title.toComponent()}
      {head.meta.toComponent()}
      {head.link.toComponent()}
      {head.script.toComponent()}
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      {Object.keys(assets.styles).map((style, i) =>
        <link href={assets.styles[style]} key={i} media="screen, projection" rel="stylesheet" type="text/css"/>)}
    </head>
    <body>
    <div id="root" dangerouslySetInnerHTML={{ __html: content }}></div>
    {<script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${JSON.stringify(initialState)};` }}
             charSet="UTF-8"></script>}
    {Object.keys(assets.javascript).map((script, i) => <script src={assets.javascript[script]} key={i}></script>)}
    </body>
    </html>
  );
};

Html.propTypes = {
  assets: PropTypes.object.isRequired,
  component: PropTypes.object.isRequired,
  initialState: PropTypes.object.isRequired
};
