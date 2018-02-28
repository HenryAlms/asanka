import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import constants from "./components/constants";

import Welcome from "./components/Welcome";
import Dashboard from "./components/Dashboard";
// import SignUp from "./components/SignUp";
// import Messages from "./components/Messages";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path={constants.routes.welcome} component={Welcome}/>
            <Route path={constants.routes.dashboard} component={Dashboard} />
            {/* <Redirect to={constants.routes.welcome}/> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;