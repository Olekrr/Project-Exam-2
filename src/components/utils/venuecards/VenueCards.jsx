import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaWifi, FaParking, FaCoffee, FaPaw } from "react-icons/fa";
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";
import "./venuecards.scss";

/**
 * VenueCard component to display venue details.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.venue - The venue details.
 * @param {function} [props.onEdit] - Function to handle editing the venue.
 * @param {function} [props.onDelete] - Function to handle deleting the venue.
 * @param {function} [props.onViewBookings] - Function to handle viewing bookings for the venue.
 * @returns {JSX.Element} - The rendered component.
 */
const VenueCard = ({ venue, onEdit, onDelete, onViewBookings }) => {
  const handleButtonClick = (e, callback) => {
    e.stopPropagation();
    e.preventDefault();
    if (callback) {
      callback(venue.id);
    }
  };

  return (
    <div className="venue-card">
      <div className="card-header">
        <h2 className="card-title">{venue.name}</h2>
        <p className="card-text price">${venue.price} / night</p>
      </div>
      <Link
        to={`/venues/${venue.id}`}
        className="text-decoration-none text-dark"
      >
        <div className="card-img-top-wrapper">
          <img
            src={venue.media[0]?.url || "default-placeholder.jpg"}
            alt={venue.media[0]?.alt || venue.name}
            className="card-img-top"
          />
        </div>
        <div className="card-body">
          <div className="description">
            <h3>Description</h3>
            <p>{venue.description}</p>
          </div>
          <div className="details-and-amenities">
            <div className="details">
              <p className="card-text guests">Max Guests: {venue.maxGuests}</p>
              <p className="card-text rating">Rating: {venue.rating}</p>
            </div>
            <div className="amenities">
              <div className="amenity">
                <FaWifi className="amenity-icon" />
                {venue.meta.wifi ? (
                  <IoMdCheckmarkCircle className="check-icon" />
                ) : (
                  <IoMdCloseCircle className="close-icon" />
                )}
              </div>
              <div className="amenity">
                <FaParking className="amenity-icon" />
                {venue.meta.parking ? (
                  <IoMdCheckmarkCircle className="check-icon" />
                ) : (
                  <IoMdCloseCircle className="close-icon" />
                )}
              </div>
              <div className="amenity">
                <FaCoffee className="amenity-icon" />
                {venue.meta.breakfast ? (
                  <IoMdCheckmarkCircle className="check-icon" />
                ) : (
                  <IoMdCloseCircle className="close-icon" />
                )}
              </div>
              <div className="amenity">
                <FaPaw className="amenity-icon" />
                {venue.meta.pets ? (
                  <IoMdCheckmarkCircle className="check-icon" />
                ) : (
                  <IoMdCloseCircle className="close-icon" />
                )}
              </div>
            </div>
          </div>
          {onEdit && onDelete && onViewBookings && (
            <div className="card-actions">
              <button
                onClick={(e) => handleButtonClick(e, onEdit)}
                className="btn btn-primary mt-3 mr-2"
              >
                Edit
              </button>
              <button
                onClick={(e) => handleButtonClick(e, onDelete)}
                className="btn btn-danger mt-3 mr-2"
              >
                Delete
              </button>
              <button
                onClick={(e) => handleButtonClick(e, onViewBookings)}
                className="btn btn-info mt-3"
              >
                View Bookings
              </button>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

VenueCard.propTypes = {
  venue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string
      })
    ).isRequired,
    price: PropTypes.number.isRequired,
    maxGuests: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    meta: PropTypes.shape({
      wifi: PropTypes.bool,
      parking: PropTypes.bool,
      breakfast: PropTypes.bool,
      pets: PropTypes.bool
    }).isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onViewBookings: PropTypes.func
};

export default VenueCard;
