import React from "react";
import {Redirect} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import "../css/headimg.css";
import constants from './constants';

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSignIn(event) {
        event.preventDefault(); //don't submit
        this.props.signInCallback(this.state.email, this.state.password);
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
                    {this.props.user && <Redirect to={constants.routes.dashboard} />}    

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
                                className='btn-danger' onClick={(event) => this.handleSignIn(event)}>
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