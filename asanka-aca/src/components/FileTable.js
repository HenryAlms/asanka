import {Table} from 'reactstrap';
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

    render() {

        let fileItems = [];
        if (this.state.files != null && this.state.files != undefined && this.state.files.length != 0) {
            fileItems = this.state.files.map((file, i) => {
                let active;
                if (file) {
                    active = "Active";
                } else {
                    active = "Inactive";
                }
                return (
                    <tr key={i}>
                        <td key={file.title + i}>{file.title}</td>
                        <td key={file.type + i}>{file.type}</td>
                        <td key={active + i}>{active}</td>
                    </tr>    
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