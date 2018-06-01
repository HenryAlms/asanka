import React from "react";
import { Button } from 'reactstrap';

import "../css/Dashboard.css";

//Creates folders displayed on the dashboard
export default class Folder extends React.Component {

    render() {
        return (
            <Button size="lg" onClick={() => this.props.onClickCallback()} className="mr-3 mb-3 folderBtn fade-in-2">
                <i className="fas fa-folder mr-2"></i>{this.props.folderName}
            </Button>
        )
    }
}