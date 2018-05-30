import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Col, Container, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import '../css/Navbar.css';
import constants from './constants';

export class MyNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    render() {
    return (
        <Col className="m-0" xs="0 " md="3" lg="2">
            <Container className="sidebar">
                <NavList signOutCallback={()=>this.props.signOutCallback()}/>
            </Container>  
        </Col> 
    );
  }}

  class NavList extends Component {

    checkCurrent(click, current) {
        if(click == current) {
            //do nothing
        } else {
            //return click
        }
    }
    
    render() {
        return(
            <Nav navbar className="mr-auto navLinks">
                <NavItem className="navText">
                    <NavLink to={constants.routes.dashboard}>
                        Dashboard
                    </NavLink>
                </NavItem>
                <NavItem className="navText">
                    <NavLink to={constants.routes.categories}>
                        Categories
                    </NavLink>
                </NavItem>
                <NavItem className="navText">
                    <NavLink to={constants.routes.content}>
                        New Content
                    </NavLink>
                </NavItem>
                <NavItem className="navText">
                    <NavLink to={constants.routes.profile}>
                        Profile
                    </NavLink>
                </NavItem>
                <NavItem className="navText">
                    <NavLink to={constants.routes.dashboard}>
                        <Button onClick={() => this.props.signOutCallback()} className="btn">Log Out</Button>
                    </NavLink>
                </NavItem>
            </Nav>
        )
    }
}

export default MyNav;