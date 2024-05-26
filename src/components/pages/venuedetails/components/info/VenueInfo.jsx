import React from "react";
import PropTypes from "prop-types";
import "./venueinfo.scss";

/**
 * Component to display the basic information of a venue.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.description - The description of the venue.
 * @param {number} props.price - The price per night of the venue.
 * @param {number} props.maxGuests - The maximum number of guests allowed.
 * @param {number} props.rating - The rating of the venue.
 * @returns {JSX.Element} The VenueInfo component.
 */
const VenueInfo = ({ description, price, maxGuests, rating }) => (
  <div className="venue-info">
    <p className="description">{description}</p>
    <p className="info">Price: ${price}</p>
    <p className="info">Max Guests: {maxGuests}</p>
    <p className="info">Rating: {rating}</p>
  </div>
);

VenueInfo.propTypes = {
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  maxGuests: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired
};

export default VenueInfo;
