import React from "react";
import { Container, Button } from 'reactstrap';
import "../css/aca.css";

export default class Folder extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Button  onClick={() => this.props.onClickCallback()} className="mr-3 mb-3 folderBtn">
                {this.props.folderName}
            </Button>
        )
    }
}