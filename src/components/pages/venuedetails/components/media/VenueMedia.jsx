import React from "react";
import PropTypes from "prop-types";

const VenueMedia = ({ media, name }) => (
  <img src={media[0]?.url} alt={media[0]?.alt || name} />
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
