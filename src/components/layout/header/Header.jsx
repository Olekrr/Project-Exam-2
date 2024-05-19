import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleProfileClick = () => {
    if (username) {
      navigate(`/profile/${username}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Holidaze</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/venues">
            Venues
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
          <Nav.Link as={Link} to="/register">
            Register
          </Nav.Link>
          <Nav.Link onClick={handleProfileClick}>Profile</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
