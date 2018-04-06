import {Table} from 'reactstrap';
import React from "react";
import '../css/Dashboard.css';


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
        console.log(this.state.files);
        let fileItems = [];
        if (this.state.files) {
            fileItems = this.state.files.map((file) => {
                console.log('yay');
                return (
                    <tr key={file.title}>
                        <td>{file.title}</td>
                        <td>{file.type}</td>
                        <td>{file.active}</td>
                    </tr>    
                )
            })
        }    
            
        console.log(fileItems);
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