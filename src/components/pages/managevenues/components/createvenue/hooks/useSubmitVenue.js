import { useNavigate } from "react-router-dom";
import { createVenue } from "../../../../../../api/venues";
import { useAuth } from "../../../../../../contexts/authContext";

/**
 * Custom hook for handling venue submission.
 *
 * @returns {Function} A function to handle venue submission.
 */
const useSubmitVenue = () => {
  const navigate = useNavigate();
  const { authData } = useAuth();

  /**
   * Submits the venue data.
   *
   * @param {Object} formData - The form data of the venue.
   * @param {string} username - The username of the authenticated user.
   */
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
