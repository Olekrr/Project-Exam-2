import React from "react";
import { useNavigate } from "react-router-dom";
import useFormState from "./hooks/useFormState";
import useSubmitVenue from "./hooks/useSubmitVenue";
import TextInput from "../../../../utils/textInput/textInput";
import TextAreaInput from "../../../../utils/textAreaInput/TextAreaInput";
import CheckboxInput from "../../../../utils/checkboxInput/CheckboxInput";
import { useAuth } from "../../../../../contexts/authContext";
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

const CreateVenue = () => {
  const [venueData, handleChange] = useFormState(initialState);
  const handleSubmit = useSubmitVenue();
  const { authData } = useAuth();
  const { username } = authData;
  const navigate = useNavigate();

  const handleBackToProfile = () => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="create-venue container mt-5">
      <h1>Create Venue</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(venueData, username);
        }}
        className="mt-4"
      >
        <TextInput
          label="Venue Name"
          id="name"
          name="name"
          value={venueData.name}
          onChange={handleChange}
        />
        <TextAreaInput
          label="Description"
          id="description"
          name="description"
          value={venueData.description}
          onChange={handleChange}
        />
        <TextInput
          label="Image URL"
          id="media[0].url"
          name="media[0].url"
          type="text"
          value={venueData.media[0].url}
          onChange={handleChange}
        />
        <TextInput
          label="Price"
          id="price"
          name="price"
          type="number"
          value={venueData.price}
          onChange={handleChange}
        />
        <TextInput
          label="Max Guests"
          id="maxGuests"
          name="maxGuests"
          type="number"
          value={venueData.maxGuests}
          onChange={handleChange}
        />
        <TextInput
          label="Rating"
          id="rating"
          name="rating"
          type="number"
          value={venueData.rating}
          onChange={handleChange}
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
        />
        <TextInput
          label="City"
          id="location.city"
          name="location.city"
          value={venueData.location.city}
          onChange={handleChange}
        />
        <TextInput
          label="Zip"
          id="location.zip"
          name="location.zip"
          value={venueData.location.zip}
          onChange={handleChange}
        />
        <TextInput
          label="Country"
          id="location.country"
          name="location.country"
          value={venueData.location.country}
          onChange={handleChange}
        />
        <TextInput
          label="Continent"
          id="location.continent"
          name="location.continent"
          value={venueData.location.continent}
          onChange={handleChange}
        />
        <div className="button-group mt-3">
          <button type="submit" className="btn btn-primary">
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
