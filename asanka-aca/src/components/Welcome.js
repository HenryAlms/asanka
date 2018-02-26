import React from "react";
import {Link} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import constants from './constants';

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: undefined,
            email: "",
            password: "",
            errorMessage: ""
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
            .then(() => this.props.history.push(constants.routes.messages))
            .catch(err => window.alert(err));
    }

    render() {
        return (
            <div>
            <header className="jumbotron jumbotron-fluid bg-success text-light">
                <div className='container'>
                    <h1>Sign In</h1>
                </div>
            </header>
            <div className='container'>
                {this.state.errorMessage ?
                    <div className="alert alert-danger" role="alert">
                        {this.state.errorMessage}
                    </div>
                    : undefined}
                <form onSubmit={evt => this.signIn(evt)}>
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
                        className='btn btn-success'>
                        Sign In</button>
                    </div>
                </form>

                <p>Need an account? <Link to={constants.routes.welcome}>Sign Up</Link></p>
            </div>
        </div>
        );
    }

}