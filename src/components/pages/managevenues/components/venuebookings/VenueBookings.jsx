import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllBookings } from "../../../../../api/bookings";
import "./venuebookings.scss";

const VenueBookings = () => {
  const { venueId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllBookings = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const apiKey = localStorage.getItem("apiKey");
      try {
        const result = await getAllBookings(accessToken, apiKey);
        if (result && result.data) {
          const filteredBookings = result.data.filter(
            (booking) => booking.venue && booking.venue.id === venueId
          );
          setBookings(filteredBookings);
        } else {
          setError("No bookings found.");
        }
      } catch (err) {
        setError("Failed to fetch bookings: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllBookings();
  }, [venueId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="venue-bookings container mt-5">
      <h1>Active Venue Bookings</h1>
      <ul className="list-group mt-4">
        {bookings.map((booking) => (
          <li key={booking.id} className="list-group-item">
            Booking from {booking.dateFrom} to {booking.dateTo}:{" "}
            {booking.guests} guests
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VenueBookings;
