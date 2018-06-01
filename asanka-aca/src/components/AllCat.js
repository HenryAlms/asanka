import React from "react";
import { Label, Input, FormGroup } from 'reactstrap';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import constants from './constants';

import Checkbox from './Checkbox';

import '../css/Content.css';

//class for handling the different categories (teachers, subjects, grade level) that each device has
export default class AllCat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: undefined,
            categories: [],
            selections: [],
        }
    }

    //Verifies the user before loading the page/categories
    componentDidMount() {
        this.unregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                this.setState({ user: firebaseUser });
                this.loadData();
            } else {
                this.setState({ user: null });
            }
        });
    }

    //Listens for new information from other categories
    componentWillReceiveProps(nextProps) {
        this.setState({ refPathQ: nextProps.refPath });
    }

    componentWillUnmount() {
        this.unregisterFunction();
    }

    //Loads the firebase data
    loadData() {
        let ref = firebase.database().ref("Categories/"); //reference to the storage location in firebase
        if (this.props.refPath) {
            ref = firebase.database().ref(this.props.refPath);
        } else {
            ref = firebase.database().ref();
        }
        ref.on('value', (snapshot) => { //Takes a "snapshot" of the firebase database and maps the list of categories
            let value = snapshot.val(); //in an array to be used later.
            let list = Object.keys(value).map((key) => {
                return { name: key };
            })
            this.setState({ categories: list });
        });
    }

    render() {
        if (this.state.categories) {
            this.state.selections = [];
            this.state.categories.forEach(category => {
                this.state.selections.push(<li className="cat-list-item" key={category.name}>{category.name}</li>);
            });
        } else {
            return (
                <div>
                    loading...
                </div>
            );
        }
        return (
            <div>
                {this.state.selections}
            </div>
        );
    }
}