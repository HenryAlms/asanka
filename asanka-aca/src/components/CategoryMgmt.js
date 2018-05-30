import React from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {Label, Input, FormGroup, Button} from 'reactstrap';

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
            <div id="ctgr" className="fade-in">
                <div>
                    <h1>Manage Categories</h1>
                </div>
                <div className="row mt-4">
                    <div className="col-md-4 col-sm-12 mb-5">
                        <h2 className="mt-3 mb-2 cat-title">Subjects</h2>
                        <CatOption refPath="Categories/Subjects"/>
                        <Input className="my-3 w-75" id="sub-input"></Input>
                        <Button color="danger" className="mt-2" id="sub-btn" onClick={() => this.addOption("Subjects", document.getElementById("sub-input").value)}>Add Teacher</Button>
                    </div>
                    <div className="col-md-4 col-sm-12 mb-5">
                        <h2 className="mt-3 mb-2 cat-title">Teachers</h2>
                        <CatOption refPath="Categories/Teachers"/>
                        <Input className="my-3 w-75" id="teach-input"></Input>
                        <Button color="danger" className="mt-2" id="teach-btn" onClick={() => this.addOption("Teachers", document.getElementById("teach-input").value)}>Add Teacher</Button>
                    </div>
                    <div className="col-md-4 col-sm-12 mb-5">
                        <h2 className="mt-3 mb-2 cat-title">Grade Levels</h2>
                        <CatOption refPath="Categories/Grade"/>
                        <Input className="my-3 w-75" id="grade-input"></Input>
                        <Button color="danger" className="mt-2" id="grade-btn" onClick={() => this.addOption("Grades", document.getElementById("grade-input").value)}>Add Grade Level</Button>
                    </div>
                </div>
            </div>
        )
    }
}