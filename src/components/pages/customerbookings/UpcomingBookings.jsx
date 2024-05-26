import React from "react";
import { useNavigate } from "react-router-dom";
import { useUpcomingBookings } from "./hooks/useUpcomingBookings";
import BookingList from "./components/bookinglist/BookingList";
import "./upcomingbookings.scss";

/**
 * UpcomingBookings component to display the user's upcoming bookings.
 * Allows the user to edit or delete their bookings.
 *
 * @component
 */
const UpcomingBookings = () => {
  const { bookings, isLoading, error, removeBookingById } =
    useUpcomingBookings();
  const navigate = useNavigate();

  /**
   * Handles the edit booking action.
   * @param {string} id - The ID of the booking to edit.
   */
  const handleEditBooking = (id) => {
    navigate(`/edit-booking/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="upcoming-bookings-container">
      <h2 className="mb-4">Your Upcoming Bookings</h2>
      <BookingList
        bookings={bookings}
        onEdit={handleEditBooking}
        onDelete={removeBookingById}
      />
    </div>
  );
};

export default UpcomingBookings;
