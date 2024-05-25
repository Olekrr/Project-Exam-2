import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../../contexts/authContext";
import "./profileupdatesuccess.scss";

const ProfileUpdateSuccess = () => {
  const navigate = useNavigate();
  const { authData } = useAuth();
  const username = authData.username;

  return (
    <div className="container">
      <h1>Profile Updated Successfully!</h1>
      <p>Your profile changes have been saved.</p>
      <button
        className="btn btn-primary"
        onClick={() => navigate(`/profile/${username}`)}
      >
        Visit Profile
      </button>
      <button className="btn btn-info" onClick={() => navigate("/venues")}>
        Browse Venues
      </button>
    </div>
  );
};

export default ProfileUpdateSuccess;
