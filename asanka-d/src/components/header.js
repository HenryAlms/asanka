import React from 'react';
import { Navbar, NavbarBrand, Button, NavItem, Nav } from 'reactstrap';

import '../css/header.css';

//Provides the global navigation header to move between pages or sign out
export default class Header extends React.Component {

    render() {
        return (
            <Navbar className="fixed-top header" color="faded" light>
                <NavbarBrand href="/" className="justify-content-center pt-3 mb-2"><img id="asanka-logo" alt="asanka-logo" src="imgs/Asanka-logo-3.png" /></NavbarBrand>
                <Nav>
                    <NavItem className="pr-5 nav-active">START</NavItem>
                    <NavItem className="pr-5">ADMIN</NavItem>
                    <NavItem className="pr-5">PROFILE</NavItem>
                    <NavItem className="pr-5"> <Button onClick={() => this.props.handleSignOut()}>LOG OUT</Button></NavItem>
                </Nav>
            </Navbar>
        )
    }
}