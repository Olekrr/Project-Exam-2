import React, { useState, useRef, useEffect } from "react";
import TextInput from "../../utils/textinput/TextInput";
import CheckboxInput from "../../utils/checkboxinput/CheckboxInput";
import { useVenueSearch } from "./hooks/useVenueSearch";
import VenueCard from "../../utils/venuecards/VenueCards";
import { searchVenues } from "../../../api/venues";
import "./home.scss";

/**
 * Home component for searching and displaying venues.
 *
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
const Home = () => {
  const [simpleQuery, setSimpleQuery] = useState("");
  const [simpleResults, setSimpleResults] = useState([]);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [simpleSearchInitiated, setSimpleSearchInitiated] = useState(false);

  const {
    filters,
    handleChange,
    handleSearch: handleAdvancedSearch,
    filteredVenues,
    searchInitiated,
    setSearchInitiated
  } = useVenueSearch();

  const searchResultsRef = useRef(null);

  /**
   * Scrolls the screen to the search results container.
   */
  const scrollToResults = () => {
    if (searchResultsRef.current) {
      searchResultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (
      simpleResults.length > 0 ||
      (searchInitiated && filteredVenues.length > 0)
    ) {
      scrollToResults();
    }
  }, [simpleResults, filteredVenues, searchInitiated]);

  /**
   * Handles the simple search functionality.
   */
  const handleSimpleSearch = async () => {
    if (!simpleQuery.trim()) {
      alert("Search query cannot be empty");
      return;
    }

    try {
      setSimpleSearchInitiated(true);
      const results = await searchVenues(simpleQuery);
      setSimpleResults(results.data || []);
      setSearchInitiated(true);
    } catch (error) {
      console.error("Error searching venues:", error);
    }
  };

  /**
   * Toggles between simple and advanced search modes.
   */
  const toggleSearchMode = () => {
    setIsAdvancedSearch(!isAdvancedSearch);
    setSimpleResults([]);
    setSimpleSearchInitiated(false);
    setSearchInitiated(false);
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
                  name="simpleSearch"
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
                <button className="btn btn-info" onClick={toggleSearchMode}>
                  Advanced Search
                </button>
              </div>
              {simpleSearchInitiated && simpleResults.length === 0 && (
                <p className="no-venues-message">No venues found.</p>
              )}
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
                    name="name"
                    value={filters.name}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="City"
                    id="city"
                    name="city"
                    value={filters.city}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Address"
                    id="address"
                    name="address"
                    value={filters.address}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Zip"
                    id="zip"
                    name="zip"
                    value={filters.zip}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <TextInput
                    label="Price"
                    id="price"
                    name="price"
                    type="number"
                    value={filters.price}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Country"
                    id="country"
                    name="country"
                    value={filters.country}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Rating"
                    id="rating"
                    name="rating"
                    type="number"
                    value={filters.rating}
                    onChange={handleChange}
                  />
                  <TextInput
                    label="Continent"
                    id="continent"
                    name="continent"
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
              {searchInitiated && filteredVenues.length === 0 && (
                <p className="no-venues-message">
                  No venues found based on the search criteria.
                </p>
              )}
            </div>
          )}
        </div>
        <div className="row" ref={searchResultsRef}>
          {isAdvancedSearch && searchInitiated && (
            <>
              {filteredVenues.map((venue) => (
                <div key={venue.id} className="col-md-6 col-lg-4 mb-4">
                  <VenueCard venue={venue} />
                </div>
              ))}
            </>
          )}
          {!isAdvancedSearch &&
            simpleResults.map((venue) => (
              <div key={venue.id} className="col-md-6 col-lg-4 mb-4">
                <VenueCard venue={venue} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
