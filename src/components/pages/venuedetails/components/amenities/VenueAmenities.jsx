import React from "react";
import PropTypes from "prop-types";
import "./venueamenities.scss";

/**
 * Component to display the amenities available at a venue.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.meta - The meta data containing amenities information.
 * @returns {JSX.Element} The VenueAmenities component.
 */
const VenueAmenities = ({ meta }) => (
  <div className="venue-amenities">
    <h2>Amenities:</h2>
    <ul>
      {meta &&
        Object.keys(meta).map((key) => (
          <li key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
            {meta[key] ? "Yes" : "No"}
          </li>
        ))}
    </ul>
  </div>
);

VenueAmenities.propTypes = {
  meta: PropTypes.object.isRequired
};

export default VenueAmenities;
