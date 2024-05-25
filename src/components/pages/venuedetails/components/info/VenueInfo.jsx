import React from "react";
import PropTypes from "prop-types";
import "./venueinfo.scss";

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
