import { useEffect, useState } from "react";
import { useAuth } from "../../../../../../contexts/authContext";
import { getProfileVenues } from "../../../../../../api/profiles";
import { deleteVenue } from "../../../../../../api/venues";

const useVenues = (username) => {
  const { authData } = useAuth();
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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
