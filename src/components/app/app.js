import React from 'react';
import Helmet from 'react-helmet';

export const App = ({ children }) => (
  <div className="app">
    <Helmet title="React starter"
            meta={[{ name: 'description', content: 'React starter template' }]}/>
    {children}
  </div>
);
