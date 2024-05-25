import { useState, useEffect } from "react";
import { getBookingById, updateBooking } from "../../../../../api/bookings";

export const useBooking = (bookingId) => {
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookingId) {
      setError("Booking ID is undefined.");
      return;
    }

    const fetchBooking = async () => {
      const token = localStorage.getItem("accessToken");
      const apiKey = localStorage.getItem("apiKey");
      if (!token) {
        setError("No access token available. Please log in again.");
        return;
      }
      try {
        const response = await getBookingById(bookingId, token, apiKey);
        setBooking({
          ...response.data,
          dateFrom: response.data.dateFrom.split("T")[0],
          dateTo: response.data.dateTo.split("T")[0]
        });
      } catch (error) {
        console.error("Failed to fetch booking:", error);
        setError("Failed to fetch booking.");
      }
    };

    fetchBooking();
  }, [bookingId]);

  const updateBookingDetails = async (updates) => {
    const token = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");
    try {
      await updateBooking(bookingId, updates, token, apiKey);
      return { success: true };
    } catch (error) {
      console.error("Failed to update booking:", error);
      setError("Failed to update booking.");
      return { success: false, error };
    }
  };

  return { booking, error, updateBookingDetails };
};
