import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useVenue from "./hooks/useVenue";
import VenueMedia from "./components/media/VenueMedia";
import VenueInfo from "./components/info/VenueInfo";
import VenueAmenities from "./components/amenities/VenueAmenities";
import VenueLocation from "./components/location/VenueLocation";

const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { venue, loading, error } = useVenue(id);

  const handleBookNow = () => {
    navigate(`/booking/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="venue-details">
      <h1>{venue.name}</h1>
      <VenueMedia media={venue.media} name={venue.name} />
      <VenueInfo
        description={venue.description}
        price={venue.price}
        maxGuests={venue.maxGuests}
        rating={venue.rating}
      />
      <VenueAmenities meta={venue.meta} />
      <VenueLocation
        address={venue.location.address}
        city={venue.location.city}
        country={venue.location.country}
      />
      <button onClick={handleBookNow} className="btn btn-primary">
        Book Now
      </button>
    </div>
  );
};

export default VenueDetails;
