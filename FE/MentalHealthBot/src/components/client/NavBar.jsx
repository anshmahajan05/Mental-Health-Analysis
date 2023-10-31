import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../../global.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar
      bg='white'
      expand='lg'
      style={{ padding: "20px", boxShadow: "10px 10px 10px #e5e6e7" }}>
      <Navbar.Brand as={Link} to='/' className='app-name'>
        MentalMate
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto' style={{ marginLeft: "auto" }}>
          <Nav.Link as={Link} to='/'>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to='/login'>
            Login
          </Nav.Link>
          <Nav.Link as={Link} to='/register'>
            Register
          </Nav.Link>
          <Nav.Link as={Link} to='/therapist'>
            For Therapist
          </Nav.Link>
          <Nav.Link as={Link} to='/patient'>
            For Patients
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
