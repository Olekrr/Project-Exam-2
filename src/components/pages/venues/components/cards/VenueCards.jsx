import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const VenueCard = ({ venue }) => (
  <div className="venue-card">
    <Link to={`/venues/${venue.id}`}>
      <h2>{venue.name}</h2>
      <img src={venue.media[0]?.url} alt={venue.media[0]?.alt || venue.name} />
      <p>{venue.description}</p>,
    </Link>
  </div>
);

VenueCard.propTypes = {
  venue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string
      })
    ).isRequired,
    description: PropTypes.string.isRequired
  }).isRequired
};

export default VenueCard;
