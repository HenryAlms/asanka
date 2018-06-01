import React from "react";
import { Redirect, Link } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import constants from './constants';

import "../css/device.css"

export default class DeviceHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        }
    }

    componentDidMount() {
        this.unregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) { //someone logged in!
                this.setState({ user: firebaseUser });
            } else { //someone logged out
                this.setState({ user: null });
            }
        });
    }

    componentWillUnmount() {
        this.unregisterFunction();
    }

    render() {
        return (
            <div className="fade-in">
                {!this.props.user && <Redirect to={constants.routes.welcome} />}
                <div className="row" id="welcome">
                    <div className="message">
                        <strong>Hello Henry Alms, </strong> What would you like to learn today?
                    </div>
                </div>
                <div className="background container">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="card">
                                <img className="card-img-top" src="./imgs/AsankaBackground.jpg" alt="background" />
                                <div className="card-body">
                                    <h5 className="card-title">Personal Files</h5>
                                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <Link to={constants.routes.aca}><a href="/" className="btn btn-danger">Cloud Account</a></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card">
                                <img className="card-img-top" src="./imgs/openEdRes.jpg" alt="eduResources" />
                                <div className="card-body">
                                    <h5 className="card-title">Free Resources</h5>
                                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="/" className="btn btn-danger">Free Resources</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card">
                                <img className="card-img-top" id="ges" src="./imgs/ges.png" alt="eduCurriculum" />
                                <div className="card-body">
                                    <h5 className="card-title">GES Content</h5>
                                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="/" className="btn btn-danger">GES Content</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="card">
                                <img className="card-img-top" src="./imgs/Baaba Game.png" alt="Games" />
                                <div className="card-body">
                                    <h5 className="card-title">Interactive Games</h5>
                                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="/" className="btn btn-danger">Interactive Games</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}