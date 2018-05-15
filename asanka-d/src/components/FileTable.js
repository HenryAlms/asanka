import {Table, Button} from 'reactstrap';
import React from "react";
import '../css/aca.css';
import firebase from 'firebase/app';
import FileViewer from 'react-file-viewer';



export default class FileTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: this.props.files,
            query: this.props.query,
            filePath: ''
        }
    }

    componentDidMount() {
        this.setState({files: this.props.files});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({files: nextProps.files, query: nextProps.query})
    }

    viewFile(key) {
        console.log('Viewing file!');
        console.log(key);
        let storageRef = firebase.storage().ref(this.state.query + "/Files/");
        console.log(this.state.query + "/Files/" + key + '.pdf');
        // Create a reference to the file we want to download
        var fileRef = storageRef.child(key);
        fileRef.getDownloadURL().then(function(url) {
            window.open(url);
          }).catch(function(error) {
            // Handle any errors
            console.log(error);
            var fileRef = storageRef.child(key);
            fileRef.getDownloadURL().then(function(url) {
                window.open(url);
            }).catch(function(error) {
                console.log(error);
            })
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
                var date = new Date(file.timeCreated);
                var options = {hour: "numeric", minute:'numeric', year: 'numeric', month: 'short', day: 'numeric'};
                return (
                    <tr key={i}>
                        <td key={file.title + i}>{file.title}</td>
                        <td key={file.size + i}>{Math.round( file.size/1000 * 10 ) / 10}</td>
                        <td key={file.date + i}>{date.toLocaleDateString("en-US",options)}</td>
                        <td>
                            {/* <button id={file.title} onClick={() => this.downloadFile(file.title)}>Download</button> */}
                            
                            <Button color="success" id={file.title} onClick={() => this.viewFile(file.key)}>Open</Button></td>
                    </tr>
                )
            })
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