import React from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {Label, Input, FormGroup} from 'reactstrap';

import constants from './constants';
import '../css/Content.css';
import Categories from './Categories';


export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: "",
            title: "",
            date: "",
            description:"",
            active:"true",
            file: "",
            currentDev: this.props.device,
            query: null,
            devSel: [],
            subSel: [],
            locSel: [],
            teachSel: [],
            selectedButton: "true",
            selected: []
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

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.title);
        console.log(nextProps);
        this.setState({title: nextProps.title});
        console.log(this.state.title);

    }

    componentWillUnmount() {
        this.unregisterFunction();
    }

    logOff() {
        firebase.auth().signOut()
            .then(this.props.history.push(constants.routes.welcome))
            .catch(err => window.alert(err));
    }

    storeFile(evt) {
        evt.preventDefault();
        this.setState({file: evt.target.files[0]});
    }

    submitFile(evt) {
        evt.preventDefault();
        let query = "";
        let queryList = [];

        let list = [];

        this.state.devSel.forEach((device) => {
            //hi
        });

        let teachers = this.state.teachSel.length;
        let locations = this.state.locSel.length;
        let subjects = this.state.subSel.length;
        let devices = this.state.devSel.length;

        list.push(teachers);
        list.push(locations);
        list.push(subjects);
        list.push(devices);

        console.log(Math.max(...list));


        let queries = teachers + locations + subjects + devices;
        

        for(let i = 0; i < queries; i++) {
            queryList.push("query");
        }

        // if(this.state.devSel.length != 0) {
        //     this.state.devSel.forEach((device) => {
        //         queryList[]
        //     }
        
        // this.state.devSel.forEach();
        // if(this.state.teachSel.length !== 0) {

        // }
        // if(this.state.devSel.length != 0) {
        //     this.state.devSel.forEach((device) => {
        //         if(this.state.subSel !== 0) {
        //                 this.state.subSel.forEach( (subject) => (
                            
        //                 )

        //                 )
        // }
        //     })
        // }
        console.log(queryList);
        firebase.database().ref(this.state.query + "/" + this.state.title).set({
            title: this.state.title,
            description: this.state.description,
            date: this.state.date,
            active: this.state.selectedButton,
            file: this.state.file
        });
        let storage = firebase.storage().ref(this.state.query + "/" + this.state.title);
        let file = this.state.file;
        storage.put(file);
    }

    handleRB(evt) {
        this.setState({selectedButton: evt.target.value});
    }

    devSelect(selection) {
        //add selected devices
        console.log(selection);
        this.state.devSel.push(selection);
        console.log(this.state.devSel);
    }

    subSelect(selection) {
        //add selected subjects
        console.log(selection);
        this.state.subSel.push(selection);
        console.log(this.state.subSel)
    }

    locSelect(selection) {
        //add specific location
        console.log(selection);
        this.state.locSel.push(selection);
        console.log(this.state.locSel)
    }

    teachSelect(selection) {
        //add specific location
        console.log(selection);
        this.state.teachSel.push(selection);
        console.log(this.state.teachSel)
    }

    uncheck(selected, value) {
        console.log(value);
        console.log(selected);
        let index = "";
        if(value == "Device") {
            index = this.state.devSel.indexOf(selected);
            this.state.devSel.splice(index, 1);
        } else if (value === "Subject") {
            index = this.state.subSel.indexOf(selected);
            this.state.devSel.splice(index, 1);
        } else if (value === "Location") {
            index = this.state.locSel.indexOf(selected);
            this.state.devSel.splice(index, 1);
        } else if (value === "Teacher") {
            index = this.state.teachSel.indexOf(selected);
            this.state.devSel.splice(index, 1);
        }
        console.log(this.state.devSel);
    }


    render() {
        
        return (
            <div>
                <div className='container'>
                    <div className='form-group'>
                        <label className="form-title" htmlFor='FileTitle'>Title:</label>
                        <input id='FileTitle' type='text'
                        className='form-control' 
                        placeholder='Enter Document Title'
                        value={this.state.title}
                        onInput={evt => this.setState({title: evt.target.value})}/>
                    </div>
                    <div className='form-group'>
                        <label className="form-title" htmlFor='Date'>Date:</label>
                        <input id="Date" type='date'
                        className='form-control' 
                        placeholder='File Description'
                        value={this.state.date}
                        onInput={evt => this.setState({date: evt.target.value})}/>
                    </div>
                    <div className='form-group'>
                        <label className="form-title" htmlFor='Description'>Description:</label>
                        <input id="Description" type='text'
                        className='form-control' 
                        placeholder='File Description'
                        value={this.state.description}
                        onInput={evt => this.setState({description: evt.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label className="form-title" htmlFor='Active'>Active on Device:</label>
                        <FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" value="true" checked={this.state.selectedButton === "true"} onChange={(evt) => this.handleRB(evt)}/>{' '}
                                    True
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" value="false" checked={this.state.selectedButton === "false"} onChange={(evt) => this.handleRB(evt)}/>{' '} 
                                    False
                                </Label>
                            </FormGroup>
                        </FormGroup>
                    </div>
                    <div className="dropGroup">
                        <div>
                            <div>
                                <form onSubmit={(e) => this.submitFile(e)}>
                                    <div>
                                        Devices:
                                        <Categories uncheck={(e) => this.uncheck(e, "Device")} checkSelect={(e) => this.devSelect(e)} refPath="Categories/Devices/"/>
                                    </div>
                                    <div>
                                        Subjects:
                                        <Categories uncheck={(e) => this.uncheck(e, "Subject")} checkSelect={(e) => this.subSelect(e)} refPath="Categories/Subjects/"/>
                                    </div>
                                    <div>
                                        Teachers:
                                        <Categories uncheck={(e) => this.uncheck(e, "Teacher")} checkSelect={(e) => this.teachSelect(e)} refPath="Categories/Teachers/"/>
                                    </div>
                                    
                                    <div>
                                        <button type="submit">Submit</button>
                                        <input id="input" className="mr-auto" type="file" onChange={(evt) => {this.storeFile(evt)}}/>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}