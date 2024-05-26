import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Venue from "./components/venue/Venue";
import useVenues from "./hooks/useVenues";
import ConfirmDeleteModal from "./components/deletemodal/ConfirmDeleteModal";
import "./venuelist.scss";

/**
 * VenueList component to display and manage a list of venues.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.username - The username of the venue manager.
 * @returns {JSX.Element} - The rendered component.
 */
const VenueList = ({ username }) => {
  const { venues, error, deleteVenue } = useVenues(username);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState(null);

  /**
   * Handles editing a venue.
   *
   * @param {string} id - The ID of the venue to edit.
   */
  const handleEdit = (id) => {
    navigate(`/profile/${username}/manage-venues/edit/${id}`);
  };

  /**
   * Handles creating a new venue.
   */
  const handleCreateVenue = () => {
    navigate(`/profile/${username}/manage-venues/create`);
  };

  /**
   * Handles the click event for deleting a venue.
   *
   * @param {Object} venue - The venue to delete.
   */
  const handleDeleteClick = (venue) => {
    setVenueToDelete(venue);
    setShowModal(true);
  };

  /**
   * Handles closing the delete confirmation modal.
   */
  const handleCloseModal = () => {
    setShowModal(false);
    setVenueToDelete(null);
  };

  /**
   * Handles confirming the deletion of a venue.
   */
  const handleConfirmDelete = () => {
    if (venueToDelete) {
      deleteVenue(venueToDelete.id);
    }
    handleCloseModal();
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!venues.length) {
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
