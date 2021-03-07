import React from 'react';
import ReactDOM from 'react-dom';

// need to run firebase in the beginning of our application
import firebase from './api/firebase';

import Routes from './routes';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
