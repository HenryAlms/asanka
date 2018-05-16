import React, { Component } from 'react';
import { Navbar, NavbarBrand, Col, Container, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import '../css/Header.css';
import constants from './constants';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Navbar className="fixed-top header" color="faded" light>
                <NavbarBrand href="/" className="justify-content-center pt-3 mb-2"><img className="w-75" src="imgs/Asanka-logo-3.png"/></NavbarBrand>
                <NavbarBrand className="text-right">Content Management</NavbarBrand>
            </Navbar>    
        )
    }
}  