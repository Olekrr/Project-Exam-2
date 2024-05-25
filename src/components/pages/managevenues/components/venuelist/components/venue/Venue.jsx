import React from "react";
import "./venue.scss";

const Venue = ({ venue, onEdit, onDelete, onViewBookings }) => {
  return (
    <div className="venue-card card mb-4">
      <div className="card-body">
        <h3 className="card-title">{venue.name}</h3>
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
