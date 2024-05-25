import { useState, useEffect } from "react";
import { getVenueById, updateVenue } from "../../../../../../api/venues";
import { useAuth } from "../../../../../../contexts/authContext";

const defaultVenueData = {
  name: "",
  description: "",
  media: [{ url: "", alt: "" }],
  price: 0,
  maxGuests: 0,
  rating: 0,
  meta: { wifi: false, parking: false, breakfast: false, pets: false },
  location: {
    address: "",
    city: "",
    zip: "",
    country: "",
    continent: "",
    lat: 0,
    lng: 0
  }
};

export const useVenueData = (venueId) => {
  const [venueData, setVenueData] = useState(defaultVenueData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authData } = useAuth();

  useEffect(() => {
    setLoading(true);
    getVenueById(venueId)
      .then((data) => {
        if (data) {
          setVenueData((prevState) => ({ ...prevState, ...data }));
        }
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to fetch venue details:", err);
        setError("Failed to fetch venue details");
      })
      .finally(() => setLoading(false));
  }, [venueId]);

  const updateData = async (updatedData) => {
    try {
      await updateVenue(
        venueId,
        updatedData,
        authData.accessToken,
        authData.apiKey
      );
      setError(null);
      return true;
    } catch (error) {
      console.error("Failed to update venue:", error);
      setError("Failed to update venue");
      return false;
    }
  };

  return { venueData, setVenueData, loading, error, updateData };
};
