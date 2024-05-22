import React from "react";
import { useNavigate } from "react-router-dom";
import Venue from "./components/Venue";
import useVenues from "./hooks/useVenues";

const VenueList = ({ username }) => {
  const navigate = useNavigate();
  const { venues, error, deleteVenue } = useVenues(username);

  const handleEdit = (id) => {
    navigate(`/profile/${username}/manage-venues/edit/${id}`);
  };

  if (error) return <div>Error: {error}</div>;
  if (venues.length === 0) return <div>No venues available.</div>;

  return (
    <div>
      {venues.map((venue) => (
        <Venue
          key={venue.id}
          venue={venue}
          onEdit={handleEdit}
          onDelete={deleteVenue}
        />
      ))}
    </div>
  );
};

export default VenueList;
