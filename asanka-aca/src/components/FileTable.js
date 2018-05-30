import {Table, Input, FormGroup, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
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
            editMode: this.props.editMode
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
            <Table hover responsive className="myTable">
                <thead>
                <tr className="topRow">
                    <th>Title</th>
                    <th>Size (KB)</th>
                    <th>Date Uploaded</th>
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
            active: this.props.file.active,
            editMode: this.props.editMode,
            dropdownOpen: false,
            value: ''
        }
    }

    componentDidMount() {
        let active;
        if (this.props.active) {
            active = "Active";
        } else {
            active = "Inactive";
        }
        this.setState({file: this.props.file, active: this.props.file.active, editMode: this.props.editMode, value: active});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({file: nextProps.file, active: nextProps.file.active, editMode: nextProps.editMode})
    }

    toggle() {
        let open;
        if (this.state.dropdownOpen === true)
            open = false;
       
        else    
            open = true;    
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    
    select(event) {
        if (this.state.value !== event.target.innerText) {
            this.setState({
                dropdownOpen: !this.state.dropdownOpen,
                value: event.target.innerText
            });
        }    
    }


    render() {
        let key = String(this.props.i);
        let file = this.state.file; 
        console.log(file.key);
        let active;
        if (this.state.active) {
            active = "Active";
        } else {
            active = "Inactive";
        }
        var date = new Date(file.timeCreated);
        var options = {hour: "numeric", minute:'numeric', year: 'numeric', month: 'short', day: 'numeric'};
        return (
            <tr className="fade-in-2">
                <td key={file.title + key}>{this.state.editMode && <Input className="checkbox" value={file.key} type="checkbox" onChange={(e) => this.props.handleEditCheckCallback(e)}/>} {file.title}</td>
                <td key={file.size + key}>{Math.round( file.size/1000 * 10 ) / 10}</td>
                <td key={file.date + key}>{date.toLocaleDateString("en-US",options)}</td>
                <td key={active + key}>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggle()}>
                    <DropdownToggle outline color="secondary" className="active-btn" caret>
                        {this.state.value}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={(e) => {this.select(e); e.target.innerText !== this.state.value && this.props.changeCallback(e)}} value={file.key}>Active</DropdownItem>
                        <DropdownItem onClick={(e) => {this.select(e); e.target.innerText !== this.state.value && this.props.changeCallback(e)}} value={file.key}>Inactive</DropdownItem>
                    </DropdownMenu>
                </Dropdown>    
                    
                    {/*<FormGroup className="ml-3">
                        <Input className="checkbox" value={file.key} type="checkbox" id={file.title + (key * 2)} onChange={(e) => this.props.changeCallback(e)} checked={this.state.active} />
                        <Label for={file.title + (key * 2)}>{active}</Label>
        </FormGroup>*/}
                </td>
            </tr>  
        )
    }
}