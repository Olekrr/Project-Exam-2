import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useVenue from "./hooks/useVenue";
import VenueMedia from "./components/media/VenueMedia";
import VenueInfo from "./components/info/VenueInfo";
import VenueAmenities from "./components/amenities/VenueAmenities";
import VenueLocation from "./components/location/VenueLocation";
import "./venuedetails.scss";

/**
 * Component to display detailed information about a specific venue.
 *
 * @component
 * @returns {JSX.Element} The VenueDetails component.
 */
const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { venue, loading, error } = useVenue(id);

  /**
   * Handles the "Book Now" button click event.
   */
  const handleBookNow = () => {
    navigate(`/booking/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="venue-details container mt-5">
      <h1 className="venue-name">{venue.name}</h1>
      <div className="row">
        <div className="col-md-6">
          <VenueMedia media={venue.media} name={venue.name} />
        </div>
        <div className="col-md-6">
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
          <button onClick={handleBookNow} className="btn btn-primary mt-4">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
