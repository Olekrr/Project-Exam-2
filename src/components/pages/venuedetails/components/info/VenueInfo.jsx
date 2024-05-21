import React from "react";
import PropTypes from "prop-types";

const VenueInfo = ({ description, price, maxGuests, rating }) => (
  <div className="venue-info">
    <p>{description}</p>
    <p>Price: ${price}</p>
    <p>Max Guests: {maxGuests}</p>
    <p>Rating: {rating}</p>
  </div>
);

VenueInfo.propTypes = {
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  maxGuests: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired
};

export default VenueInfo;
