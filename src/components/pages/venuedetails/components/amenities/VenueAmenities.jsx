import React from "react";
import PropTypes from "prop-types";

const VenueAmenities = ({ meta }) => (
  <div>
    <h3>Amenities:</h3>
    <ul>
      {meta &&
        Object.keys(meta).map((key) => (
          <li key={key}>
            {key}: {meta[key] ? "Yes" : "No"}
          </li>
        ))}
    </ul>
  </div>
);

VenueAmenities.propTypes = {
  meta: PropTypes.object.isRequired,
};

export default VenueAmenities;
