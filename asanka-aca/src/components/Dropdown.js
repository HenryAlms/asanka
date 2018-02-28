import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import CategoryList from './CategoryList'

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID:undefined,
            category: undefined,
            school:"",
            device: "",
            term: "",
            subjects: "" //Do I want these here????
        }
    }

    componentDidMount() {
        //this.unlisten = this.props.category.on("value", snapshot => this.setState({category: snapshot}));
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            this.setState({userID: user, school: user.school});
        });
    }

    componentWillUnmount() {
        this.authUnsub();
        // this.props.category.off("value", this.unlisten);
    }

    render() {
        //something
        //let device = firebase.database().ref(this.state.school + "/" + this.state.device);
        let terms = firebase.database().ref("Device 1/" + this.state.term);         //this.state.school + "/" + 
        let subjects = firebase.database().ref("Device 1/Term 1/"  + this.state.subjects);      //this.state.school + "/" + + this.state.term + "/"
        //let teachers = firebase.database().ref("users/");       //this.state.school + 
        let cat = <CategoryList category={terms}/>
        let sub = <CategoryList category={subjects}/>
        return (
            <div>
                {cat}
                {sub}
            </div>
        )
    }
}

//<CategoryList category={teachers}/>

