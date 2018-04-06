import React, {Component} from 'react';
import logo from './logo.svg';
import './css/App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {} from "reactstrap";
import './components/AsankaCloudPage.js';


class App extends Component {
  render() {
    let renderAsankaCloud = (routerProps) => {
      return <AsankaCloud {...routerProps} />
    }
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">ASANKA</h1>
          </header>
          <p className="App-intro">
            Home Page
          </p>
        </div>
        <Switch>
          <Route exact path="/" render={renderAsankaCloud} />
        </Switch>  
      </BrowserRouter>  
    );
  }
}

export default App;
