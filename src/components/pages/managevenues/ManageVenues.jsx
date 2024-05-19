import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const ManageVenues = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const handleBackToProfile = () => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="manage-venues">
      <h1>Manage Venues</h1>
      <p>Here you can add, remove, or edit venues you manage.</p>
      <button onClick={handleBackToProfile}>Back to Profile</button>
    </div>
  );
};

export default ManageVenues;
