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
            gradeSel: [],
            locSel: [],
            teachSel: [],
            selectedButton: "true",
            selected: [],
            size: "",
            timeCreated: "",
            disabledG: true,
            disabledT: false,
            disabledS: false,
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

    upload(storeLocation, setTime, setSize) {
        firebase.database().ref(storeLocation).set({
            title: this.state.title,
            description: this.state.description,
            date: this.state.date,
            active: this.state.selectedButton,
            file: this.state.file,
            size: setSize,
            timeCreated: setTime
        });
    }

    submitFile(evt) {
        evt.preventDefault();
        let devQuery = "";
        let queryList = [];

        let list = [];

        if(this.state.subSel.length === 0 && this.state.teachSel.length === 0) {
            this.state.devSel.forEach((device) => {
                console.log(device);
                queryList.push(device + "/Files/" + this.state.file.name);

            });
        }

        if(this.state.teachSel.length !== 0) {
            console.log("Teacher Only")
            this.state.devSel.forEach((device) => {
                this.state.teachSel.forEach((teacher) => {
                    console.log("for each teacher");
                    queryList.push(device + "/Folders/Teachers/Folders/" + teacher + "/Files/" + this.state.file.name);
                });
            });
        } else if(this.state.gradeSel.length === 0 && this.state.subSel.length !== 0) {
            console.log("Subject Only")
            this.state.devSel.forEach((device) => {
                this.state.subSel.forEach((subject) => {
                    queryList.push(device + "/Folders/" + subject + "/Files/" + this.state.file.name);
                });
            });
        } else if (this.state.gradeSel.length !== 0) {
            this.state.devSel.forEach((device) => {
                this.state.subSel.forEach((subject) => {
                    this.state.gradeSel.forEach((grade) => {
                        queryList.push(device + "/Folders/" + subject + "/Folders/" + grade + "/Files/" + this.state.file.name);                        
                    });
                });
            });
        }

        let teachers = this.state.teachSel.length;
        let locations = this.state.locSel.length;
        let subjects = this.state.subSel.length;
        let devices = this.state.devSel.length;

        console.log(teachers);
        console.log(locations);
        console.log(subjects);
        console.log(devices);

        let setTime;
        let setSize;

        console.log(queryList);
        queryList.forEach((storeLocation) => {
            console.log(storeLocation);
            var storeLocationClean = storeLocation.slice(0, -4);
            // let storage = firebase.storage().ref(storeLocation);
            let storage = firebase.storage().ref(storeLocationClean);
            let file = this.state.file;
            console.log(file);
            storage.put(file).then((snapshot) => {
                console.log(snapshot);
                console.log(snapshot.metadata);
                setSize = snapshot.metadata.size;
                setTime = snapshot.metadata.timeCreated;
                console.log(setTime);
                console.log(setSize);
                this.upload(storeLocationClean, setTime, setSize);
            });
        })
        
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
        this.setState({disabledT: !this.state.disabledT, disabledG: !this.state.disabledG})
        this.state.subSel.push(selection);
        console.log(this.state.subSel)
    }

    gradeSelect(selection) {
        //add selected subjects
        console.log(selection);
        // this.setState({disabledT: !this.state.disabledT})
        this.state.gradeSel.push(selection);
        console.log(this.state.gradeSel)
    }

    teachSelect(selection) {
        //add specific location
        console.log(selection);
        this.setState({disabledS: !this.state.disabledS})
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
            this.setState({disabledT: !this.state.disabledT, disabledG: !this.state.disabledG})
        } else if (value === "Teacher") {
            index = this.state.teachSel.indexOf(selected);
            this.state.devSel.splice(index, 1);
            this.setState({disabledS: !this.state.disabledS})
        } else if (value === "Grade") {
            index = this.state.gradeSel.indexOf(selected);
            this.state.gradeSel.splice(index, 1);
            // this.setState({disabledT: !this.state.disabledT})
        }
        console.log(this.state.devSel);
    }

    render() {
        return (
            <div>
                <div className='container fade-in'>
                    <h1 className="mb-4">Add New Content</h1>

                    <div>
                        <div className='form-group'>
                            <label className="form-title" htmlFor='FileTitle'>Title</label>
                            <input id='FileTitle' type='text'
                            className='form-control w-50' 
                            placeholder='Enter Document Title'
                            value={this.state.title}
                            onInput={evt => this.setState({title: evt.target.value})}/>
                        </div>
                        <div className='form-group'>
                            <label className="form-title" htmlFor='Date'>Date</label>
                            <input id="Date" type='date'
                            className='form-control w-50' 
                            placeholder='File Description'
                            value={this.state.date}
                            onInput={evt => this.setState({date: evt.target.value})}/>
                        </div>
                    </div>
                    <div className='form-group mb-4'>
                        <label className="form-title" htmlFor='Description'>Description</label>
                        <input id="Description" type='text'
                        className='form-control w-50 h-250'
                        placeholder='File Description'
                        value={this.state.description}
                        onInput={evt => this.setState({description: evt.target.value})}/>
                    </div>
                    <div className="form-group mb-4">
                        <label className="form-title" htmlFor='Active'>Active on Device?</label>
                        <FormGroup>
                            <FormGroup  className="mb-2" check>
                                <Label check>
                                    <Input type="radio" value="true" checked={this.state.selectedButton === "true"} onChange={(evt) => this.handleRB(evt)}/>{' '}
                                    True
                                </Label>
                            </FormGroup>
                            <FormGroup  className="mb-2" check>
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
                                    <div className="mb-4">
                                        <h2 className="">Select Device(s)</h2>
                                        <Categories uncheck={(e) => this.uncheck(e, "Device")} checkSelect={(e) => this.devSelect(e)} refPath="Categories/Devices/"/>
                                    </div>
                                    <div className="mb-4" id="subDiv">
                                        <h2>Select Subject(s)</h2>
                                        <div>
                                            <Categories id="subjects" disabled={this.state.disabledS} uncheck={(e) => this.uncheck(e, "Subject")} checkSelect={(e) => this.subSelect(e)} refPath="Categories/Subjects/"/>
                                        </div>

                                    </div>
                                    <div className="mb-4" id="subDiv">
                                        <h2>Select Grade Level(s)</h2>
                                        <div>
                                            <Categories id="grade" disabled={this.state.disabledG} uncheck={(e) => this.uncheck(e, "Grade")} checkSelect={(e) => this.gradeSelect(e)} refPath="Categories/Grade/"/>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h2>OR</h2>
                                    </div>
                                    <div className="mb-4">
                                        <h2>Select Teacher(s)</h2>
                                        <div>
                                            <Categories id="teachers" disabled={this.state.disabledT} uncheck={(e) => this.uncheck(e, "Teacher")} checkSelect={(e) => this.teachSelect(e)} refPath="Categories/Teachers/"/>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <input id="input" className="" type="file" onChange={(evt) => {this.storeFile(evt)}}/>
                                    </div>
                                    <button className="btn btn-lg btn-danger mr-2 mb-5" type="submit">Submit</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

