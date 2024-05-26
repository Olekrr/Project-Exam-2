import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./bookingupdatesuccess.scss";

const BookingUpdateSuccess = ({ booking }) => {
  const navigate = useNavigate();

  return (
    <div className="container booking-update-success">
      <h1>Booking Updated Successfully!</h1>
      <p>Your booking has been updated with the following details:</p>
      <ul>
        <li>
          <strong>Start Date:</strong> {booking.dateFrom}
        </li>
        <li>
          <strong>End Date:</strong> {booking.dateTo}
        </li>
        <li>
          <strong>Guests:</strong> {booking.guests}
        </li>
      </ul>
      <div className="button-group">
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/profile/${booking.username}`)}
        >
          Go to Profile
        </button>
        <button
          className="btn btn-info"
          onClick={() => navigate(`/profile/${booking.username}/bookings`)}
        >
          View My Bookings
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate(`/venues`)}
        >
          View Venues
        </button>
      </div>
    </div>
  );
};

BookingUpdateSuccess.propTypes = {
  booking: PropTypes.shape({
    dateFrom: PropTypes.string.isRequired,
    dateTo: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired
};

export default BookingUpdateSuccess;
