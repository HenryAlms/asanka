import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Col, Row, Container, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import '../css/TopNav.css';
import CategoryList from './CategoryList';

export class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    render() {
    return (
        <Row className="m-0" xs="0 " md="3" lg="2">
            <TopNavList/>
        </Row> 
    );
  }}

  class TopNavList extends Component {
    render() {
        return(
            <Nav className="navLinksTop w-100">
                <NavItem className="navText ml-0">
                    <img id="aLogo" className="ml-auto" src="./imgs/Asanka-logo.png" alt="Asanka Logo"/>
                </NavItem>
                <NavItem className="navText mx-auto my-2">
                        <button id="dev" className="btn btn-primary dropdown-toggle mx-auto" type="button" data-toggle="dropdown">
                        Choose a Device<span className="caret"></span></button>
                    <CategoryList id="Device Dropdown" refPath={null}/>
                </NavItem>
                <NavItem className="navText mr-2 my-2">
                    <Button id="logout" onClick={() => this.props.signOutCallback()} className="btn">Log Out</Button>
                </NavItem>
            </Nav>
        )
    }
}

export default TopNav;