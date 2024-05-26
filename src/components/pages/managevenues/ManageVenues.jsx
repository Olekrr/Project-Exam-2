import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import VenueList from "./components/venuelist/VenueList";
import "./managevenues.scss";

/**
 * ManageVenues component for managing the venues by the user.
 *
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
const ManageVenues = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  /**
   * Handles the back to profile navigation.
   */
  const handleBackToProfile = () => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="manage-venues container mt-5">
      <h1 className="mb-4">Manage Venues</h1>
      <p className="mb-4">
        Here you can add, remove, or edit venues you manage.
      </p>
      <VenueList username={username} />
      <button onClick={handleBackToProfile} className="btn btn-info mt-4">
        Back to Profile
      </button>
    </div>
  );
};

export default ManageVenues;
