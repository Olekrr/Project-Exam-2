import { useState, useEffect } from "react";
import { deleteBooking as deleteBookingAPI } from "../../../../api/bookings";
import { getProfileBookings } from "../../../../api/profiles";

export const useUpcomingBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const apiKey = localStorage.getItem("apiKey");
      const username = localStorage.getItem("username");
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
  };

  const removeBookingById = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const apiKey = localStorage.getItem("apiKey");
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
