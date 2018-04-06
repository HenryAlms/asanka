import React from "react";
import { Container, Button } from 'reactstrap';
import "../css/aca.css";
import FileTable from "./FileTable.js"
import Folder from "./Folder.js";

export default class ACA extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container fluid>
                <Container className="main align-center p-4">
                    <h1><i class="back-button fas fa-arrow-circle-left"></i>        ASANKA Cloud</h1>
                    <hr />
                    <h2 className="pb-2 pt-1">Folders</h2>
                    <Container className="folders-section p-3 mb-5">
                        <Folder folderName={'Teacher 1'} />
                        <Folder folderName={'Teacher 2'} />
                        <Folder folderName={'Teacher 3'} />
                        <Folder folderName={'Teacher 4'} />
                        <Folder folderName={'Teacher 5'} />
                    </Container>
                    <h2 className="pb-2">Files in: English</h2>
                    <FileTable />
                </Container>
            </Container>
        )
    }
}