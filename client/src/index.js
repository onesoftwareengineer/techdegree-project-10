import React from 'react';
import ReactDOM from 'react-dom';

import './styles/global.css';

import App from './App';
//import context provider for whole app
import { Provider } from './Context';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);