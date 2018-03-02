import React from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import constants from './constants';
import CategoryList from './CategoryList';
import TopNav from './TopNav';
import '../css/Content.css'


export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: "",
            title: "",
            date: "",
            description:"",
            school: "",
            device: ""
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

    submitFile(evt) {
        var user = firebase.auth().currentUser;
        evt.preventDefault();
        let time = firebase.database.ServerValue.TIMESTAMP;
        let date = new Date(+time);
        let message = {
            body: this.state.body,
            author: {
                name: user.displayName,
                photo: user.photoURL,
                id: user.uid
            },
            createdAt: date,
        };
        this.props.messageList.push(message);
        this.setState({body: ""});
    }

    // catSelect(button, value) {
    //     if(button = device) {
    //         this.device = 
    //     } else if (button = subject) {
    //         this.subject = ;
    //     } else {
    //         this.location = ;
    //     }
    // }

    render() {
        return (
            <div>
                <TopNav/>
                <div className='container'>
                    <form className="">
                    <div className='form-group'>
                        <label htmlFor='FileTitle'>Title:</label>
                        <input id='FileTitle' type='text'
                        className='form-control' 
                        placeholder='Enter Document Title'
                        value={this.state.title}
                        onInput={evt => this.setState({title: evt.target.value})}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='Date'>Date:</label>
                        <input id="Date" type='date'
                        className='form-control' 
                        placeholder='File Description'
                        value={this.state.date}
                        onInput={evt => this.setState({date: evt.target.value})}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='Description'>Description:</label>
                        <input id="Description" type='text'
                        className='form-control' 
                        placeholder='File Description'
                        value={this.state.description}
                        onInput={evt => this.setState({description: evt.target.value})}/>
                    </div>
                    <div className="dropGroup">
                        <div className="dropdown">
                            <button id="device" className="btn btn-primary dropdown-toggle my-3 mx-auto" type="button" data-toggle="dropdown">
                            Choose a Device<span className="caret"></span></button>
                            <CategoryList refPath={null}/>
                        </div>
                        <div className="dropdown">
                            <button id="subject" className="btn btn-primary dropdown-toggle my-3 mx-auto" title="Choose Category" type="button" data-toggle="dropdown">
                            Choose a Subject<span className="caret"></span></button>
                            <CategoryList refPath={"Device 1/Subjects/"}/>
                        </div>
                        <div className="dropdown">
                            <button id="location" className="btn btn-primary dropdown-toggle my-3 mx-auto" type="button" data-toggle="dropdown">
                            Choose a Location<span className="caret"></span></button>
                            <CategoryList refPath={"Device 1/Subjects/Math"}/>
                        </div>
                        <div className='dropdown form-group'>
                            <input className="mr-auto" type="file"/>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        );
    }
}