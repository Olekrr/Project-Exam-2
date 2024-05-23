// Home.jsx
import React, { useState } from "react";
import TextInput from "../../utils/textInput/textInput";
import CheckboxInput from "../../utils/checkboxInput/CheckboxInput";
import { useVenueSearch } from "./hooks/useVenueSearch";
import VenueCard from "./components/venuecards/VenueCards";
import { searchVenues } from "../../../api/venues";

const Home = () => {
  const [simpleQuery, setSimpleQuery] = useState("");
  const [simpleResults, setSimpleResults] = useState([]); // To store results from simple search
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const {
    filters,
    handleChange,
    handleSearch: handleAdvancedSearch,
    filteredVenues,
    searchInitiated
  } = useVenueSearch();

  const handleSimpleSearch = async () => {
    const results = await searchVenues(simpleQuery);
    if (results.data) {
      setSimpleResults(results.data); // Set results for rendering
      console.log(results);
    }
  };

  const toggleSearchMode = () => {
    setIsAdvancedSearch(!isAdvancedSearch);
    // Optionally clear previous search results when toggling
    setSimpleResults([]);
  };

  return (
    <div>
      {!isAdvancedSearch ? (
        <>
          <TextInput
            label="Search Venue"
            id="simpleSearch"
            value={simpleQuery}
            onChange={(e) => setSimpleQuery(e.target.value)}
          />
          <button onClick={handleSimpleSearch}>Search</button>
          <button onClick={toggleSearchMode}>Advanced Search</button>
          {/* Render simple search results */}
          {simpleResults.length > 0 &&
            simpleResults.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          {simpleResults.length === 0 && <p>No venues found.</p>}
        </>
      ) : (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAdvancedSearch();
            }}
          >
            <TextInput
              label="Venue Name"
              id="name"
              value={filters.name}
              onChange={handleChange}
            />
            <TextInput
              label="Price"
              id="price"
              type="number"
              value={filters.price}
              onChange={handleChange}
            />
            <TextInput
              label="Max Guests"
              id="maxGuests"
              type="number"
              value={filters.maxGuests}
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
              label="Address"
              id="address"
              value={filters.address}
              onChange={handleChange}
            />
            <TextInput
              label="City"
              id="city"
              value={filters.city}
              onChange={handleChange}
            />
            <TextInput
              label="Zip"
              id="zip"
              value={filters.zip}
              onChange={handleChange}
            />
            <TextInput
              label="Country"
              id="country"
              value={filters.country}
              onChange={handleChange}
            />
            <TextInput
              label="Continent"
              id="continent"
              value={filters.continent}
              onChange={handleChange}
            />
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
          </form>
          {searchInitiated && (
            <div>
              {filteredVenues.length > 0 ? (
                filteredVenues.map((venue) => (
                  <VenueCard key={venue.id} venue={venue} />
                ))
              ) : (
                <p>No venues found based on the search criteria.</p>
              )}
            </div>
          )}
          <button onClick={toggleSearchMode}>Simple Search</button>
        </>
      )}
    </div>
  );
};

export default Home;
