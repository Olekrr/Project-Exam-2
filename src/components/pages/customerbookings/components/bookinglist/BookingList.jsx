import React from "react";
import "./bookinglist.scss";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const BookingList = ({ bookings, onEdit, onDelete }) => {
  if (bookings.length === 0) {
    return <p>No upcoming bookings found.</p>;
  }

  return (
    <ul className="booking-list">
      {bookings.map((booking) => (
        <li key={booking.id} className="booking-item">
          <div className="booking-info">
            <span>
              {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}:
              Guests {booking.guests}
            </span>
          </div>
          <div className="booking-actions">
            <button
              onClick={() => onEdit(booking.id)}
              className="btn btn-primary"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(booking.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookingList;
