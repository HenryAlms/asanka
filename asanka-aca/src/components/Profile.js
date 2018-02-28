import React from "react";
import {Link} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import constants from './constants';

export default class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            fName: '',
            lName: ''
        }
        // console.log(this.state)
    }


    componentDidMount() {
        const itemsRef = firebase.database().ref('Alpha Beta/Users');
        console.log(itemsRef)
        // itemsRef.on('value', (snapshot) => {
        //     let items = snapshot.val();
        //     let newState = [];
        //     for (let item in items) {
        //         newState.push({
        //             id: item,
        //             title: items[item].fName,
        //             user: items[item].user
        //         });
        //     }
        //     this.setState({
        //         items: newState
        //     });
        // });
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
                                        <input className="form-control" type="text"></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Last name:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="text"></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">School:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="text"></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Email:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="text"></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Username:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="text"></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Password:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="password"></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label">Confirm password:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="password"></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label"></label>
                                    <div className="col-lg-8">
                                        <input type="button" className="btn btn-primary"></input>
                                        <span></span>
                                        <input type="reset" className="btn btn-primary"></input>
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