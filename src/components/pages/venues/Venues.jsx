import React from "react";
import useVenues from "./hooks/useVenues";
import VenueCard from "./components/cards/VenueCards";
import "./venues.scss";

const Venues = () => {
  const { venues, loading, error } = useVenues();

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1>Discover Our Venues</h1>
        <p className="lead">
          Explore a variety of venues perfect for any occasion. Whether
          you&apos;re planning a wedding, corporate event, or a family
          gathering, we have the perfect venue for you. Browse through our
          selection and find the one that suits your needs.
        </p>
      </div>
      <div className="row">
        {venues.map((venue) => (
          <div key={venue.id} className="col-md-4 mb-4">
            <VenueCard venue={venue} />
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <p>
          Can&apos;t find what you&apos;re looking for?{" "}
          <a href="/contact">Contact us</a> and we&apos;ll help you find the
          perfect venue.
        </p>
      </div>
    </div>
  );
};

export default Venues;
