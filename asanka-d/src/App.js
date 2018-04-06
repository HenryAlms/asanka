import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import constants from "./components/constants";
import { Col, Row } from 'reactstrap';
import Welcome from "./components/homepage";
import DeviceHome from './components/devicehome'
import Header from "./components/header";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import ACA from "./components/aca.js";


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
    let renderACA = (routerProps) => {
      return <ACA {...routerProps} user={this.state.user} />
    }

    // this is how you pass props to the components you render through the switch. pass props here, 
    //and use "render={renderComponentName}" in the switch
    let renderWelcome = (routerProps) => {
      return <Welcome {...routerProps} user={this.state.user} signInCallback={(email, password) => this.handleSignIn(email, password)}  />
    }
    let renderDevice = (routerProps) => {
      return <DeviceHome {...routerProps} user={this.state.user} />
    }
    // let renderProfile = (routerProps) => {
    //   return <Profile {...routerProps} user={this.state.user} />
    // }
    // let renderUsers = (routerProps) => {
    //   return <Users {...routerProps} user={this.state.user} />
    // }
    // let renderDevices = (routerProps) => {
    //   return <Devices {...routerProps} user={this.state.user} />
    // }  
    // let renderContent = (routerProps) => {
    //   return <Content {...routerProps} user={this.state.user}/>
    // }
    // console.log(this.state.user);      
    
    return (
      <BrowserRouter>
        <Row>
          <Header />
          <Col>
            <div className="switch">  
              <Switch>
                {/*<Route path={constants.routes.welcome} render={renderWelcome} />*/}
                <Route path={constants.routes.welcome} render={renderWelcome} />
                <Route exact path={constants.routes.device} render={renderDevice} />
                <Route path={constants.routes.aca} render={renderACA} />
                {/* <Route exact path={constants.routes.dashboard} render={renderDashboard} />
                <Route path={constants.routes.welcome} render={renderWelcome} />
                <Route path={constants.routes.profile} render={renderProfile} />
                <Route path={constants.routes.users} render={renderUsers} />
                <Route path={constants.routes.devices} render={renderDevices} />
                <Route path={constants.routes.content} render={renderContent} /> */}
              </Switch>
            </div>  
          </Col>
        </Row>  
      </BrowserRouter>
    )
  }
}

export default App;