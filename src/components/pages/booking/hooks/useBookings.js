import { useState, useEffect, useCallback } from "react";
import { getAllBookings } from "../../../../api/bookings";
import { useAuth } from "../../../../contexts/authContext";

export const useBookings = (venueId) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authData } = useAuth();

  const fetchBookings = useCallback(async () => {
    const { accessToken, apiKey } = authData;
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
  }, [authData, venueId]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return { bookings, loading, error, fetchBookings };
};
