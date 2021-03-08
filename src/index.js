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

// Adds an observer for changes to the user's sign-in state
// this Subscription (user state) will run when browser runs for the first time
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log(user.email);
    console.log(user.uid); // user id
  } else {
    console.log('no user');
  }
});

// This will run when user sign in & sign out
