import { useEffect, useState } from "react";
import { getProfileVenues } from "../../../../../../api/profiles";
import { deleteVenue } from "../../../../../../api/venues";

const useVenues = (username) => {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const apiKey = localStorage.getItem("apiKey");
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
  }, [username]);

  const deleteVenueById = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const apiKey = localStorage.getItem("apiKey");
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
