import React from "react";
import { useNavigate } from "react-router-dom";
import "./profileupdatesuccess.scss";

const ProfileUpdateSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Profile Updated Successfully!</h1>
      <p>Your profile changes have been saved.</p>
      <button
        className="btn btn-primary"
        onClick={() => navigate(`/profile/${localStorage.getItem("username")}`)}
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
