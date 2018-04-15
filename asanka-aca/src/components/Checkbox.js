import React from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {Label, Input, FormGroup} from 'reactstrap';

import constants from './constants';
import '../css/Content.css';

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID:undefined,
            categories: [],
            selections: [],
            label: this.props.name,
            isChecked: false
        }
        // this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.unregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
              this.setState({user: firebaseUser});
            //   this.loadData(this.props.refPath);
            }
            else {
              this.setState({ user: null});
            }
          });
    }

    componentWillUnmount() {
        this.unregisterFunction();
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({refPathQ: nextProps.refPath});
    //     // this.loadData();
    // }

    toggleCheckboxChange(evt) {
        this.setState(({isChecked}) => ( 
            {
                isChecked: !isChecked
            }
        ));
    }

    render() {
        return(
            <div className="checkbox">
                <label>
                    <input type="checkbox" value={this.state.label} checked={this.state.isChecked} onChange={(evt) => this.toggleCheckboxChange(evt)}/>
                    {" " + this.state.label}
                </label>
             </div>
        )
    }
}