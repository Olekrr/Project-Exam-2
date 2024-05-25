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
        console.log("API Result:", result);
        if (result && result.data) {
          const filteredBookings = result.data.filter(
            (booking) => booking.venue && booking.venue.id === venueId
          );
          console.log("Filtered Bookings:", filteredBookings);
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="venue-bookings container mt-5">
      <h1>Active Venue Bookings</h1>
      <ul className="list-group mt-4">
        {bookings.map((booking) => (
          <li key={booking.id} className="list-group-item booking-item">
            <div className="booking-info">
              <div className="booking-dates">
                <strong>Booking from:</strong> {formatDate(booking.dateFrom)}{" "}
                <br />
                <strong>to:</strong> {formatDate(booking.dateTo)}
              </div>
              <div className="booking-details">
                <strong>Guests:</strong> {booking.guests}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VenueBookings;
