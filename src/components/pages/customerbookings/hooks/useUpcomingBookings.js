import { useState, useEffect, useCallback } from "react";
import { deleteBooking as deleteBookingAPI } from "../../../../api/bookings";
import { getProfileBookings } from "../../../../api/profiles";
import { useAuth } from "../../../../contexts/authContext";

export const useUpcomingBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { authData } = useAuth();

  const fetchUserBookings = useCallback(async () => {
    try {
      const { accessToken, apiKey, username } = authData;
      const data = await getProfileBookings(username, accessToken, apiKey);
      if (data && data.data) {
        setBookings(data.data);
      } else {
        setError("No bookings data returned from the API.");
      }
    } catch (err) {
      setError(err.message || "Failed to load bookings");
    } finally {
      setIsLoading(false);
    }
  }, [authData]);

  useEffect(() => {
    fetchUserBookings();
  }, [fetchUserBookings]);

  const removeBookingById = async (id) => {
    try {
      const { accessToken, apiKey } = authData;
      await deleteBookingAPI(id, accessToken, apiKey);
      setBookings((currentBookings) =>
        currentBookings.filter((booking) => booking.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete booking:", error);
      setError("Failed to delete booking: " + error.message);
    }
  };

  return {
    bookings,
    isLoading,
    error,
    removeBookingById,
    fetchUserBookings
  };
};
