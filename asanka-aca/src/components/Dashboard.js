import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import constants from './constants';
import MyNav from './Navbar.js';
import './Navbar.css';
import '../css/Dashboard.css';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            query: 'Alpha Beta',
            current: 'Alpha Beta',
            folders: []
        }
    }

    componentDidMount() {
        //this.loadData('Alpha Beta');
        console.log(this.state.user);
        this.unregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) { //someone logged in!
              this.setState({ user: firebaseUser, loading: false, duplicateGames: [] });
            }
            else { //someone logged out
              this.setState({ user: null, duplicateGames: [] });
            }
        });
    }

    componentWillUnmount() {
        //this.folderRef.off();
        this.unregisterFunction();
        
    }

    loadData() {
        this.folderRef = firebase.database().ref(this.state.query);
        this.folderRef.on('value', (snapshot) => {
            let foldersValue = snapshot.val();
            let foldersArray = Object.keys(foldersValue).map((key) => {
                console.log(key);
                return {name: key};
            })
            this.setState({folders: foldersArray})
        });  
    }

    render() {
        let folderItems = this.state.folders.map((folder) => {
            return (
                <button className="btn btn-primary folder-btn mr-2" key={folder.name} value={folder.name}>{folder.name}</button>
            )
        })
        return (
            <div className="container-fluid main">
                {!this.state.user && <Redirect to={constants.routes.welcome} />}    
                <div className="jumbotron-fluid">
                    <h1 className="my-5">Dashboard</h1>
                </div>
                <div className="content-management">
                    <h2 className="mb-4">Content Management</h2>
                </div>
                <div>
                    <h3>Folders:</h3>
                    {folderItems}
                </div>
            </div>
        )
    }
}


