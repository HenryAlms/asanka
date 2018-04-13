import React from "react";
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import {Container, Table, Button} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import "../css/aca.css";
import FileTable from "./FileTable.js"
import Folder from "./Folder.js";
import constants from "./constants";


export default class ACA extends React.Component {
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

        this.folderRef = firebase.database().ref(query + "/Folders");
        this.folderRef.on('value', (snapshot) => {
            console.log(snapshot.val());
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
        console.log(query);
        this.fileRef = firebase.database().ref(query + '/Files');
        this.fileRef.once('value', (snapshot) => {
            let fileValue = snapshot.val();
            console.log(fileValue);
            let fileArray = Object.keys(fileValue).map((key) => {
                if (fileValue[key].active) {
                    fileValue[key].key = key;
                    return fileValue[key];
                }    
            })
            fileArray = fileArray.filter(file => {
                return file !== undefined;
            })
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
               {!this.props.user && <Redirect exact to={constants.routes.welcome} />}
                <Container className="main align-center p-4">
                    <h1><Link to={constants.routes.device}><i className="back-button fas fa-arrow-circle-left"></i></Link>        ASANKA Cloud</h1>
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
                    <h2 className="pb-2">Files in: English</h2>
                    <FileTable files={this.state.files} query={this.state.query} />   
                </Container>
            </Container>
        )
    }
}