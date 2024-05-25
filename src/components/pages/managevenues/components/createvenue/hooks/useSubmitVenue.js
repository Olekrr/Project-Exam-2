import { useNavigate } from "react-router-dom";
import { createVenue } from "../../../../../../api/venues";
import { useAuth } from "../../../../../../contexts/authContext";

const useSubmitVenue = () => {
  const navigate = useNavigate();
  const { authData } = useAuth();

  const handleSubmit = async (formData, username) => {
    const { accessToken, apiKey } = authData;

    const preparedData = {
      ...formData,
      price: parseFloat(formData.price),
      maxGuests: parseInt(formData.maxGuests, 10),
      rating: parseFloat(formData.rating)
    };

    try {
      await createVenue(preparedData, accessToken, apiKey);
      navigate(`/profile/${username}/manage-venues`);
    } catch (error) {
      console.error("Error creating venue:", error);
    }
  };

  return handleSubmit;
};

export default useSubmitVenue;
