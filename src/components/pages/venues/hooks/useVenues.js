import { useState, useEffect } from "react";
import { getAllVenues } from "../../../../api/venues";

/**
 * Custom hook to fetch and manage the state of venues.
 *
 * @returns {Object} The state of the venues, including venues data, loading status, and error status.
 */
const useVenues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await getAllVenues();
        setVenues(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to fetch venues.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  return { venues, loading, error };
};

export default useVenues;
