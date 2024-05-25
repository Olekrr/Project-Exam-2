import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Venue from "./components/venue/Venue";
import useVenues from "./hooks/useVenues";
import ConfirmDeleteModal from "./components/deletemodal/ConfirmDeleteModal";
import "./venuelist.scss";

const VenueList = ({ username }) => {
  const { venues, isLoading, error, deleteVenue } = useVenues(username);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState(null);

  const handleEdit = (id) => {
    navigate(`/profile/${username}/manage-venues/edit/${id}`);
  };

  const handleCreateVenue = () => {
    navigate(`/profile/${username}/manage-venues/create`);
  };

  const handleDeleteClick = (venue) => {
    setVenueToDelete(venue);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVenueToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (venueToDelete) {
      deleteVenue(venueToDelete.id);
    }
    handleCloseModal();
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (venues.length === 0) {
    return (
      <div className="venue-list">
        <p>No venues available. Start by adding your first venue!</p>
        <button onClick={handleCreateVenue} className="btn btn-primary">
          Add New Venue
        </button>
      </div>
    );
  }

  return (
    <div className="venue-list">
      {venues.map((venue) => (
        <Venue
          key={venue.id}
          venue={venue}
          onEdit={handleEdit}
          onDelete={() => handleDeleteClick(venue)}
          onViewBookings={() =>
            navigate(`/profile/${username}/manage-venues/${venue.id}/bookings`)
          }
        />
      ))}
      <button onClick={handleCreateVenue} className="btn btn-primary mt-3">
        Add Another Venue
      </button>
      <ConfirmDeleteModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default VenueList;
