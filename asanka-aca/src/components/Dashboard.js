import React from "react";
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import {Container, Table, Button} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import constants from './constants';
import MyNav from './Navbar.js';
import Folder from './Folder.js';
import FileTable from './FileTable.js';
import './Navbar.css';
import '../css/Dashboard.css';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            query: 'Device3',
            current: 'Device 1',
            folders: [],
            files: []
        }
    }

    componentDidMount() {
        this.loadFolders();
        this.loadFiles();
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
        this.folderRef.off();
        this.fileRef.off();
        this.unregisterFunction();
    }

    loadFolders() {
        this.folderRef = firebase.database().ref(this.state.query + '/Folders');
        this.folderRef.on('value', (snapshot) => {
            let foldersValue = snapshot.val();
            console.log(foldersValue);
            let foldersArray = Object.keys(foldersValue).map((key) => {
                return {name: key};
            })
            this.setState({folders: foldersArray})
        });  
    }

    loadFiles() {
        this.fileRef = firebase.database().ref(this.state.query + '/Files');
        this.fileRef.on('value', (snapshot) => {
            let fileValue = snapshot.val();
            console.log(fileValue)
            let fileArray = Object.keys(fileValue).map((key) => {
                console.log(key);
                console.log(fileValue);
                return fileValue[key];
            })
            this.setState({files: fileArray});
        }); 
        
        // let filesArray = [];
        // this.fileRef.once('value').then((snapshot) => {
        //         snapshot.forEach(function(childSnapshot) {
        //             let key = childSnapshot.key;
        //             console.log(key);
        //             let childData = childSnapshot.val();
        //             console.log(childData);
        //             childData.key = key;
        //             filesArray.push(childData);
        //             console.log(filesArray);
        //         })
        //     })
        // this.setState({files: filesArray});
    }

    folderOnClick(folder) {
        console.log(folder.value);
    }

    render() {
        let folderItems = this.state.folders.map((folder) => {
            return (
                <Folder folderName={folder.name} key={folder.name} value={folder.name} onClick={this.folderOnClick} />
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
                <Container className="folders-section p-3 mb-5">
                    {folderItems}
                </Container>
                <div>
                    <div className="fileBtns">
                        <Button color="danger" className="m-2"><i className="fas fa-plus-circle mr-2"></i><Link to={constants.routes.content}>Add New File</Link></Button>
                        <Button color="secondary" className="m-2"><i className="fas fa-pencil-alt mr-2"></i>Edit</Button>
                    </div>    
                    <FileTable files={this.state.files} />   
                </div>     
            </div>
        )
    }
}




