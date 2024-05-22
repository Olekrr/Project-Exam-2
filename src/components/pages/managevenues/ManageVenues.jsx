import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import VenueList from "./components/venuelist/VenueList";

const ManageVenues = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const handleBackToProfile = () => {
    navigate(`/profile/${username}`);
  };

  const handleCreateVenue = () => {
    navigate(`/profile/${username}/manage-venues/create`);
  };

  return (
    <div className="manage-venues">
      <h1>Manage Venues</h1>
      <p>Here you can add, remove, or edit venues you manage.</p>
      <button onClick={handleCreateVenue} className="btn btn-primary">
        Add New Venue
      </button>
      <VenueList username={username} />
      <button onClick={handleBackToProfile} className="btn btn-secondary">
        Back to Profile
      </button>
    </div>
  );
};

export default ManageVenues;
