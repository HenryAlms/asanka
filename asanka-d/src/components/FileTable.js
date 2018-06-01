import React from "react";
import { Table, Button } from 'reactstrap';

import firebase from 'firebase/app';

import '../css/aca.css';

export default class FileTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: this.props.files,
            query: this.props.query,
        }
    }

    componentDidMount() {
        this.setState({ files: this.props.files });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ files: nextProps.files, query: nextProps.query })
    }

    viewFile(key) {
        let storageRef = firebase.storage().ref(this.state.query + "/Files/");
        // Create a reference to the file we want to download
        let fileRef = storageRef.child(key);
        fileRef.getDownloadURL().then(function (url) {
            window.open(url);
        }).catch(function (error) {
            // Handle any errors
            let fileRef = storageRef.child(key);
            fileRef.getDownloadURL().then(function (url) {
                window.open(url);
            }).catch(function (error) {
                alert(error);
            })
        });
    }

    render() {
        //Format the files into a table row to be displayed on the device homepage
        let fileItems = [];
        if (this.state.files !== null && this.state.files !== undefined && this.state.files.length !== 0) {
            fileItems = this.state.files.map((file, i) => {
                i = String(i);
                let date = new Date(file.timeCreated);
                let options = { hour: "numeric", minute: 'numeric', year: 'numeric', month: 'short', day: 'numeric' };
                return (
                    <tr key={i}>
                        <td key={file.title + i}>{file.title}</td>
                        <td key={file.size + i}>{Math.round(file.size / 1000 * 10) / 10}</td>
                        <td key={file.date + i}>{date.toLocaleDateString("en-US", options)}</td>
                        <td>
                            <Button color="success" id={file.title} onClick={() => this.viewFile(file.key)}>Open</Button></td>
                    </tr>
                );
            });
        }
        return (
            <Table className="myTable">
                <thead>
                    <tr className="topRow">
                        <th>Title</th>
                        <th>Size (KB)</th>
                        <th>Date Uploaded</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {fileItems}
                </tbody>
            </Table>
        )
    }
}