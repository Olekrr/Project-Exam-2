import { useState, useEffect } from "react";
import { getVenueById } from "../../../../api/venues";
import { useAuth } from "../../../../contexts/authContext";
import { useNavigate } from "react-router-dom";

const useVenue = (id) => {
  const { authData } = useAuth();
  const { accessToken, apiKey } = authData || {};
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken || !apiKey) {
      navigate("/auth-required");
      return;
    }

    const fetchVenue = async () => {
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
  }, [id, accessToken, apiKey, navigate]);

  return { venue, loading, error };
};

export default useVenue;
