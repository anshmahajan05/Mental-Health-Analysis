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
          <Nav.Link
            className='navLink'
            as={Link}
            to='/'
            style={{
              paddingLeft: "35px",
              paddingRight: "35px",
              fontWeight: "500",
              fontSize: "20px",
            }}>
            Home
          </Nav.Link>
          <Nav.Link
            className='navLink'
            as={Link}
            to='/login'
            style={{
              paddingLeft: "35px",
              paddingRight: "35px",
              fontWeight: "500",
              fontSize: "20px",
            }}>
            Login
          </Nav.Link>
          <Nav.Link
            className='navLink'
            as={Link}
            to='/register'
            style={{
              paddingLeft: "35px",
              paddingRight: "35px",
              fontWeight: "500",
              fontSize: "20px",
            }}>
            Register
          </Nav.Link>
          <Nav.Link
            className='navLink'
            as={Link}
            to='/therapist'
            style={{
              paddingLeft: "35px",
              paddingRight: "35px",
              fontWeight: "500",
              fontSize: "20px",
            }}>
            For Therapist
          </Nav.Link>
          <Nav.Link
            className='navLink'
            as={Link}
            to='/patient'
            style={{
              paddingLeft: "35px",
              paddingRight: "35px",
              fontWeight: "500",
              fontSize: "20px",
            }}>
            For Patients
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
