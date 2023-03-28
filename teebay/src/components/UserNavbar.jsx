import React from 'react';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import {unsetUserId} from "../common/localStorageSetup"
import  {useNavigate} from "react-router-dom"
const UserNavbar = () => {
  const navigate =useNavigate();
    const handleLogout = () => {
      // code to handle user logout
      unsetUserId();
      navigate('/log-in');
      

    };
  
    return (
      <Navbar collapseOnSelect expand="lg" sticky="top" >
        <Container>
        <Navbar.Brand href="/my-products">Teebay</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/all-products">All Products</Nav.Link>
            <Nav.Link href="/my-products">My Products</Nav.Link>
            <Nav.Link href="/activity">Activity History</Nav.Link>
            
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}><Button>Log out</Button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };
  export default  UserNavbar;
  