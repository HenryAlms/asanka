import React from "react";
import { Container, Button } from 'reactstrap';
import "../css/Dashboard.css";

export default class Folder extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Button size="lg" onClick={() => this.props.onClickCallback()} className="mr-3 mb-3 folderBtn">
                <i className="fas fa-folder mr-2"></i>{this.props.folderName}
            </Button>
        )
    }
}