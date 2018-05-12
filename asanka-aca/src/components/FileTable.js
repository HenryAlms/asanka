import {Table, Input, FormGroup, Label} from 'reactstrap';
import React from "react";
import '../css/Dashboard.css';
import firebase from 'firebase/app';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import constants from './constants';




export default class FileTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: this.props.files,
            editMode: this.props.editMode,
        }
    }

    componentDidMount() {
        this.unregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) { //someone logged in!
              this.setState({ user: firebaseUser, loading: false, duplicateGames: [] });
            }
            else { //someone logged out
              this.setState({ user: null, duplicateGames: [] });
            }
        });
        this.setState({files: this.props.files, editMode: this.props.editMode});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({files: nextProps.files, editMode: nextProps.editMode});
    }

    render() {

        let fileItems = [];
        if (this.state.files.length !== 0 && this.state.files != undefined && this.state.files != null) {
            fileItems = this.state.files.map((file, i) => {
                return (
                    <File handleEditCheckCallback={(e) => this.props.handleEditCheckCallback(e)} editMode={this.state.editMode} file={file} key={i} i={i} active={file.active} changeCallback={(e) => this.props.changeCallback(e)} />     
                )
            })
        }
            
        return (
            <Table className="myTable">
                <thead>
                <tr className="topRow">
                    <th>Title</th>
                    <th>Size (KB)</th>
                    <th>Time Uploaded</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                    {fileItems}
                </tbody>
            </Table>
        )
    }
}

class File extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: this.props.file,
            active: this.props.active,
            editMode: this.props.editMode
        }
    }

    componentDidMount() {
        this.setState({file: this.props.file, active: this.props.file.active, editMode: this.props.editMode});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({file: nextProps.file, active: nextProps.active, editMode: nextProps.editMode})
    }

    editFile() {

    }

    render() {
        let key = String(this.props.i);
        let file = this.state.file;
        console.log(file);
        console.log("title: " + file.title); 
        console.log("time: " + file.time); 
        let active;
        if (this.state.active) {
            active = "Active";
        } else {
            active = "Inactive";
        }
        return (
            <tr>
                <td key={file.title + key}>{this.state.editMode && <Input className="checkbox" value={file.title} type="checkbox" onChange={(e) => this.props.handleEditCheckCallback(e)}/>} {file.title}</td>
                <td key={file.type + key}>{Math.round( file.size/1000 * 10 ) / 10}</td>
                <td key={file.size + key}>{file.timeCreated}</td>
                <td key={active + key}>
                    <FormGroup className="ml-3">
                        <Input className="checkbox" value={file.key} type="checkbox" id={file.title + (key * 2)} onChange={(e) => this.props.changeCallback(e)} checked={this.state.active} />
                        <Label for={file.title + (key * 2)}>{active}</Label>
                    </FormGroup>
                </td>
            </tr>  
        )
    }
}