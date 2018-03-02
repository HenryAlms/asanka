import React from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import constants from './constants';
import CategoryList from './CategoryList';


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
        // this.authUnsub = firebase.auth().onAuthStateChanged(user => {
        //     this.setState({userID: user});
        // });
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

    render() {
        return (
            <div>
                <div>
                    <p> Hello, user </p>
                </div>
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
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                        Choose a Device<span className="caret"></span></button>
                        <CategoryList refPath={null}/>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                        Choose a Subject<span className="caret"></span></button>
                        <CategoryList refPath={"Device 1/Subjects/"}/>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                        Choose a Location<span className="caret"></span></button>
                        <CategoryList refPath={"Device 1/Subjects/Math"}/>
                    </div>
                    <div>
                        upload file button
                    </div>
                    <div className='form-group'>
                        <button disabled={this.state.working}
                        type='submit'
                        className='btn btn-success'>
                        Add File</button>
                    </div>
                    </form>
                </div>
            </div>
        );
    }
}