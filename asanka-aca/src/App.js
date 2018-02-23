import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Welcome from './components/Welcome';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: undefined,
      email: "test1@example.com",
      password: "password",
      displayName: "test",
    }
  }

  componentDidMount() {
    this.authUnsub = firebase.auth().onAuthStateChanged(user => {
      this.setState({userID: user});
    });
  }
  componentWillUnmount() {
    this.authUnsub();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Messenger</h1>
        </header>
        <p className="App-intro">
          Double click to select the message channel you wish to engage with.
        </p>

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Welcome}/>
            {/* <Route path="/signup" component={SignUp}/>
            <Route path="/home" component={Home}/> */}
          </Switch>
        </BrowserRouter>

      </div>
      
    );
  }
}

export default App;
