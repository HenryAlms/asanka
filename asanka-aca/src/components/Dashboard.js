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
            prevPath: '',
            prev: '',
            current: 'Device3',
            folders: [],
            files: []
        }
    }

    componentDidMount() {
        this.loadFolders(this.state.query);
        this.loadFiles(this.state.query);
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

    loadFolders(query) {
        console.log('clicked');
        this.folderRef = firebase.database().ref(query + "/Folders");
        this.folderRef.on('value', (snapshot) => {
            let foldersValue = snapshot.val();
            let foldersArray = Object.keys(foldersValue).map((key) => {
                return {name: key};
            })
            this.setState({folders: foldersArray})
        });  
    }

    loadFiles(query) {
        this.fileRef = firebase.database().ref(query + '/Files');
        this.fileRef.on('value', (snapshot) => {
            let fileValue = snapshot.val();
            console.log(fileValue)
            let fileArray = Object.keys(fileValue).map((key) => {
                console.log(fileValue[key]);
                fileValue.key = key;
                return fileValue[key];
            })
            this.setState({files: fileArray});
        }); 
    }

    folderOnClick(folder) {
        this.setState({prev: this.state.query, current: folder.name});
        let newQuery = this.state.query + "/Folders/" + folder.name;
        this.setState({query: newQuery});
        this.loadFolders(newQuery);
        this.loadFiles(newQuery);
    }

    backOnClick() {
        console.log(this.state.query);
        let remove = "Folders/" + this.state.current;
        let newQuery = this.state.query.replace(remove, '');
        console.log(this.state.current);
        console.log(newQuery);
        let newPrev = this.state.query.split('/Folders/');
        newPrev = newPrev[newPrev.length - 2];
        let newCurrent = this.state.prev;
        this.loadFolders(newQuery);
        this.loadFiles(newQuery);
        this.setState({current: newCurrent, prev: newPrev, query: newQuery});
    }

    render() {
        let folderItems = this.state.folders.map((folder) => {
            return (
                <Folder folderName={folder.name} key={folder.name} value={folder.name} onClickCallback={() => this.folderOnClick(folder)} />
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
                
                {this.state.prev !== '' && <Button color="danger" onClick={() => this.backOnClick()} className="m-2"><i className="fas fa-chevron-left"></i>Back</Button>}
                

                <Container className="folders-section p-3 mb-5">
                    {folderItems}
                </Container>
                <div>
                    <div className="fileBtns">
                        <Button color="danger" className="m-2"><i className="fas fa-plus-circle mr-2"></i><Link className="add-file-btn" to={constants.routes.content}>Add New File</Link></Button>
                        <Button color="secondary" className="m-2"><i className="fas fa-pencil-alt mr-2"></i>Edit</Button>
                    </div>    
                    <FileTable files={this.state.files} />   
                </div>     
            </div>
        )
    }
}




