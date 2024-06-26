import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { getProfileByName } from "../../../api/profiles";
import { useAuth } from "../../../contexts/authContext";
import "./header.scss";

/**
 * Header component for the Holidaze application.
 * This component displays the navigation bar with links to various pages.
 * It also handles the logic for displaying user-specific links based on authentication status.
 *
 * @component
 */
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authData, handleLogout } = useAuth();
  const { username, accessToken, apiKey } = authData;
  const [isEventManager, setIsEventManager] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (username && accessToken && apiKey) {
        try {
          const data = await getProfileByName(username, accessToken, apiKey);
          if (data && data.data) {
            setIsEventManager(data.data.venueManager);
          }
        } catch (err) {
          console.error("Error fetching profile:", err);
        }
      }
    };

    fetchProfileData();
  }, [username, accessToken, apiKey]);

  const handleProfileClick = () => {
    if (username) {
      navigate(`/profile/${username}`);
    } else {
      navigate("/login");
    }
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
