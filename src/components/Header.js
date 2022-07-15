import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


class Header extends Component {
  render() {
 
    return (
     
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="">Home</Nav.Link>
            <Nav.Link href="">Features</Nav.Link>
            <Nav.Link href="">Pricing</Nav.Link>
          </Nav>
        </Container>
    </Navbar>

        
    );
  }
}

export default Header;