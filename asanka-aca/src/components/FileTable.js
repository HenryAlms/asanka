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
        console.log(this.props.files);
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
        console.log('Next props length is ' + nextProps.files.length);
        this.setState({files: nextProps.files})
    }

    render() {
        console.log(this.state.files);
        console.log(this.state.files.length);
        console.log(this.state.files[0]);
        let fileItems = [];
        if (this.state.files != null && this.state.files != undefined && this.state.files.length != 0) {
            console.log(this.state.files);
            fileItems = this.state.files.map((file) => {
                console.log(file.key);
                return (
                    <tr key={file.key}>
                        <td>{file.title}</td>
                        <td>{file.type}</td>
                        <td>{file.active}</td>
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