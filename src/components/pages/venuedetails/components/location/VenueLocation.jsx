import React from "react";
import PropTypes from "prop-types";

const VenueLocation = ({ address, city, country }) => (
  <div>
    <h3>Location:</h3>
    <p>
      {address}, {city}, {country}
    </p>
  </div>
);

VenueLocation.propTypes = {
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

export default VenueLocation;
