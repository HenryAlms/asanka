import React from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {Label, Input, FormGroup} from 'reactstrap';

import constants from './constants';
import '../css/Content.css';
import Checkbox from './Checkbox';

export default class AllCat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID:undefined,
            categories: [],
            selections: [],
            options: []
        }
    }

    componentDidMount() {
        this.unregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
              this.setState({ user: firebaseUser});
              this.loadData();
            } else {
              this.setState({ user: null});
            }
          });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({refPathQ: nextProps.refPath});
    }

    componentWillUnmount() {
        this.unregisterFunction();
    }

    loadData() {
        let ref = firebase.database().ref("Categories/");
        if(this.props.refPath) {
            ref = firebase.database().ref(this.props.refPath);
        } else {
            ref = firebase.database().ref();
        }
        ref.on('value', (snapshot) => {
            let value = snapshot.val();
            let list = Object.keys(value).map((key) => {
                return {name: key};
            })
            this.setState({categories: list});
        });
    }

    render() {
        if(this.state.categories) {
            this.state.selections = [];
            this.state.categories.forEach(category => {
                this.state.selections.push(<li className="cat-list-item" key={category.name}>{category.name}</li>);
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