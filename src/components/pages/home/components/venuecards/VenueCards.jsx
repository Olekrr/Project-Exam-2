import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./venuecards.scss";

/**
 * VenueCard component to display venue details.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.venue - The venue details.
 * @returns {JSX.Element} - The rendered component.
 */
const VenueCard = ({ venue }) => (
  <div className="venue-card">
    <Link to={`/venues/${venue.id}`} className="text-decoration-none text-dark">
      <img
        src={venue.media[0]?.url || "default-placeholder.jpg"}
        alt={venue.media[0]?.alt || venue.name}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{venue.name}</h5>
        <p className="card-text">Price: ${venue.price}</p>
        <p className="card-text">Max Guests: {venue.maxGuests}</p>
        <p className="card-text">Rating: {venue.rating}</p>
        <div>
          <p className="card-text">WiFi: {venue.meta.wifi ? "Yes" : "No"}</p>
          <p className="card-text">
            Parking: {venue.meta.parking ? "Yes" : "No"}
          </p>
          <p className="card-text">
            Breakfast: {venue.meta.breakfast ? "Yes" : "No"}
          </p>
          <p className="card-text">
            Pets Allowed: {venue.meta.pets ? "Yes" : "No"}
          </p>
        </div>
      </div>
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
    price: PropTypes.number.isRequired,
    maxGuests: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    meta: PropTypes.shape({
      wifi: PropTypes.bool,
      parking: PropTypes.bool,
      breakfast: PropTypes.bool,
      pets: PropTypes.bool
    }).isRequired
  }).isRequired
};

export default VenueCard;
