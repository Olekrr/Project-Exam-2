import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * AuthenticationRequired component to inform users they need to log in to view a venue.
 * This component displays a message and provides buttons to navigate to the login or register page.
 *
 * @component
 */
const AuthenticationRequired = () => {
  const navigate = useNavigate();

  /**
   * Navigate to the login page.
   */
  const handleLogin = () => {
    navigate("/login");
  };

  /**
   * Navigate to the register page.
   */
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container auth-required-container">
      <h2>Authentication Required</h2>
      <p>You need to be logged in to view this venue.</p>
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
        <button className="btn btn-secondary" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default AuthenticationRequired;
