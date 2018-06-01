import React from "react";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import '../css/Content.css';

//Creates a checkbox for each list item for the New Content Section
export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            label: this.props.name,
            isChecked: false,
            disabled: false
        }
    }

    componentDidMount() {
        this.unregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                this.setState({ user: firebaseUser, disabled: this.props.disabled });
            }
            else {
                this.setState({ user: null });
            }
        });
    }

    componentWillUnmount() {
        this.unregisterFunction();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ disabled: nextProps.disabled });
    }

    
    //Updates information on state to pass to the content upload section
    toggleCheckboxChange() {
        this.setState(({ isChecked }) => (
            {
                isChecked: !isChecked
            }
        ));
        this.props.handleClick(this.state.label, !this.state.isChecked);
    }

    //Changes checkbox from unselected to selected or vice versa
    check() {
        if (this.state.label === this.state.deivce) {
            this.setState({ isChecked: true });
            return true;
        } else {
            return this.state.isChecked;
        }
    }

    render() {
        return (
            <div className="checkbox">
                <label>
                    <input type="checkbox" disabled={this.state.disabled} value={this.state.label} checked={this.check()} onClick={() => this.toggleCheckboxChange()} />
                    {" " + this.state.label}
                </label>
            </div>
        )
    }
}