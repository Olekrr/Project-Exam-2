import React from "react";
import { useNavigate } from "react-router-dom";
import Venue from "./components/Venue";
import useVenues from "./hooks/useVenues";

const VenueList = ({ username }) => {
  const { venues, isLoading, error, deleteVenue } = useVenues(username);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/profile/${username}/manage-venues/edit/${id}`);
  };

  const handleCreateVenue = () => {
    navigate(`/profile/${username}/manage-venues/create`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (venues.length === 0) {
    return (
      <div>
        <p>No venues available. Start by adding your first venue!</p>
        <button onClick={handleCreateVenue} className="btn btn-primary">
          Add New Venue
        </button>
      </div>
    );
  }

  return (
    <div>
      {venues.map((venue) => (
        <Venue
          key={venue.id}
          venue={venue}
          onEdit={handleEdit}
          onDelete={deleteVenue}
          onViewBookings={() =>
            navigate(`/profile/${username}/manage-venues/${venue.id}/bookings`)
          }
        />
      ))}
      <button onClick={handleCreateVenue} className="btn btn-secondary mt-3">
        Add Another Venue
      </button>
    </div>
  );
};

export default VenueList;
