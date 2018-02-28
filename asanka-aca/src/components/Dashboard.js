import React from "react";
import { Switch, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import constants from './constants';
import MyNav from './Navbar.js';
import './Navbar.css';
import './Dashboard.css';

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
        this.loadData('Alpha Beta');
    }

    componentWillUnmount() {
        this.folderRef.off();
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
                <MyNav />
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


