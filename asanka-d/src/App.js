import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import constants from "./components/constants";

import Welcome from "./components/homepage";
import DeviceHome from './components/devicehome'
import Header from "./components/header";
import ACA from "./components/aca.js";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this.unregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        this.setState({ user: firebaseUser, loading: false });
      }
      else {
        this.setState({ user: null, loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.unregisterFunction();
  }

  handleSignIn(email, password) {
    this.setState({ errorMessage: null });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((err) => this.setState({ errorMessage: err.message }))
  }

  handleSignOut() {
    firebase.auth().signOut()
      .catch((err) => this.setState({ user: null }))
  }

  render() {
    let renderACA = (routerProps) => {
      return <ACA {...routerProps} user={this.state.user} />
    }

    // this is how you pass props to the components you render through the switch. pass props here, 
    //and use "render={renderComponentName}" in the switch
    let renderWelcome = (routerProps) => {
      return <Welcome {...routerProps} user={this.state.user} signInCallback={(email, password) => this.handleSignIn(email, password)} />
    }
    let renderDevice = (routerProps) => {
      return <DeviceHome {...routerProps} user={this.state.user} />
    }

    return (
      <BrowserRouter>
        <Row>
          {this.state.user && <Header handleSignOut={() => this.handleSignOut()} />}
          <Col>
            <div className="switch">
              <Switch>
                <Route exact path={constants.routes.welcome} render={renderWelcome} />
                <Route path={constants.routes.device} render={renderDevice} />
                <Route path={constants.routes.aca} render={renderACA} />
              </Switch>
            </div>
          </Col>
        </Row>
      </BrowserRouter>
    )
  }
}

export default App;