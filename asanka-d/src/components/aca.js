import React from "react";
import { Redirect, Link } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import FileTable from "./FileTable.js"
import Folder from "./Folder.js";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import constants from "./constants";

import "../css/aca.css";

export default class ACA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            query: 'Device 3',
            prevPath: '',
            prev: '',
            current: 'Device 3',
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

    //Loads the folders from the database & storeage to display on the device
    loadFolders(query) {
        this.folderRef = firebase.database().ref(query + "/Folders");
        this.folderRef.on('value', (snapshot) => {
            let foldersValue = snapshot.val();
            let foldersArray = [];
            if (foldersValue !== null) {
                foldersArray = Object.keys(foldersValue).map((key) => {
                    return { name: key };
                })
            }
            this.setState({ folders: foldersArray })
        });
    }

    //Responds to folder click to load new files in selected folder
    folderOnClick(folder) {
        let newPrev = this.state.current;
        let newQuery = this.state.query + "/Folders/" + folder.name;
        this.loadFolders(newQuery);
        this.loadFiles(newQuery);
        this.setState({ prevPath: this.state.query, current: folder.name, prev: newPrev, query: newQuery });
    }

    //Adjusts the current query when navigating back into the app
    //Loads the new files after clicking the back button
    backOnClick() {
        let remove = "/Folders/" + this.state.current;
        let newQuery = this.state.query.replace(remove, '');
        let newPrevPath = '';
        let prevCurr = '';
        let prevArr = this.state.prevPath.split('/Folders/'); //Trims the query to the new location
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
        this.setState({ current: newCurrent, prev: newPrev, prevPath: newPrevPath, query: newQuery });
    }

    //loads all the files at the folder location
    loadFiles(query) {
        this.fileRef = firebase.database().ref(query + '/Files');
        this.fileRef.once('value', (snapshot) => {
            let fileValue = snapshot.val();
            let fileArray = Object.keys(fileValue).map((key) => {
                if (fileValue[key].active) {
                    fileValue[key].key = key;
                    return fileValue[key];
                }
            })
            fileArray = fileArray.filter(file => {
                return file !== undefined;
            })
            this.setState({ files: fileArray });
        });
    }

    render() {
        let folderItems = this.state.folders.map((folder) => {
            return (
                <Folder folderName={folder.name} key={folder.name} value={folder.name} onClickCallback={() => this.folderOnClick(folder)} />
            )
        })
        return (
            <Container fluid>
                {!this.props.user && <Redirect exact to={constants.routes.welcome} />}
                <Container className="main align-center p-4 fade-in">
                    <h1><Link to={constants.routes.device}><i className="back-button fas fa-arrow-circle-left"></i></Link>ASANKA Cloud</h1>
                    <hr />

                    <div className="mb-5">
                        <h2 className="pb-2 pt-1">Folders</h2>
                        {this.state.prevPath !== '' && <Button color="danger" onClick={() => this.backOnClick()} className="m-2"><i className="fas fa-chevron-left back-icon mr-2"></i>{this.state.prev}</Button>}
                        {this.state.folders.length > 0 &&
                            <Container className="folders-section p-3">
                                {folderItems}
                            </Container>
                        }
                    </div>
                    <h2 className="pb-2">Files in: Device 3</h2>
                    <FileTable files={this.state.files} query={this.state.query} />
                </Container>
            </Container>
        )
    }
}