import React from "react";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import constants from './constants';

import '../css/Dashboard.css';

//Provides the dropdown to manage the devices on the dashboard
export default class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: undefined,
            categories: [],
            selections: [],
            refPathQ: this.props.refPath
        }
    }

    componentDidMount() {
        this.unregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                this.setState({ user: firebaseUser, loading: false });
                this.loadData(this.props.refPath);
            }
            else {
                this.setState({ user: null, loading: false });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ refPathQ: nextProps.refPath });
        this.loadData(); //forces data refresh when receiving new data
    }

    componentWillUnmount() {
        this.unregisterFunction();
    }

    loadData() {
        let ref;
        if (this.state.refPathQ) {
            ref = firebase.database().ref(this.props.refPath);
        } else {
            ref = firebase.database().ref();
        }
        ref.on('value', (snapshot) => {
            let catValue = snapshot.val();
            let catArray = Object.keys(catValue).map((key) => {
                return { name: key };
            })
            this.setState({ categories: catArray });
        });
    }

    handleClick(name) {
        this.props.handleChange(name); //sends new device information to the dashboard
    }

    render() {
        if (this.state.categories) {
            this.state.selections = [];
            this.state.categories.forEach(category => {
                this.state.selections.push(<li key={category.name}><a className="device-list-item" href="#" onClick={() => this.handleClick(category.name)}>{category.name}</a></li>);
            });
        } else {
            return (
                <div>
                    loading...
                </div>
            )
        }

        return (
            <form>
                <ul className="dropdown-menu">
                    {this.state.selections}
                </ul>
            </form>
        )
    }
}