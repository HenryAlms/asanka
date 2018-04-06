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
        /*console.log(this.state.files);
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
        }    */
            
        return (
            <Table className="myTable">
                <thead>
                <tr className="topRow">
                    <th>File Title</th>

                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>GES English Syllabus</td>

                    </tr> 
                    <tr>
                        <td>Standard Test 1</td>

                    </tr> 
                    <tr>
                        <td>Standard Test 2</td>

                    </tr> 
                    <tr>
                        <td>Standard Test Study Guide</td>

                    </tr>    
                </tbody>
            </Table>
        )
    }
}