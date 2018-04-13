import {Table, Input} from 'reactstrap';
import React from "react";
import '../css/Dashboard.css';
import firebase from 'firebase/app';



export default class FileTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: this.props.files
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
        this.setState({files: this.props.files});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({files: nextProps.files})
    }

    /*editTeam(event) {
        let team = event.target.value;
        let checked = event.target.checked;
        let updatedLikes = {};
        let teamsRef = firebase.database().ref('userPrefs/' + this.state.user.uid + '/teams/');
        teamsRef.once('value', (r) => {
            let data = r.val();
            if (data === undefined || data === null) {
                if (checked) {
                    updatedLikes[team] = checked;
                }
            } else { // if there is data currently
                updatedLikes = data;
                if (checked) {
                    updatedLikes[team] = true;
                } else {
                    updatedLikes[team] = null;
                }
            }
            teamsRef.set(updatedLikes)
                .catch(e => console.log(e));
        })
            .then(() => {
                this.setState({ likes: updatedLikes });
            });
    }*/



    render() {

        let fileItems = [];
        if (this.state.files != null && this.state.files != undefined && this.state.files.length != 0) {
            fileItems = this.state.files.map((file, i) => {
                return (
                    <File file={file} key={i} i={i} active={file.active} changeCallback={(e) => this.props.changeCallback(e)} />     
                )
            })
        }
            
        return (
            <Table className="myTable">
                <thead>
                <tr className="topRow">
                    <th>Title</th>
                    <th>File Type</th>
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
        }
    }

    componentDidMount() {
        this.setState({active: this.props.file.active});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({file: nextProps.file, active: nextProps.active})
    }

    render() {
        let key = String(this.props.i);
        let file = this.state.file; 
        let active;
        if (this.state.active) {
            active = "Active";
        } else {
            active = "Inactive";
        }
        return (
            <tr key={key}>
                <td key={file.title + key}>{file.title}</td>
                <td key={file.type + key}>{file.type}</td>
                <td key={active + key}>{active}<Input className="checkbox" value={file.key} type="checkbox" id={file.title + (key * 2)} onChange={(e) => this.props.changeCallback(e)} checked={this.state.active} /></td>
            </tr>  
        )
    }
}