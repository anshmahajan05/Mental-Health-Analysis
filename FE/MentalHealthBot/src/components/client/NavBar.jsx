import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../../global.css";
import { Link } from "react-router-dom";
import useAuth from "../../../utils/useAuth";

function NavBar() {
  const { token } = useAuth();

  return (
    <Navbar
      bg="white"
      expand="lg"
      style={{ padding: "20px", boxShadow: "10px 10px 10px #e5e6e7" }}
    >
      <Navbar.Brand as={Link} to="/" className="app-name">
        MentalMate
      </Navbar.Brand>
      {!!token && 
      <>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" style={{ marginLeft: "auto" }}>
            <Nav.Link
              className="navLink"
              as={Link}
              to="/dashboard"
              style={{
                paddingLeft: "35px",
                paddingRight: "35px",
                fontWeight: "500",
                fontSize: "20px",
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              className="navLink"
              as={Link}
              to="/subscription"
              style={{
                paddingLeft: "35px",
                paddingRight: "35px",
                fontWeight: "500",
                fontSize: "20px",
              }}
            >
              Subscription
            </Nav.Link>
            <Nav.Link
              className="navLink"
              as={Link}
              to="/chatbot"
              style={{
                paddingLeft: "35px",
                paddingRight: "35px",
                fontWeight: "500",
                fontSize: "20px",
              }}
            >
              Chatbot
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </>}
    </Navbar>
  );
}

export default NavBar;
