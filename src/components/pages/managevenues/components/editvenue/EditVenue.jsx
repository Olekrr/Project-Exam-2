import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextInput from "../../../../utils/textInput/textInput";
import TextAreaInput from "../../../../utils/textAreaInput/TextAreaInput";
import { useVenueData } from "./hooks/useVenueData";
import useForm from "./hooks/useForm";
import { useAuth } from "../../../../../contexts/authContext";
import "./editvenue.scss";

const EditVenue = () => {
  const { venueId } = useParams();
  const { venueData, loading, error, updateData } = useVenueData(venueId);
  const [formData, handleInputChange] = useForm(venueData || {});
  const { authData } = useAuth();
  const navigate = useNavigate();
  const currentUsername = authData.username;

  const handleBackToProfile = () => {
    navigate(`/profile/${currentUsername}`);
  };

  if (!venueData) return loading ? <p>Loading...</p> : <p>No data found.</p>;
  if (error) return <p>Error: {error}</p>;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!authData.accessToken) {
      console.error("No access token available");
      return;
    }
    const success = await updateData(
      formData,
      authData.accessToken,
      authData.apiKey
    );
    if (success) navigate("/profile/manage-venues");
  };

  return (
    <div className="edit-venue container mt-5">
      <h1>Edit Venue</h1>
      <form className="mt-4" onSubmit={handleSubmit}>
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
        <div className="button-group mt-3">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={handleBackToProfile}
          >
            Back to Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVenue;
