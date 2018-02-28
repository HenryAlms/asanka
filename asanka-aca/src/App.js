import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import constants from "./components/constants";

import Welcome from "./components/Welcome";
import Content from './components/Content';
import Profile from "./components/Profile";
// import Messages from "./components/Messages";

class App extends Component {
  render() {
    return (
      <div className="App">

        <BrowserRouter>
          <Switch>
            <Route exact path={constants.routes.welcome} component={Welcome}/>
            {/* <Route path={constants.routes.dashboard} component={Dashboard}/> */}
            <Route path={constants.routes.content} component={Content}/>
            <Route path={constants.routes.profile} component={Profile}/>
            {/* <Redirect to={constants.routes.welcome}/> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;