import React, { Component } from 'react'; //React imports at the top
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { Col, Row } from 'reactstrap';

import firebase from 'firebase/app';  //Firebase imports second
import 'firebase/auth';
import 'firebase/database';

import constants from "./components/constants"; //Imports paths used for navigating between pages

import Welcome from "./components/Welcome";  //Imports for the different components
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import MyNav from "./components/Navbar";
import Profile from "./components/Profile";
import Categories from './components/CategoryMgmt';
import Content from "./components/Content";

import './App.css'; //CSS styling elements imported last

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      device: "Device 3"
    }
  }

  //Authenticates the firebase user when loading each component
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

  //Sign in the user through firebase
  handleSignIn(email, password) {
    this.setState({ errorMessage: null });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((err) => this.setState({ errorMessage: err.message }))
  }

  //Sign the user out of the application through firebase
  handleSignOut() {
    this.setState({ errorMessage: null });
    firebase.auth().signOut()
      .catch((err) => this.setState({ errorMessage: err.message }))
  }

  //Keeps track of the device the ACA is managing
  currentDevice(d) {
    this.setState({device: d});
    return d;
  }

  render() {
    // this is how you pass props to the components you render through the switch. pass props here, 
    //and use "render={renderComponentName}" in the switch
    let renderWelcome = (routerProps) => {
      return <Welcome {...routerProps} user={this.state.user} currDevice={this.state.device} device={(d) => this.currentDevice(d)} signInCallback={(email, password) => this.handleSignIn(email, password)}  />
    }
    let renderDashboard = (routerProps) => {
      return <Dashboard {...routerProps} currDevice={this.state.device} device={(d) => this.currentDevice(d)} user={this.state.user} />
    }
    let renderProfile = (routerProps) => {
      return <Profile {...routerProps} currDevice={this.state.device} device={(d) => this.currentDevice(d)} user={this.state.user} />
    }
    let renderCategories = (routerProps) => {
      return <Categories {...routerProps} currDevice={this.state.device} device={(d) => this.currentDevice(d)} user={this.state.user} />
    }
    let renderContent = (routerProps) => {
      return <Content {...routerProps} currDevice={this.state.device} device={(d) => this.currentDevice(d)} user={this.state.user}/>
    }
    
    return (
      <BrowserRouter>
        <Row>
          {this.state.user && <MyNav signOutCallback={() => this.handleSignOut()}/>}
          {this.state.user && <Header />}
          <Col>
            <div className="switch">  
              <Switch>
                <Route exact path={constants.routes.dashboard} render={renderDashboard} />
                <Route path={constants.routes.welcome} render={renderWelcome} />
                <Route path={constants.routes.profile} render={renderProfile} />
                <Route path={constants.routes.categories} render={renderCategories} />
                <Route path={constants.routes.content} render={renderContent} />
              </Switch>
            </div>
          </Col>
        </Row>  
      </BrowserRouter>
    )
  }
}

export default App;