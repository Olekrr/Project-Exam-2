import React from "react";
import PropTypes from "prop-types";
import "./venueamenities.scss";

const VenueAmenities = ({ meta }) => (
  <div className="venue-amenities">
    <h3>Amenities:</h3>
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
