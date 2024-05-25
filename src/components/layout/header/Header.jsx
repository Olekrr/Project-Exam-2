import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { logout } from "../../auth/logout/logout";
import "./header.scss";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("username");

  const handleProfileClick = () => {
    if (username) {
      navigate(`/profile/${username}`);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="navbar">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="nav-buttons">
          <Nav.Link
            as={Link}
            to="/"
            className={location.pathname === "/" ? "active" : ""}
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/venues"
            className={location.pathname === "/venues" ? "active" : ""}
          >
            Venues
          </Nav.Link>
          {username ? (
            <>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              <Nav.Link
                onClick={handleProfileClick}
                className={
                  location.pathname.startsWith("/profile") ? "active" : ""
                }
              >
                Profile
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link
                as={Link}
                to="/login"
                className={`nav-link-login ${location.pathname === "/login" ? "active" : ""}`}
              >
                Sign-in
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/register"
                className={`nav-link-register ${location.pathname === "/register" ? "active" : ""}`}
              >
                Sign-up
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
