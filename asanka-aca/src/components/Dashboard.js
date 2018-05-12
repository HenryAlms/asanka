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
import CategoryList from './CategoryList';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            query: 'Device 3',
            prevPath: '',
            prev: '',
            current: 'Device 3',
            folders: [],
            files: [],
            editMode: false,
            checked: new Set(),
            devSelect: "Choose A Device"
        }
    }

    componentDidMount() {
        this.loadFolders(this.state.query);
        this.loadFiles(this.state.query);
        this.unregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) { //someone logged in!
              this.setState({ user: firebaseUser, loading: false, duplicateGames: [], devSelect: this.props.currDevice });
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

    componentWillReceiveProps(nextProps) {
        this.setState({current: nextProps.currDevice});
        this.loadFolders(nextProps.currDevice);
        this.loadFiles(nextProps.currDevice);
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
        let fileArray = [];
        this.fileRef.once('value', (snapshot) => {
            let fileValue = snapshot.val();
            fileArray = Object.keys(fileValue).map((key) => {
                fileValue[key].key = key;
                return fileValue[key];
            })
            this.setState({files: fileArray});
        });

    }
    
    changeStatus(event) {
        let file = event.target.value;
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

    handleDevChange(d) {
        this.setState({current: d, query: d});
        this.props.device(d);
    }

    editOnClick() {
        if (this.state.editMode === false || this.state.editMode === null || this.state.editMode === undefined)
            this.setState({editMode: true});
        else {   
            this.setState({editMode: false, checked: []}) 
        }      

    }

    handleEditCheck(e) {
        let fileTitle = e.target.value;
        if (this.state.checked.has(fileTitle)) {
          this.state.checked.delete(fileTitle);
        } else {
          this.state.checked.add(fileTitle);
        }
    }

    deleteFiles() {
        this.deleteStorage();
        this.fileRef = firebase.database().ref(this.state.query + '/Files');
        var updates = {};
        this.fileRef.once('value', (snapshot) => {
            let fileValue = snapshot.val();
            Object.keys(fileValue).forEach((key) => {
                if (this.state.checked.has(key)) {
                    updates[key] = null;
                }
            })
        });
        this.fileRef.update(updates);
        this.setState({checked: this.state.checked.clear(), editMode : false}); 
        this.loadFiles(this.state.query);
    }

    deleteStorage() {
        let storageRef = firebase.storage().ref(this.state.query + "/Files/"); 
        this.state.checked.forEach(function(file) {
            var deleteRef = storageRef.child(file);
            // Delete the file
            deleteRef.delete().then(function() {
            // File deleted successfully
            }).catch(function(error) {
                var deleteRef = storageRef.child(file + ".pdf");
                deleteRef.delete().then(function() {
                    // File deleted successfully
                }).catch(function(error) {
                    console.log(error);
                })
            });
        })
    }

    render() {
        let folderItems = this.state.folders.map((folder) => {
            return (
                <Folder folderName={folder.name} key={folder.name} value={folder.name} onClickCallback={() => this.folderOnClick(folder)} />
            )
        });
        return (
            <div className="container-fluid main">
                {!this.state.user && <Redirect to={constants.routes.welcome} />}    
                <div className="jumbotron-fluid">
                    <h1 className="my-5">Dashboard</h1>
                    <div className="dropGroup">
                        <div>
                            <h4>Choose A Device</h4>
                            <div className="dropdown">
                                <button id="device" className="btn btn-danger dropdown-toggle my-3 mx-auto" type="button" data-toggle="dropdown">
                                {this.state.current}<span className="caret"></span></button>
                                <CategoryList refPath="Categories/Devices/" handleChange={(e) => this.handleDevChange(e)}/>
                            </div>
                        </div>
                    </div>
                </div>
                
                {this.state.prevPath !== '' && <Button color="danger" onClick={() => this.backOnClick()} className="m-2"><i className="fas fa-chevron-left back-icon mr-2"></i>{this.state.prev}</Button>}
                
                {this.state.folders.length > 0 &&
                    <Container className="folders-section p-3 mb-5">
                        {folderItems}
                    </Container>
                }    

                <div>
                    {this.state.editMode == true && <div className="delete-button">
                        <Button color="danger" className="m-2" onClick={() => this.deleteFiles()} >Delete Selected</Button>
                </div>}
                    <div className="row justify-content-between">
                        <div className="col-auto mr-auto">
                            <h4>Files:</h4>
                        </div>
                        <div className="col-auto fileBtns">
                            <Button color="danger" className="m-2"><i className="fas fa-plus-circle mr-2"></i><Link className="add-file-btn" to={constants.routes.content}>Add New File</Link></Button>
                            <Button color="secondary" className="m-2" onClick={() => this.editOnClick()} ><i className="fas fa-pencil-alt mr-2"></i>Edit</Button>
                        </div>
                        
                    </div>    
                    <FileTable files={this.state.files} editMode={this.state.editMode} handleEditCheckCallback={(e)=>this.handleEditCheck(e)}changeCallback={(e) => this.changeStatus(e)}/>   
                </div>     
            </div>
        )
    }
}




