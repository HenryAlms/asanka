import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var config = {
    apiKey: "AIzaSyBpnwl8afPChZ8Pha_hU1KfaeYbenQrrVA",
    authDomain: "asanka-aca.firebaseapp.com",
    databaseURL: "https://asanka-aca.firebaseio.com",
    projectId: "asanka-aca",
    storageBucket: "asanka-aca.appspot.com",
    messagingSenderId: "133622708380"
  };
  
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
