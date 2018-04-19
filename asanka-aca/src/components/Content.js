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
            query: null,
            devRef: "Choose A Device",
            devSel: [],
            subRef: "Choose A Subject",
            subSel: [],
            locRef: "Choose A Location",
            locSel: [],
            teachRef: "Choose A Teacher",
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

    componentWillUnmount() {
        this.unregisterFunction();
    }

    logOff() {
        firebase.auth().signOut()
            .then(this.props.history.push(constants.routes.welcome))
            .catch(err => window.alert(err));
    }

    storeFile(evt) {
        this.setState({file: evt.target.files[0]});
    }

    submitFile(evt) {
        console.log(this.state.file);
        let query = "";
        let queryList = [];

        let teachers = this.state.teachSel.length;
        let locations = this.state.locSel.length;
        let subjects = this.state.subSel.length;
        let devices = this.state.devSel.length;
        let queries = teachers + locations + subjects;

        

        for(let i = 0; i <= queries; i++) {
            queryList.push("query");
        }

        if(this.state.devSel.length != 0) {
            this.state.devSel.forEach((device) => {
                queryList[]
            }
        
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
                                <form onSubmit={() => this.submitFile()}>
                                    <div>
                                        Devices:
                                        <Categories uncheck={(e) => this.uncheck(e, "Device")} checkSelect={(e) => this.devSelect(e)} refPath={null}/>
                                    </div>
                                    <div>
                                        Subjects:
                                        <Categories uncheck={(e) => this.uncheck(e, "Subject")} checkSelect={(e) => this.subSelect(e)} refPath="Device3/Folders/"/>
                                    </div>
                                    <div>
                                        Folders:
                                        <Categories uncheck={(e) => this.uncheck(e, "Location")} checkSelect={(e) => this.locSelect(e)} refPath="Device3/Folders/English/"/>
                                    </div>
                                    <div>
                                        Teachers:
                                        <Categories uncheck={(e) => this.uncheck(e, "Teacher")} checkSelect={(e) => this.teachSelect(e)} refPath="Device3/Folders/English/Folders"/>
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

{/* <div className='dropdown form-group'>
                            <div>
                                <button id="input-b" className="btn btn-danger" onClick={(evt) => this.submitFile(evt)}>Submit File</button>
                                <input id="input" className="mr-auto" type="file" onChange={(evt) => {this.storeFile(evt)}}/>
                            </div>
                        </div> */}

// class CategoryList extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             userID:undefined,
//             categories: [],
//             selections: [],
//             refPathQ: this.props.refPath
//         }
//         this.handleClick = this.handleClick.bind(this);
//     }

//     componentDidMount() {
//         this.unregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
//             if (firebaseUser) {
//               this.setState({ user: firebaseUser, loading: false });
//               this.loadData(this.props.refPath);

//             }
//             else {
//               this.setState({ user: null, loading: false });
//             }
//           });
//     }

 {/* <div className="dropdown">
                                <button id="device" className="btn btn-danger dropdown-toggle my-3 mx-auto" type="button" data-toggle="dropdown">
                                {this.state.devRef}<span className="caret"></span></button>
                                <CategoryList refPath={null} handleChange={(e) => this.handleRefChange(e)}/>
                            </div>
                            <div className="dropdown">
                                <button id="subject" disabled className="btn btn-danger dropdown-toggle my-3 mx-auto" type="button" data-toggle="dropdown">
                                {this.state.subRef}<span className="caret"></span></button>
                                <CategoryList refPath={this.state.subSel} handleChange={(e) => this.handleSubChange(e)}/>
                            </div>
                            <div className="dropdown">
                                <button id="location" disabled className="btn btn-danger dropdown-toggle my-3 mx-auto" type="button" data-toggle="dropdown">
                                {this.state.locRef}<span className="caret"></span></button>
                                <CategoryList refPath={this.state.locSel} handleChange={(e) => this.handleLocChange(e)}/>
                            </div>
                            <div className="dropdown">
                                <button id="teacher" disabled className="btn btn-danger dropdown-toggle my-3 mx-auto" type="button" data-toggle="dropdown">
                                {this.state.teachRef}<span className="caret"></span></button>
                                <CategoryList refPath={this.state.teachSel} handleChange={(e) => this.handleTeachChange(e)}/>
                            </div> */}

                            // handleRefChange(device) {
    //     console.log(this.state.query);
    //     let devQ = device + "/Folders";
    //     this.setState({query: devQ, devRef: device, subSel: devQ});
    //     document.getElementById("subject").disabled = false;
    // }

    // handleSubChange(subject) {
    //     console.log(this.state.query);
    //     if(this.state.subSel === "") {
    //         document.getElementById("subject").disabled = true;
    //     }
    //     let subjectQ = this.state.subSel + "/" + subject;
    //     this.setState({query: subjectQ, subRef: subject, locSel: subjectQ});
    //     document.getElementById("location").disabled = false;
    // }

    // handleLocChange(location) {
    //     console.log(location);
    //     console.log(this.state.query);
    //     if(this.state.locSel === "") {
    //         document.getElementById("location").disabled = true;
    //     }
    //     let locationQ = this.state.locSel+ "/" + location;
    //     this.setState({query: locationQ, locRef: location, teachSel: locationQ});
    //     if(location === "Folders") {
    //         document.getElementById("teacher").disabled = false;
    //     }
    // }

    // handleTeachChange(teacher) {
    //     if(this.state.teachSel === "") {
    //         document.getElementById("teacher").disabled = true;
    //     }
    //     let teachQ = this.state.teachSel + '/' + teacher;
    //     this.setState({query: teachQ, teachRef: teacher});
    // }

//     componentWillReceiveProps(nextProps) {
//         this.setState({refPathQ: nextProps.refPath});
//         this.loadData();
//     }

//     componentWillUnmount() {
//         this.unregisterFunction();
//     }

//     loadData() {
//         let ref;
//         if(this.state.refPathQ) {
//             ref = firebase.database().ref(this.props.refPath);
//         } else {
//             ref = firebase.database().ref();
//         }
//         ref.on('value', (snapshot) => {
//             console.log(snapshot)
//             let catValue = snapshot.val();
//             let catArray = Object.keys(catValue).map((key) => {
//                 return {name: key};
//             })
//             this.setState({categories: catArray});
//         });
//     }

//     handleClick(name) {
//         this.props.handleChange(name);
//     }

//     render() {
//         if(this.state.categories) {
//             this.state.selections = [];
//             this.state.categories.forEach(category => {
//                 this.state.selections.push(<li key={category.name}><a href="#" onClick={() => this.handleClick(category.name)}>{category.name}</a></li>);
//             });
//         } else {
//             return (
//                 <div>
//                     loading...
//                 </div>
//             )
//         }

//         return (
//             <div>
//                 {this.state.selections}
//             </div>
//         )
//     }
// }