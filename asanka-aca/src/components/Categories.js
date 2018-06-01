import React from "react";
import { Label, Input, FormGroup } from 'reactstrap';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import constants from './constants';

import Checkbox from './Checkbox';

import '../css/Categories.css';

//Takes the specific list of category values and converts them to checkboxes. Used for New Content Selections
export default class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: undefined,
            categories: [],
            selections: [],
            disabled: "false"
        }
    }

    componentDidMount() {
        this.unregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                this.setState({ user: firebaseUser, disabled: this.props.disabled });
                this.loadData();
            } else {
                this.setState({ user: null });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ refPathQ: nextProps.refPath, disabled: nextProps.disabled });
    }

    componentWillUnmount() {
        this.unregisterFunction();
    }

    loadData() {
        let ref;
        if (this.props.refPath) {
            ref = firebase.database().ref(this.props.refPath);
        } else {
            ref = firebase.database().ref();
        }
        ref.on('value', (snapshot) => {
            let value = snapshot.val();
            let list = Object.keys(value).map((key) => {
                return { name: key };
            })
            this.setState({ categories: list });
        });
    }

    //Listens for a checkbox click, if selected, changes the checkbox state
    handleClick(name, state) {
        if (state === true) {
            this.props.checkSelect(name);
        } else {
            this.props.uncheck(name);
        }
    }

    render() {
        if (this.state.categories) {
            this.state.selections = [];
            this.state.categories.forEach(category => {
                this.state.selections.push(<Checkbox className="mb-4" disabled={this.state.disabled} name={category.name} handleClick={(e, state) => this.handleClick(e, state)} key={category.name} />);
            });
        } else {
            return (
                <div>
                    loading...
                </div>
            )
        }
        return (
            <div>
                {this.state.selections}
            </div>
        )
    }
}