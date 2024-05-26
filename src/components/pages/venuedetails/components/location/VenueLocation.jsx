import React from "react";
import PropTypes from "prop-types";
import "./venuelocation.scss";

/**
 * Component to display the location information of a venue.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.address - The address of the venue.
 * @param {string} props.city - The city where the venue is located.
 * @param {string} props.country - The country where the venue is located.
 * @returns {JSX.Element} The VenueLocation component.
 */
const VenueLocation = ({ address, city, country }) => (
  <div className="venue-location">
    <h2>Location:</h2>
    <p>
      {address}, {city}, {country}
    </p>
  </div>
);

VenueLocation.propTypes = {
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired
};

export default VenueLocation;
