import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Col, Container, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

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
                <NavList />
            </Container>  
        </Col> 
    );
  }}

  class NavList extends Component {
    render() {
        return(
            <Nav navbar className="mr-auto navLinks">
                <NavItem className="navText">
                    <NavLink to="/Dashboard">
                        <i className="fa fa-home" aria-hidden="true"></i>{'    '}Dashboard
                    </NavLink>
                </NavItem>
                <NavItem className="navText">
                    <NavLink to="/Dashboard">
                        <i className="fa fa-users" aria-hidden="true"></i>{'    '}Categories
                    </NavLink>
                </NavItem>
                <NavItem className="navText">
                    <NavLink to="/Dashboard">
                        <i className="fa fa-calendar" aria-hidden="true"></i>{'    '}Devices
                    </NavLink>
                </NavItem>
                <NavItem className="navText">
                    <NavLink to="/Dashboard">
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>{'    '}Users
                    </NavLink>
                </NavItem>
                <NavItem className="navText">
                    <NavLink to="/Dashboard">
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>{'    '}Profile
                    </NavLink>
                </NavItem>
                <NavItem className="navText">
                    <Button onClick={() => this.props.signOutCallback()} className="btn">Log Out</Button>
                </NavItem>
            </Nav>
        )
    }
}

export default MyNav;