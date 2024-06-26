import React from "react";
import useVenues from "./hooks/useVenues";
import VenueCard from "../../utils/venuecards/VenueCards";
import "./venues.scss";

/**
 * Component to display a list of venues.
 *
 * @component
 * @returns {JSX.Element} The Venues component.
 */
const Venues = () => {
  const { venues, loading, error } = useVenues();

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1>Discover Our Venues</h1>
        <p className="lead">
          Explore a variety of venues perfect for any occasion. Whether you are
          planning a wedding, corporate event, or a family gathering, or simply
          going on holiday we have the perfect venue for you. Browse through our
          selection and find the one that suits your needs.
        </p>
      </div>
      <div className="row">
        {venues.map((venue) => (
          <div key={venue.id} className="col-md-6 col-lg-4 mb-4">
            <VenueCard venue={venue} />
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <p>
          Unable find what you are looking for?{" "}
          <a href="/contact">Contact us</a> and we will help you find the
          perfect venue.
        </p>
      </div>
    </div>
  );
};

export default Venues;
