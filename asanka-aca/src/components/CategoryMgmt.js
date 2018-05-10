import React from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {Label, Input, FormGroup} from 'reactstrap';

import constants from './constants';
import '../css/Content.css';
import CatOption from './AllCat';
import '../css/CatergoryMgmt.css';


export default class CategoryMgmt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID:undefined,
            categories: [],
            selections: [],
            options: [],
            currDevice: "",
        }
    }

    componentDidMount() {
        this.unregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                console.log(this.props.currDevice);
              this.setState({ user: firebaseUser, currDevice: this.props.currDevice});
            } else {
              this.setState({ user: null});
            }
          });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({refPathQ: nextProps.refPath});
    }

    componentWillUnmount() {
        this.unregisterFunction();
    }

    addOption(loc, input) {
        console.log(this.state.device);
       console.log("addOption");
       console.log(input);
       let path = "Categories/" + loc + "/" + input;
       let ref = firebase.database().ref(path);
       ref.set(input);
    }

    render() {
        return (
            <div id="ctgr">
                <div>
                    <h1>Manage Asanka Categories</h1>
                </div>
                <div>
                    <h2>Subjects</h2>
                    <CatOption refPath="Categories/Subjects"/>
                    <input id="sub-input"></input>
                    <button id="sub-btn" onClick={() => {this.addOption("Subjects", document.getElementById("sub-input").value)}}>Add Subject</button>
                </div>
                <div>
                    <h2>Teachers</h2>
                    <CatOption refPath="Categories/Teachers"/>
                    <input id="teach-input"></input>
                    <button id="teach-btn" onClick={() => this.addOption("Teachers", document.getElementById("teach-input").value)}>Add Teacher</button>
                </div>
            </div>
        )
    }
}