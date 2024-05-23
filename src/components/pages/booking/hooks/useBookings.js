import { useState, useEffect } from "react";
import { getAllBookings } from "../../../../api/bookings";

export const useBookings = (venueId) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");
    try {
      const fetchedBookings = await getAllBookings(accessToken, apiKey);
      const filteredBookings = fetchedBookings.data.filter(
        (booking) => booking.venue && booking.venue.id === venueId
      );
      setBookings(filteredBookings);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [venueId]);

  return { bookings, loading, error, fetchBookings };
};
