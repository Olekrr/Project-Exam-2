import React from "react";
import { useNavigate } from "react-router-dom";
import { useUpcomingBookings } from "./hooks/useUpcomingBookings";
import BookingList from "./components/bookinglist/BookingList";

const UpcomingBookings = () => {
  const { bookings, isLoading, error, removeBookingById } =
    useUpcomingBookings();
  const navigate = useNavigate();

  const handleEditBooking = (id) => {
    navigate(`/edit-booking/${id}`);
  };

  if (isLoading) return;
  <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2>Your Upcoming Bookings</h2>
      <BookingList
        bookings={bookings}
        onEdit={handleEditBooking}
        onDelete={removeBookingById}
      />
    </div>
  );
};

export default UpcomingBookings;
