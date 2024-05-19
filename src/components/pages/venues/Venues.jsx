import React from "react";
import useVenues from "./hooks/useVenues";
import VenueCard from "./components/cards/VenueCards";

const Venues = () => {
  const { venues, loading, error } = useVenues();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="venues">
      <h1>Venues</h1>
      <div className="venue-list">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
};

export default Venues;
