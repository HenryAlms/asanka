import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import constants from "./components/constants";

import Welcome from "./components/Welcome";

import Content from './components/Content';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Asanka</h1>
        </header>

        <BrowserRouter>
          <Switch>
            <Route exact path={constants.routes.welcome} component={Welcome}/>
            {/* <Route path={constants.routes.dashboard} component={Dashboard}/> */}
            <Route path={constants.routes.content} component={Content}/>
            {/* <Redirect to={constants.routes.welcome}/> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;