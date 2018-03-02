import React from "react";
import {Link} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import constants from './constants';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            fName: '',
            lName: '',
            pWord: '',
            email: '',
            school: ''
        }
    }


    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            this.setState({userID: user});
        });
        this.loadData(this.state.user);
    }

    loadData() {
        this.folderRef = firebase.database().ref(this.state.query);
        this.folderRef.on('value', (snapshot) => {
            let foldersValue = snapshot.val();
            let foldersArray = Object.keys(foldersValue).map((key) => {
                console.log(key);
                return {name: key};
            })
            this.setState({folders: foldersArray})
        });  
    }

    render() {
        return (
            <section className='display-item'>
                <div className="container">
                    <h1>User Profile</h1>
	                <div className="row">
                        <div className="col-md-3">
                            <div className="text-center">
                                <img src="//placehold.it/100" className="avatar img-circle" alt="avatar"></img>
                                <h6>Upload a different photo...</h6>
          
                                <input type="file" className="form-control"></input>
                            </div>
                        </div>
      
                        <div className="col-md-9 personal-info">        
                            <form className="form-horizontal" role="form">
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">First name:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="text" placeholder='John'></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Last name:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="text" placeholder='Smith'></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">School:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="text" placeholder='Alpha Beta'></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Email:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="text" placeholder='email@address.com'></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Username:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="text" placeholder='CurrentUser'></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Password:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="password" placeholder='CurrentPassword'></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Confirm password:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="password" placeholder='CurrentPassword'></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label"></label>
                                    <div className="col-lg-8">
                                        <button type="button" className="btn btn-success">Submit Changes</button>
                                        <span></span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}