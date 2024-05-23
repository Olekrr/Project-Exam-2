import React from "react";
import { useNavigate } from "react-router-dom";

const VenueCard = ({ venue }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/venues/${venue.id}`)}
      style={{
        display: "block",
        width: "100%",
        background: "none",
        border: "none",
        textAlign: "left",
        cursor: "pointer",
        padding: "10px"
      }}
    >
      <h3>{venue.name}</h3>
      <img
        src={venue.media[0]?.url || "default-placeholder.jpg"}
        alt={venue.media[0]?.alt || "Venue Image"}
        style={{ width: "100px", height: "100px" }}
      />
      <p>{venue.description}</p>
    </button>
  );
};

export default VenueCard;
