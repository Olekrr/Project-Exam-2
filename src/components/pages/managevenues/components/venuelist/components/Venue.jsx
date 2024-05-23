import React from "react";

const Venue = ({ venue, onEdit, onDelete, onViewBookings }) => {
  return (
    <div key={venue.id}>
      <h3>{venue.name}</h3>
      <img
        src={venue.media[0]?.url || "default-image.jpg"}
        alt={venue.media[0]?.alt || "Venue image"}
      />
      <p>{venue.description}</p>
      <div>Price: ${venue.price} per night</div>
      <div>Max Guests: {venue.maxGuests}</div>
      <div>Rating: {venue.rating} / 5</div>
      <button onClick={() => onEdit(venue.id)} className="btn btn-primary">
        Edit
      </button>
      <button onClick={() => onDelete(venue.id)} className="btn btn-danger">
        Delete
      </button>
      <button onClick={() => onViewBookings(venue.id)} className="btn btn-info">
        View Bookings
      </button>
    </div>
  );
};

export default Venue;
