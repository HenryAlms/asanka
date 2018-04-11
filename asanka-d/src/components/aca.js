import React from "react";
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import {Container, Table, Button} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import "../css/aca.css";
import FileTable from "./FileTable.js"
import Folder from "./Folder.js";

export default class ACA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            query: 'Device3/Folders/English',
            prevPath: 'Device3',
            prev: 'Device3',
            current: 'Device3/Folders/English',
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

    loadFiles(query) {
        this.fileRef = firebase.database().ref(query + '/Files');
        this.fileRef.on('value', (snapshot) => {
            let fileValue = snapshot.val();
            console.log(query);
            console.log(fileValue);
            console.log(snapshot);
            console.log(this.fileRef);
            let fileArray = Object.keys(fileValue).map((key) => {
                fileValue.key = key;
                return fileValue[key];
            });
            this.setState({files: fileArray});
        }); 
    }

    render() {
        let folderItems = this.state.folders.map((folder) => {
            return (
                <Folder folderName={folder.name} key={folder.name} value={folder.name} onClickCallback={() => this.folderOnClick(folder)} />
            )
        })
        console.log('prev path: ' + this.state.prevPath);
        return(
            <Container fluid>
                <Container className="main align-center p-4">
                    <h1><i class="back-button fas fa-arrow-circle-left"></i>        ASANKA Cloud</h1>
                    <hr />
                    <h2 className="pb-2 pt-1">Folders</h2>
                    {this.state.prevPath !== 'Device3' && <Button color="danger" onClick={() => this.backOnClick()} className="m-2"><i className="fas fa-chevron-left back-icon mr-2"></i>{this.state.prev}</Button>}
                    <Container className="folders-section p-3 mb-5">
                        {folderItems}
                    </Container>
                    <h2 className="pb-2">Files in: English</h2>
                    <FileTable files={this.state.files} />   
                </Container>
            </Container>
        )
    }
}