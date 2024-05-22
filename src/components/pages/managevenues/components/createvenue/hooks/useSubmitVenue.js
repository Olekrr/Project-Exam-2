import { useNavigate } from "react-router-dom";
import { createVenue } from "../../../../../../api/venues";

const useSubmitVenue = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData, username) => {
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");

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
