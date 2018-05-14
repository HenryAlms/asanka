import React from "react";
import { Container, Button } from 'reactstrap';
import "../css/aca.css";

export default class Folder extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Button size="lg" onClick={() => this.props.onClickCallback()} className="m-3 folderBtn">
                <i className="fas fa-folder mr-2"></i>{this.props.folderName}
            </Button>
        )
    }
}