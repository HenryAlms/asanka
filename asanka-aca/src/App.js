import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import constants from "./components/constants";

import Welcome from "./components/Welcome";
// import SignUp from "./components/SignUp";
// import Messages from "./components/Messages";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Messenger</h1>
        </header>

        <BrowserRouter>
          <Switch>
            <Route exact path={constants.routes.welcome} component={Welcome}/>
            {/* <Route path={constants.routes.signup} component={SignUp}/>
            <Route path={constants.routes.messages} component={Messages}/> */}
            <Redirect to={constants.routes.welcome}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;