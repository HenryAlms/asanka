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
                <NavbarBrand href="/" className="justify-content-center pt-3 mb-2 asanka-logo"><img className="w-75" src="imgs/Asanka-logo-3.png"/></NavbarBrand>
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