import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

import '../css/Header.css';

//Adds content management header in the top right corner
export default class Header extends React.Component {
    render() {
        return (
            <Navbar className="fixed-top header" color="faded" light>
                <NavbarBrand href="/" className="justify-content-center pt-3 mb-2"><img className="w-75" src="imgs/Asanka-logo-3.png" alt="Asanka-Logo"/></NavbarBrand>
                <NavbarBrand className="text-right">Content Management</NavbarBrand>
            </Navbar>
        )
    }
}  