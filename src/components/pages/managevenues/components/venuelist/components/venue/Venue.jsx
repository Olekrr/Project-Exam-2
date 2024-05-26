import React from "react";
import "./venue.scss";

/**
 * Venue component to display venue details and action buttons.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.venue - The venue details.
 * @param {function} props.onEdit - Function to handle editing the venue.
 * @param {function} props.onDelete - Function to handle deleting the venue.
 * @param {function} props.onViewBookings - Function to handle viewing bookings for the venue.
 * @returns {JSX.Element} - The rendered component.
 */
const Venue = ({ venue, onEdit, onDelete, onViewBookings }) => {
  return (
    <div className="venue-card card mb-4">
      <div className="card-body">
        <h2 className="card-title">{venue.name}</h2>
        <img
          src={venue.media[0]?.url || "default-image.jpg"}
          alt={venue.media[0]?.alt || "Venue image"}
          className="card-img-top mb-3"
        />
        <p className="card-text">{venue.description}</p>
        <div className="card-text">Price: ${venue.price} per night</div>
        <div className="card-text">Max Guests: {venue.maxGuests}</div>
        <div className="card-text">Rating: {venue.rating} / 5</div>
        <button
          onClick={() => onEdit(venue.id)}
          className="btn btn-primary mt-3 mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(venue.id)}
          className="btn btn-danger mt-3 mr-2"
        >
          Delete
        </button>
        <button
          onClick={() => onViewBookings(venue.id)}
          className="btn btn-info mt-3"
        >
          View Bookings
        </button>
      </div>
    </div>
  );
};

export default Venue;
