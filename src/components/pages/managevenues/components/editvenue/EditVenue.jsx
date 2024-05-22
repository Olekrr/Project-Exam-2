import React from "react";
import { useParams } from "react-router-dom";
import TextInput from "../../../../utils/textInput/textInput";
import TextAreaInput from "../../../../utils/textAreaInput/TextAreaInput";
import { useVenueData } from "./hooks/useVenueData";
import useForm from "./hooks/useForm";
import useAuthNavigation from "./hooks/useAuthNavigation";

const EditVenue = () => {
  const { venueId } = useParams();
  const { venueData, loading, error, updateData } = useVenueData(venueId);
  const [formData, handleInputChange] = useForm(venueData || {});
  const { getTokens, redirectTo } = useAuthNavigation("/profile/manage-venues");

  if (!venueData) return loading ? <p>Loading...</p> : <p>No data found.</p>;
  if (error) return <p>Error: {error}</p>;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { accessToken, apiKey } = getTokens();
    if (!accessToken) {
      console.error("No access token available");
      return;
    }
    const success = await updateData(formData, accessToken, apiKey);
    if (success) redirectTo();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        id="name"
        name="name"
        value={formData.name || ""}
        onChange={handleInputChange}
      />
      <TextAreaInput
        label="Description"
        id="description"
        name="description"
        value={formData.description || ""}
        onChange={handleInputChange}
      />
      <TextInput
        label="Image URL"
        id="media[0].url"
        name="media[0].url"
        value={
          formData.media && formData.media.length > 0
            ? formData.media[0].url
            : ""
        }
        onChange={handleInputChange}
      />
      <TextInput
        label="Price"
        id="price"
        type="number"
        name="price"
        value={formData.price || 0}
        onChange={handleInputChange}
      />
      <TextInput
        label="Max Guests"
        id="maxGuests"
        type="number"
        name="maxGuests"
        value={formData.maxGuests || 0}
        onChange={handleInputChange}
      />
      <TextInput
        label="Rating"
        id="rating"
        type="number"
        name="rating"
        value={formData.rating || 0}
        onChange={handleInputChange}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditVenue;
