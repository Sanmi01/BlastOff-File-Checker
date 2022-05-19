import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="header">
        <Container>
          <Navbar.Brand as={Link} to="/">
            BlastOff File Checker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="flex-grow-0">
            <Nav defaultActiveKey="" className="">
              <Nav.Link as={Link} to="/">
                Error Check
              </Nav.Link>
              <Nav.Link as={Link} to="/spellingCheck">
                Spelling Check
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;