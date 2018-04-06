import React, { Component } from 'react';
import { Navbar, NavbarBrand, Col, Container, Button, NavItem, Nav } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import '../css/header.css';
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
                <NavbarBrand href="/" className="justify-content-center pt-3 pl-2"><p className="navBrand">Asanka</p></NavbarBrand>
                <Nav>
                    <NavItem className="pr-5 nav-active">START</NavItem>
                    <NavItem className="pr-5">ADMIN</NavItem>
                    <NavItem className="pr-5">PROFILE</NavItem>
                    <NavItem className="pr-5">LOG OUT</NavItem>
                </Nav>    
            </Navbar>    
        )
    }
}