import React from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {Label, Input, FormGroup} from 'reactstrap';

import constants from './constants';
import '../css/Content.css';
import { checkServerIdentity } from "tls";

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:undefined,
            categories: [],
            selections: [],
            label: this.props.name,
            isChecked: false,
            curDevice: this.props.deivce,
            disabled: false
        }
    }

    componentDidMount() {
        this.unregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
              this.setState({user: firebaseUser, disabled: this.props.disabled});
            }
            else {
              this.setState({ user: null});
            }
          });
    }

    componentWillUnmount() {
        this.unregisterFunction();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({refPathQ: nextProps.refPath, disabled: nextProps.disabled});
    }

    toggleCheckboxChange() {
        this.setState(({isChecked}) => (
            {
                isChecked: !isChecked
            }
        ));
        this.props.handleClick(this.state.label, !this.state.isChecked);
    }

    check() {
        if(this.state.label === this.state.deivce) {
            this.setState({isChecked:true});
            return true;
        } else {
            return this.state.isChecked;
        }
    }

    render() {
        return(
            <div className="checkbox">
                <label>
                    <input type="checkbox" disabled={this.state.disabled} value={this.state.label} checked={this.check()} onClick={() => this.toggleCheckboxChange()}/>
                    {" " + this.state.label}
                </label>
             </div>
        )
    }
}