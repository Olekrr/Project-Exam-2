import { useState, useEffect } from "react";
import { getVenueById } from "../../../../api/venues";
import { useAuth } from "../../../../contexts/authContext";

const useVenue = (id) => {
  const { authData } = useAuth();
  const { accessToken, apiKey } = authData;
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      if (!accessToken || !apiKey) {
        setError("Authentication credentials are missing.");
        setLoading(false);
        return;
      }

      try {
        const data = await getVenueById(id, accessToken, apiKey);
        setVenue(data);
      } catch (err) {
        setError("Failed to fetch venue details.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id, accessToken, apiKey]);

  return { venue, loading, error };
};

export default useVenue;
