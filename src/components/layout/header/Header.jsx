import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { logout } from "../../auth/logout/logout";
import { getProfileByName } from "../../../api/profiles";
import "./header.scss";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("username");
  const [isEventManager, setIsEventManager] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (username) {
        const token = localStorage.getItem("accessToken");
        const apiKey = localStorage.getItem("apiKey");

        if (token && apiKey) {
          try {
            const data = await getProfileByName(username, token, apiKey);
            if (data && data.data) {
              setIsEventManager(data.data.venueManager);
            }
          } catch (err) {
            console.error("Error fetching profile:", err);
          }
        }
      }
    };

    fetchProfileData();
  }, [username]);

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
      <Container>
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
                {isEventManager ? (
                  <Nav.Link
                    as={Link}
                    to={`/profile/${username}/manage-venues`}
                    className={
                      location.pathname === `/profile/${username}/manage-venues`
                        ? "active"
                        : ""
                    }
                  >
                    My Venues
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    as={Link}
                    to={`/profile/${username}/bookings`}
                    className={
                      location.pathname === `/profile/${username}/bookings`
                        ? "active"
                        : ""
                    }
                  >
                    My Bookings
                  </Nav.Link>
                )}
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
      </Container>
    </Navbar>
  );
};

export default Header;
