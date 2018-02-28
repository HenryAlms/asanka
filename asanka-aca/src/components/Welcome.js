import React from "react";
//import {Link} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import "../css/headimg.css";

import constants from './constants';

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: undefined,
            email: "",
            password: "",
            errorMessage: "",
            school:""
        }
    }

    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            this.setState({userID: user});
        });
    }

    componentWillUnmount() {
        this.authUnsub();
    }

    signIn(evt) {
        evt.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.history.push(constants.routes.dashboard))
            .catch(err => window.alert(err));
    }

    render() {

        return (
            <div>
            <header className="jumbotron jumbotron-fluid p-0 text-light">
                <div className="container">
                    {this.state.errorMessage ?
                        <div className="alert alert-danger" role="alert">
                            {this.state.errorMessage}
                        </div>
                        : undefined}

                    <div className='formContainer rounded'>
                    <div className='Asanka-Logo'>
                        <img src="./imgs/Asanka-logo.png" alt="Logo"/>
                    </div>
                        <form className="form" onSubmit={evt => this.signIn(evt)}>
                            <div className='form-group'>
                                <label htmlFor='school'>School:</label>
                                <input id='school' type='text'
                                className='form-control' 
                                placeholder='Enter School'
                                value={this.state.school}
                                onInput={evt => this.setState({school: evt.target.value})}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='email'>Email:</label>
                                <input id='email' type='email'
                                className='form-control' 
                                placeholder='Enter email'
                                value={this.state.email}
                                onInput={evt => this.setState({email: evt.target.value})}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password'>Password:</label>
                                <input type='password'
                                className='form-control' 
                                placeholder='Password'
                                value={this.state.password}
                                onInput={evt => this.setState({password: evt.target.value})}/>
                            </div>
                            <div className='form-group'>
                                <button disabled={this.state.working}
                                type='submit'
                                className='btn'>
                                Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </header>
        </div>
        );
    }

}