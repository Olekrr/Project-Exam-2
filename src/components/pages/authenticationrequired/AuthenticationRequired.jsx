import React from "react";
import { useNavigate } from "react-router-dom";

const AuthenticationRequired = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

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
