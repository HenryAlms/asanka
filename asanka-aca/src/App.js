import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import constants from "./components/constants";

import Welcome from "./components/Welcome";
import Dashboard from "./components/Dashboard";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //user info
    }
  }

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