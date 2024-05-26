import { useState, useEffect, useCallback } from "react";
import { getBookingById, updateBooking } from "../../../../../api/bookings";
import { getVenueById } from "../../../../../api/venues";
import { useAuth } from "../../../../../contexts/authContext";

/**
 * Custom hook to manage booking data.
 *
 * @param {string} bookingId - The ID of the booking to manage.
 * @returns {Object} - The state and handlers for managing a booking.
 */
export const useBooking = (bookingId) => {
  const [booking, setBooking] = useState(null);
  const [venueDetails, setVenueDetails] = useState(null);
  const [maxGuests, setMaxGuests] = useState(0);
  const [error, setError] = useState("");
  const { authData } = useAuth();

  /**
   * Fetches the venue details by ID.
   *
   * @param {string} venueId - The ID of the venue.
   */
  const fetchVenueDetails = useCallback(
    async (venueId) => {
      if (!authData.accessToken || !venueId) {
        setError("No access token or venue ID available. Please log in again.");
        return;
      }
      try {
        const venueResponse = await getVenueById(
          venueId,
          authData.accessToken,
          authData.apiKey
        );
        setVenueDetails(venueResponse);
        setMaxGuests(venueResponse.maxGuests || 0);
      } catch (error) {
        console.error("Failed to fetch venue details:", error);
        setError("Failed to fetch venue details.");
      }
    },
    [authData.accessToken, authData.apiKey]
  );

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
          authData.apiKey,
          { _venue: true }
        );
        const bookingData = {
          ...response.data,
          dateFrom: response.data.dateFrom.split("T")[0],
          dateTo: response.data.dateTo.split("T")[0]
        };
        setBooking(bookingData);

        const venueId = response.data.venue?.id;
        if (venueId) {
          await fetchVenueDetails(venueId);
        } else {
          setError("No venue ID associated with this booking.");
        }
      } catch (error) {
        console.error("Failed to fetch booking:", error);
        setError("Failed to fetch booking.");
      }
    };

    fetchBooking();
  }, [bookingId, authData.accessToken, authData.apiKey, fetchVenueDetails]);

  /**
   * Updates the booking details.
   *
   * @param {Object} updates - The updated booking data.
   * @returns {Object} - The result of the update operation.
   */
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

  return { booking, venueDetails, maxGuests, error, updateBookingDetails };
};
