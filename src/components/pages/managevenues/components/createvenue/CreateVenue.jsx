import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFormState from "./hooks/useFormState";
import useSubmitVenue from "./hooks/useSubmitVenue";
import TextInput from "../../../../utils/textinput/TextInput";
import TextAreaInput from "../../../../utils/textareainput/TextAreaInput";
import CheckboxInput from "../../../../utils/checkboxinput/CheckboxInput";
import { useAuth } from "../../../../../contexts/authContext";
import validateVenueForm from "../utils/validateVenueForm";
import "./createvenue.scss";

const initialState = {
  name: "",
  description: "",
  media: [{ url: "", alt: "" }],
  price: "",
  maxGuests: "",
  rating: 0,
  meta: {
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false
  },
  location: {
    address: "",
    city: "",
    zip: "",
    country: "",
    continent: ""
  }
};

/**
 * Component for creating a new venue.
 *
 * @component
 * @returns {JSX.Element} The CreateVenue component.
 */
const CreateVenue = () => {
  const [venueData, handleChange] = useFormState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(true);
  const handleSubmit = useSubmitVenue();
  const { authData } = useAuth();
  const { username } = authData;
  const navigate = useNavigate();

  useEffect(() => {
    const errors = validateVenueForm(venueData);
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [venueData]);

  const handleBackToProfile = () => {
    navigate(`/profile/${username}`);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateVenueForm(venueData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setTouched(
        Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );
      return;
    }
    handleSubmit(venueData, username);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <div className="create-venue container mt-5">
      <h1>Create Venue</h1>
      <form onSubmit={handleFormSubmit} className="mt-4">
        <TextInput
          label="Venue Name"
          id="name"
          name="name"
          value={venueData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && formErrors.name}
        />
        <TextAreaInput
          label="Description"
          id="description"
          name="description"
          value={venueData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.description && formErrors.description}
        />
        <TextInput
          label="Image URL"
          id="media[0].url"
          name="media[0].url"
          type="text"
          value={venueData.media[0].url}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched["media[0].url"] && formErrors.media}
        />
        <TextInput
          label="Price"
          id="price"
          name="price"
          type="number"
          value={venueData.price}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.price && formErrors.price}
        />
        <TextInput
          label="Max Guests"
          id="maxGuests"
          name="maxGuests"
          type="number"
          value={venueData.maxGuests}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.maxGuests && formErrors.maxGuests}
        />
        <TextInput
          label="Rating"
          id="rating"
          name="rating"
          type="number"
          value={venueData.rating}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.rating && formErrors.rating}
        />
        <CheckboxInput
          label="Wifi"
          id="wifi"
          name="meta.wifi"
          checked={venueData.meta.wifi}
          onChange={handleChange}
        />
        <CheckboxInput
          label="Parking"
          id="parking"
          name="meta.parking"
          checked={venueData.meta.parking}
          onChange={handleChange}
        />
        <CheckboxInput
          label="Breakfast"
          id="breakfast"
          name="meta.breakfast"
          checked={venueData.meta.breakfast}
          onChange={handleChange}
        />
        <CheckboxInput
          label="Pets Allowed"
          id="pets"
          name="meta.pets"
          checked={venueData.meta.pets}
          onChange={handleChange}
        />
        <TextInput
          label="Address"
          id="location.address"
          name="location.address"
          value={venueData.location.address}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched["location.address"] && formErrors.address}
        />
        <TextInput
          label="City"
          id="location.city"
          name="location.city"
          value={venueData.location.city}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched["location.city"] && formErrors.city}
        />
        <TextInput
          label="Zip"
          id="location.zip"
          name="location.zip"
          value={venueData.location.zip}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched["location.zip"] && formErrors.zip}
        />
        <TextInput
          label="Country"
          id="location.country"
          name="location.country"
          value={venueData.location.country}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched["location.country"] && formErrors.country}
        />
        <TextInput
          label="Continent"
          id="location.continent"
          name="location.continent"
          value={venueData.location.continent}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched["location.continent"] && formErrors.continent}
        />
        <div className="button-group mt-3">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isFormValid}
          >
            Create Venue
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

export default CreateVenue;
