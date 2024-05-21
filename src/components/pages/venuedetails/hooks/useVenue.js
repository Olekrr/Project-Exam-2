import { useState, useEffect } from "react";
import { getVenueById } from "../../../../api/venues";

const useVenue = (id) => {
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const data = await getVenueById(id);
        setVenue(data);
      } catch (err) {
        setError("Failed to fetch venue details.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  return { venue, loading, error };
};

export default useVenue;
