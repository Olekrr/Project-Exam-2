import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextInput from "../../../../utils/textinput/TextInput";
import TextAreaInput from "../../../../utils/textareainput/TextAreaInput";
import { useVenueData } from "./hooks/useVenueData";
import useForm from "./hooks/useForm";
import { useAuth } from "../../../../../contexts/authContext";
import CheckboxInput from "../../../../utils/checkboxinput/CheckboxInput";
import validateVenueForm from "../utils/validateVenueForm";
import "./editvenue.scss";

/**
 * Component for editing a venue.
 *
 * @component
 * @returns {JSX.Element} The EditVenue component.
 */
const EditVenue = () => {
  const { venueId } = useParams();
  const { venueData, loading, error, updateData } = useVenueData(venueId);
  const [formData, handleInputChange] = useForm(venueData || {});
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(true);
  const { authData } = useAuth();
  const navigate = useNavigate();
  const currentUsername = authData.username;

  const handleBackToProfile = () => {
    navigate(`/profile/${currentUsername}`);
  };

  useEffect(() => {
    const errors = validateVenueForm(formData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [formData]);

  if (!venueData) return loading ? <p>Loading...</p> : <p>No data found.</p>;
  if (error) return <p>Error: {error}</p>;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateVenueForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setTouched(
        Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );
      return;
    }
    if (!authData.accessToken) {
      console.error("No access token available");
      return;
    }
    const success = await updateData(
      formData,
      authData.accessToken,
      authData.apiKey
    );
    if (success) navigate(`/profile/${currentUsername}/manage-venues`);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <div className="edit-venue container mt-5">
      <h1>Edit Venue</h1>
      <form className="mt-4" onSubmit={handleSubmit}>
        <TextInput
          label="Venue Name"
          id="name"
          name="name"
          value={formData.name || ""}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={touched.name && formErrors.name}
        />
        <TextAreaInput
          label="Description"
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={touched.description && formErrors.description}
        />
        <TextInput
          label="Image URL"
          id="media[0].url"
          name="media[0].url"
          type="text"
          value={
            formData.media && formData.media.length > 0
              ? formData.media[0].url
              : ""
          }
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={touched["media[0].url"] && formErrors.media}
        />
        <TextInput
          label="Price"
          id="price"
          name="price"
          type="number"
          value={formData.price || 0}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={touched.price && formErrors.price}
        />
        <TextInput
          label="Max Guests"
          id="maxGuests"
          name="maxGuests"
          type="number"
          value={formData.maxGuests || 0}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={touched.maxGuests && formErrors.maxGuests}
        />
        <TextInput
          label="Rating"
          id="rating"
          name="rating"
          type="number"
          value={formData.rating || 0}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={touched.rating && formErrors.rating}
        />
        <CheckboxInput
          label="Wifi"
          id="wifi"
          name="meta.wifi"
          checked={formData.meta?.wifi || false}
          onChange={handleInputChange}
        />
        <CheckboxInput
          label="Parking"
          id="parking"
          name="meta.parking"
          checked={formData.meta?.parking || false}
          onChange={handleInputChange}
        />
        <CheckboxInput
          label="Breakfast"
          id="breakfast"
          name="meta.breakfast"
          checked={formData.meta?.breakfast || false}
          onChange={handleInputChange}
        />
        <CheckboxInput
          label="Pets Allowed"
          id="pets"
          name="meta.pets"
          checked={formData.meta?.pets || false}
          onChange={handleInputChange}
        />
        <TextInput
          label="Address"
          id="location.address"
          name="location.address"
          value={formData.location?.address || ""}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={touched["location.address"] && formErrors.address}
        />
        <TextInput
          label="City"
          id="location.city"
          name="location.city"
          value={formData.location?.city || ""}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={touched["location.city"] && formErrors.city}
        />
        <TextInput
          label="Zip"
          id="location.zip"
          name="location.zip"
          value={formData.location?.zip || ""}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={touched["location.zip"] && formErrors.zip}
        />
        <TextInput
          label="Country"
          id="location.country"
          name="location.country"
          value={formData.location?.country || ""}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={touched["location.country"] && formErrors.country}
        />
        <TextInput
          label="Continent"
          id="location.continent"
          name="location.continent"
          value={formData.location?.continent || ""}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={touched["location.continent"] && formErrors.continent}
        />
        <div className="button-group mt-3">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isFormValid}
          >
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
