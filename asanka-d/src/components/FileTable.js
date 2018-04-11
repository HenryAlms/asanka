import {Table} from 'reactstrap';
import React from "react";
import '../css/aca.css';


export default class FileTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: this.props.files
        }
    }

    componentDidMount() {
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
                if (file.active) {
                    active = "Active";
                } else {
                    active = "Inactive";
                }
                return (
                    <tr key={i}>
                        <td key={file.title + i}>{file.title}</td>
                        <td key={file.type + i}>{file.type}</td>
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
                </tr>
                </thead>
                <tbody>
                    {fileItems}
                </tbody>
            </Table>
        )
    }
}