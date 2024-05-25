import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  return (
    <div className="container welcome-container">
      <h1>Welcome to Holidaze {username}!</h1>
      <p>
        We noticed that your profile is not yet complete. Completing your
        profile helps us to better understand your needs and provide you with
        the best possible venue booking experience.
      </p>
      <button
        className="btn btn-primary"
        onClick={() => navigate(`/profile/${username}/edit`)}
      >
        Edit Profile
      </button>
      <button className="btn btn-info" onClick={() => navigate("/")}>
        Remind Me Later
      </button>
    </div>
  );
};

export default Welcome;
