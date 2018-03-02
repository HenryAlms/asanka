import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import Category from "./Category"

export default class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID:undefined,
            categories: [],
            selections: []
        }
    }

    componentDidMount() {
        this.unregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
              this.setState({ user: firebaseUser, loading: false });
              this.loadData();
            }
            else {
              this.setState({ user: null, loading: false });
            }
          });
    }

    componentWillUnmount() {
        this.unregisterFunction();
    }

    loadData() {
        let ref;
        console.log(this.props.refPath);
        if(this.props.refPath) {
            ref = firebase.database().ref(this.props.refPath);
            console.log("here")
        } else {
            console.log("THERE")
            ref = firebase.database().ref();
        }
        ref.on('value', (snapshot) => {
            let catValue = snapshot.val();
            let catArray = Object.keys(catValue).map((key) => {
                console.log(key);
                return {name: key};
            })
            console.log(catArray);
            this.setState({categories: catArray})
        });
    }

    render() {
        if(this.state.categories) {        
            this.state.categories.forEach(category => {
                console.log(category.key);
                this.state.selections.push(<Category name={category.name}/>);
            });
        } else {
            return (
                <div>
                    loading...
                </div>
            )
        }

        return (
            <ul className="dropdown-menu">
                {this.state.selections}
            </ul>
        )
    }
}