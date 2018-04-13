import {Table} from 'reactstrap';
import React from "react";
import '../css/aca.css';
import firebase from 'firebase/app';


export default class FileTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: this.props.files,
            query: this.props.query
        }
    }

    componentDidMount() {
        this.setState({files: this.props.files});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({files: nextProps.files, query: nextProps.query})
    }

    downloadFile(fileTitle) {
        console.log(fileTitle);
        let storageRef = firebase.storage().ref(this.state.query + "/Files/");
        console.log(this.state.query);
        // Create a reference to the file we want to download
        var fileRef = storageRef.child(fileTitle);
        fileRef.getDownloadURL().then(function(url) {
            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
                var blob = xhr.response;
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                a.href = url;
                a.download = fileTitle;
                a.click();
            };
            xhr.send();
          }).catch(function(error) {
            // Handle any errors
            console.log(error);
          });
    }

    render() {
        let fileItems = [];
        console.log(this.state.files);
        if (this.state.files != null && this.state.files != undefined && this.state.files.length !== 0) {
            fileItems = this.state.files.map((file, i) => {
                let active;
                console.log(file);
                if (file.active !== undefined || file.active !== null || file.active === true) {
                    active = "Active";
                } else {
                    active = "Inactive";
                }
                i = String(i);
                return (
                    <tr key={i}>
                        <td key={file.title + i}>{file.title}</td>
                        <td key={file.type + i}>{file.type}</td>
                        <td><a id={file.title} onClick={() => this.downloadFile(file.title)}>Download</a></td>
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