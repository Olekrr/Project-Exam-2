import { useEffect, useState } from "react";
import { useAuth } from "../../../../../../contexts/authContext";
import { getProfileVenues } from "../../../../../../api/profiles";
import { deleteVenue } from "../../../../../../api/venues";

/**
 * Custom hook to manage the venues associated with a user.
 *
 * @param {string} username - The username of the venue manager.
 * @returns {Object} - The state and handlers for managing venues.
 */
const useVenues = (username) => {
  const { authData } = useAuth();
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
     * Fetches the venues associated with the user.
     */
    async function fetchVenues() {
      try {
        const { accessToken, apiKey } = authData;
        if (!accessToken || !apiKey) {
          setError("Authentication credentials are missing.");
          return;
        }

        const response = await getProfileVenues(username, accessToken, apiKey);
        if (response && response.data && Array.isArray(response.data)) {
          setVenues(response.data);
        } else {
          throw new Error("No valid data received");
        }
      } catch (error) {
        console.error("Error fetching venues:", error);
        setError(error.message);
        setVenues([]);
      }
    }

    if (username) {
      fetchVenues();
    }
  }, [username, authData]);

  /**
   * Deletes a venue by its ID.
   *
   * @param {string} id - The ID of the venue to delete.
   */
  const deleteVenueById = async (id) => {
    try {
      const { accessToken, apiKey } = authData;
      await deleteVenue(id, accessToken, apiKey);
      setVenues((prev) => prev.filter((venue) => venue.id !== id));
    } catch (error) {
      console.error("Failed to delete venue:", error);
      setError("Failed to delete venue.");
    }
  };

  return { venues, error, deleteVenue: deleteVenueById };
};

export default useVenues;
