import React from "react";
import { Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import constants from './constants';

export default class DeviceHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div>
                <div>
                <div class="row">
                    <div class="col-sm-3">
                        <div class="card">
                        <img class="card-img-top" src="./imgs/AsankaBackground.png" alt="Card image cap"/>
                        <div class="card-body">
                            <h5 class="card-title">Personal Files</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-danger">Cloud Account</a>
                        </div>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="card">
                        <img class="card-img-top" src="./imgs/Asanka-logo.png" alt="Card image cap"/>
                        <div class="card-body">
                            <h5 class="card-title">Free Resources</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-danger">Free Resources</a>
                        </div>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="card">
                        <img class="card-img-top" src="./imgs/AsankaBackground.png" alt="Card image cap"/>
                        <div class="card-body">
                            <h5 class="card-title">GES Content</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-danger">GES Content</a>
                        </div>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="card">
                            <img class="card-img-top" src="./imgs/Asanka-logo.png" alt="Card image cap"/>
                        <div class="card-body">
                            <h5 class="card-title">Interactive Games</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-danger">Interactive Games</a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}