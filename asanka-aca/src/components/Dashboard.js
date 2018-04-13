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
      //  this.singleFileRef.off();
        this.unregisterFunction();
    }

    loadFolders(query) {
        this.folderRef = firebase.database().ref(query + "/Folders");
        this.folderRef.on('value', (snapshot) => {
            let foldersValue = snapshot.val();
            let foldersArray = [];
            if (foldersValue !== null) {
                foldersArray = Object.keys(foldersValue).map((key) => {
                    return {name: key};
                })
            }
            this.setState({folders: foldersArray})
        });  
    }

    loadFiles(query) {
        this.fileRef = firebase.database().ref(query + '/Files');
        this.fileRef.once('value', (snapshot) => {
            let fileValue = snapshot.val();
            console.log(fileValue);

            let fileArray = Object.keys(fileValue).map((key) => {
                fileValue[key] = key;
                console.log(key);
                return fileValue[key];
            })
            this.setState({files: fileArray});
        }); 
    }
    
    changeStatus(event) {
        let file = event.target.value;
        console.log('changeStatus clicked! file:' + file);
        let singleFileRef = firebase.database().ref(this.state.query + '/Files/' + file);
        singleFileRef.once('value', (snapshot) => {
            let data = snapshot.val();
            let isActive = data.active;
            let update = data;
            if (isActive) {
                update['active'] = false;
            } else {
                update['active'] = true;
            }
            singleFileRef.set(update);
        });
        this.loadFiles(this.state.query);
    }

    folderOnClick(folder) {
        let newPrev = this.state.current;
        let newQuery = this.state.query + "/Folders/" + folder.name;
        this.loadFolders(newQuery);
        this.loadFiles(newQuery);
        this.setState({prevPath: this.state.query, current: folder.name, prev: newPrev, query: newQuery});
        
    }

    backOnClick() {
        let remove = "/Folders/" + this.state.current;
        let newQuery = this.state.query.replace(remove, '');
        let newPrevPath = '';
        let prevCurr = '';
        let prevArr = this.state.prevPath.split('/Folders/');
        if (prevArr.length < 2) {
            newPrevPath = '';            
        } else {
            prevCurr = prevArr[prevArr.length - 1];
            let prevRemove = "/Folders/" + prevCurr;
            newPrevPath = this.state.prevPath.replace(prevRemove, '');
        } 
        let newPrev = prevArr[prevArr.length - 2];
        let newCurrent = this.state.prev;
        this.loadFolders(newQuery);
        this.loadFiles(newQuery);
        this.setState({current: newCurrent, prev: newPrev, prevPath: newPrevPath, query: newQuery});
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
                
                {this.state.prevPath !== '' && <Button color="danger" onClick={() => this.backOnClick()} className="m-2"><i className="fas fa-chevron-left back-icon mr-2"></i>{this.state.prev}</Button>}
                
                {this.state.folders.length > 0 &&
                    <Container className="folders-section p-3 mb-5">
                        {folderItems}
                    </Container>
                }    

                <div>
                    <div className="fileBtns">
                        <Button color="danger" className="m-2"><i className="fas fa-plus-circle mr-2"></i><Link className="add-file-btn" to={constants.routes.content}>Add New File</Link></Button>
                        <Button color="secondary" className="m-2"><i className="fas fa-pencil-alt mr-2"></i>Edit</Button>
                    </div>    
                    <FileTable files={this.state.files} changeCallback={(e) => this.changeStatus(e)}/>   
                </div>     
            </div>
        )
    }
}




