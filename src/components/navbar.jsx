import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


function Navbarr() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>BoneMui</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/platos">Platos</Nav.Link>
            <Nav.Link href="/ingredientes">Ingredientes</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
    </>
  );
}

export default Navbarr;