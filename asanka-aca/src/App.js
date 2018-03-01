import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import constants from "./components/constants";
import { Col, Row } from 'reactstrap';
import Welcome from "./components/Welcome";
import Dashboard from "./components/Dashboard";
import MyNav from "./components/Navbar";
import Profile from "./components/Profile";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


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
    this.setState({ errorMessage: null });
    firebase.auth().signOut()
      .catch((err) => this.setState({ errorMessage: err.message }))
  }

  render() {
    // this is how you pass props to the components you render through the switch. pass props here, 
    //and use "render={renderComponentName}" in the switch
    let renderWelcome = (routerProps) => {
      return <Welcome {...routerProps} user={this.state.user} signInCallback={(email, password) => this.handleSignIn(email, password)}  />
    }
    let renderDashboard = (routerProps) => {
      return <Dashboard {...routerProps} user={this.state.user} />
    }
    let renderProfile = (routerProps) => {
      return <Profile {...routerProps} user={this.state.user} />
    }
    console.log(this.state.user);      
    
    return (
      <div className="App">
        <BrowserRouter>
          <Row>
            {this.state.user && <MyNav signOutCallback={() => this.handleSignOut()}/>}
            <Col>  
              <Switch>
                <Route exact path={constants.routes.dashboard} render={renderDashboard}/>
                <Route path={constants.routes.welcome} render={renderWelcome} />
                <Route path={constants.routes.profile} render={renderProfile} />
              </Switch>
            </Col>
          </Row>  
        </BrowserRouter>
      </div>
    );
  }
}

export default App;