import React from "react";
import PropTypes from "prop-types";
import "./venuemedia.scss";

const VenueMedia = ({ media, name }) => (
  <div className="venue-media">
    <img
      src={media[0]?.url}
      alt={media[0]?.alt || name}
      className="img-fluid fixed-size"
    />
  </div>
);

VenueMedia.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string
    })
  ).isRequired,
  name: PropTypes.string.isRequired
};

export default VenueMedia;
