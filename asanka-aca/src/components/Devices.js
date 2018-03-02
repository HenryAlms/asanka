import React from "react";
import { Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import constants from './constants';

export default class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Container fluid className="mt-5">
                {!this.props.user && <Redirect to={constants.routes.welcome} />}
                <h1>Devices</h1>
            </Container>    
        )
    }
}
