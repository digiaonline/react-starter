import React from 'react';
import {render} from 'react-dom';

import './main.scss';

const App = () => (
  <div>Hello from React!</div>
);

render(
  <App />,
  document.getElementById('root')
);
