import { useState, useEffect, useCallback } from "react";
import { getAllBookings } from "../../../../api/bookings";
import { getVenueById } from "../../../../api/venues";
import { useAuth } from "../../../../contexts/authContext";

/**
 * Custom hook to manage bookings and venue details.
 *
 * @param {string} venueId - The ID of the venue.
 * @returns {Object} - The bookings, loading state, error state, fetchBookings function, maxGuests, venueDetails, and bookedDates.
 */
export const useBookings = (venueId) => {
  const [bookings, setBookings] = useState([]);
  const [venueDetails, setVenueDetails] = useState(null);
  const [maxGuests, setMaxGuests] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authData } = useAuth();

  /**
   * Fetches venue details.
   */
  const fetchVenueDetails = useCallback(async () => {
    const { accessToken, apiKey } = authData;

    try {
      const venueResponse = await getVenueById(venueId, accessToken, apiKey);
      if (venueResponse && venueResponse.id) {
        setVenueDetails(venueResponse);
        setMaxGuests(venueResponse.maxGuests || 0);
      } else {
        console.error("Unexpected venue response structure:", venueResponse);
        throw new Error("Unexpected venue response structure.");
      }
    } catch (error) {
      console.error("Error fetching venue details:", error);
      setError("Failed to fetch venue details.");
    }
  }, [venueId, authData]);

  /**
   * Fetches bookings for the venue.
   */
  const fetchBookings = useCallback(async () => {
    const { accessToken, apiKey } = authData;
    try {
      await fetchVenueDetails();
      const fetchedBookings = await getAllBookings(accessToken, apiKey);
      const filteredBookings = fetchedBookings.data.filter(
        (booking) => booking.venue && booking.venue.id === venueId
      );
      setBookings(filteredBookings);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setError("Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  }, [fetchVenueDetails, authData, venueId]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const bookedDates = bookings.flatMap((booking) => {
    const start = new Date(booking.dateFrom);
    const end = new Date(booking.dateTo);
    const dates = [];
    while (start <= end) {
      dates.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    return dates;
  });

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    maxGuests,
    venueDetails,
    bookedDates
  };
};
