import { useState, useEffect } from "react";
import { getBookingById, updateBooking } from "../../../../../api/bookings";
import { useAuth } from "../../../../../contexts/authContext";

export const useBooking = (bookingId) => {
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");
  const { authData } = useAuth();

  useEffect(() => {
    if (!bookingId) {
      setError("Booking ID is undefined.");
      return;
    }

    const fetchBooking = async () => {
      if (!authData.accessToken) {
        setError("No access token available. Please log in again.");
        return;
      }
      try {
        const response = await getBookingById(
          bookingId,
          authData.accessToken,
          authData.apiKey
        );
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
  }, [bookingId, authData.accessToken, authData.apiKey]);

  const updateBookingDetails = async (updates) => {
    try {
      await updateBooking(
        bookingId,
        updates,
        authData.accessToken,
        authData.apiKey
      );
      return { success: true };
    } catch (error) {
      console.error("Failed to update booking:", error);
      setError("Failed to update booking.");
      return { success: false, error };
    }
  };

  return { booking, error, updateBookingDetails };
};
