import React from "react";
import PropTypes from "prop-types";
import "./venuemedia.scss";

/**
 * Component to display the media of a venue.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array} props.media - Array of media objects containing URLs and alt text.
 * @param {string} props.name - The name of the venue.
 * @returns {JSX.Element} The VenueMedia component.
 */
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
