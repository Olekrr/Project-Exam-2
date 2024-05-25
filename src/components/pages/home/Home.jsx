import React, { useState } from "react";
import TextInput from "../../utils/textInput/textInput";
import CheckboxInput from "../../utils/checkboxInput/CheckboxInput";
import { useVenueSearch } from "./hooks/useVenueSearch";
import VenueCard from "./components/venuecards/VenueCards";
import { searchVenues } from "../../../api/venues";
import "./home.scss";

const Home = () => {
  const [simpleQuery, setSimpleQuery] = useState("");
  const [simpleResults, setSimpleResults] = useState([]);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const {
    filters,
    handleChange,
    handleSearch: handleAdvancedSearch,
    filteredVenues,
    searchInitiated
  } = useVenueSearch();

  const handleSimpleSearch = async () => {
    if (!simpleQuery.trim()) {
      alert("Search query cannot be empty");
      return;
    }

    try {
      const results = await searchVenues(simpleQuery);
      setSimpleResults(results.data || []);
    } catch (error) {
      console.error("Error searching venues:", error);
    }
  };

  const toggleSearchMode = () => {
    setIsAdvancedSearch(!isAdvancedSearch);
    setSimpleResults([]);
  };

  return (
    <div className="container my-5 home-container">
      <div className="hero-background">
        <img src="/images/herophoto.png" alt="Hero" className="hero-image" />
      </div>
      <div className="content">
        <div className="hero-text mb-5">
          <h1>
            Holidaze! <span>Your venue</span> is waiting for you
          </h1>
          <p>
            Plan your event and pick your destination, we will provide the best
            venue worldwide
          </p>
        </div>
        <div className="search-section">
          {!isAdvancedSearch ? (
            <div className="simple-search">
              <div className="form-group mb-3">
                <TextInput
                  label="Search Venue"
                  id="simpleSearch"
                  value={simpleQuery}
                  onChange={(e) => setSimpleQuery(e.target.value)}
                />
              </div>
              <div className="d-flex gap-2 mb-3">
                <button
                  className="btn btn-primary"
                  onClick={handleSimpleSearch}
                >
                  Search
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={toggleSearchMode}
                >
                  Advanced Search
                </button>
              </div>
              {simpleResults.length === 0 && <p>No venues found.</p>}
            </div>
          ) : (
            <div className="advanced-search card p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAdvancedSearch();
                }}
                className="row g-3"
              >
                <p>Keep fields empty to select all</p>
                <div className="col-md-4">
                  <TextInput
                    label="Venue Name"
                    id="name"
                    value={filters.name}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="City"
                    id="city"
                    value={filters.city}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Address"
                    id="address"
                    value={filters.address}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Zip"
                    id="zip"
                    value={filters.zip}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <TextInput
                    label="Price"
                    id="price"
                    type="number"
                    value={filters.price}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Country"
                    id="country"
                    value={filters.country}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Rating"
                    id="rating"
                    type="number"
                    value={filters.rating}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Continent"
                    id="continent"
                    value={filters.continent}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 checkbox-container">
                  <CheckboxInput
                    label="WiFi"
                    id="wifi"
                    name="wifi"
                    checked={filters.wifi}
                    onChange={handleChange}
                  />
                  <CheckboxInput
                    label="Parking"
                    id="parking"
                    name="parking"
                    checked={filters.parking}
                    onChange={handleChange}
                  />
                  <CheckboxInput
                    label="Breakfast"
                    id="breakfast"
                    name="breakfast"
                    checked={filters.breakfast}
                    onChange={handleChange}
                  />
                  <CheckboxInput
                    label="Pets Allowed"
                    id="pets"
                    name="pets"
                    checked={filters.pets}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    Submit Advanced Search
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        <div className="search-results">
          {isAdvancedSearch && searchInitiated && (
            <>
              {filteredVenues.length === 0 && (
                <p>No venues found based on the search criteria.</p>
              )}
              {filteredVenues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </>
          )}
          {!isAdvancedSearch &&
            simpleResults.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
