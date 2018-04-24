import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import constants from "./components/constants";
import { Col, Row } from 'reactstrap';
import Welcome from "./components/Welcome";
import Dashboard from "./components/Dashboard";
import MyNav from "./components/Navbar";
import Profile from "./components/Profile";
import Users from "./components/Users";
import Devices from "./components/Devices";
import Header from "./components/Header";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Content from "./components/Content";
import Categories from './components/DeviceCat';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      device: "Choose A Device"
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

  currentDevice(d) {
    this.setState({device: d})
    // console.log(d);
  }

  render() {
    // this is how you pass props to the components you render through the switch. pass props here, 
    //and use "render={renderComponentName}" in the switch
    let renderWelcome = (routerProps) => {
      return <Welcome {...routerProps} user={this.state.user} device={(d) => this.currentDevice(d)} signInCallback={(email, password) => this.handleSignIn(email, password)}  />
    }
    let renderDashboard = (routerProps) => {
      return <Dashboard {...routerProps} device={(d) => this.currentDevice(d)} user={this.state.user} />
    }
    let renderProfile = (routerProps) => {
      return <Profile {...routerProps} device={(d) => this.currentDevice(d)} user={this.state.user} />
    }
    let renderUsers = (routerProps) => {
      return <Users {...routerProps} device={(d) => this.currentDevice(d)} user={this.state.user} />
    }
    let renderCategories = (routerProps) => {
      return <Categories {...routerProps} device={(d) => this.currentDevice(d)} user={this.state.user} />
    }
    let renderDevices = (routerProps) => {
      return <Devices {...routerProps} device={(d) => this.currentDevice(d)} user={this.state.user} />
    }  
    let renderContent = (routerProps) => {
      return <Content {...routerProps} device={(d) => this.currentDevice(d)} user={this.state.user}/>
    }
    // console.log(this.state.user);      
    
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
                <Route path={constants.routes.users} render={renderUsers} />
                <Route path={constants.routes.categories} render={renderCategories} />
                <Route path={constants.routes.devices} render={renderDevices} />
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