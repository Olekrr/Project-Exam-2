import { useState, useEffect, useCallback } from "react";
import { deleteBooking as deleteBookingAPI } from "../../../../api/bookings";
import { getProfileBookings } from "../../../../api/profiles";
import { useAuth } from "../../../../contexts/authContext";

/**
 * Custom hook to manage upcoming bookings.
 *
 * @returns {Object} - The state and handlers for managing upcoming bookings.
 */
export const useUpcomingBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { authData } = useAuth();

  /**
   * Fetches the user's bookings from the API.
   */
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

  /**
   * Removes a booking by its ID.
   *
   * @param {string} id - The ID of the booking to remove.
   */
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
