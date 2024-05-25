import { useState } from "react";
import { getAllVenues } from "../../../../api/venues";

export const useVenueSearch = () => {
  const [filters, setFilters] = useState({
    name: "",
    price: "",
    maxGuests: "",
    rating: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    continent: "",
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false
  });
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSearch = async () => {
    setSearchInitiated(true);
    const allVenues = await getAllVenues();
    filterVenues(allVenues);
  };

  const filterVenues = (venues) => {
    let results = venues.filter((venue) => filterLogic(venue));
    setFilteredVenues(results);
  };

  const filterLogic = (venue) => {
    const lowerCaseIncludes = (value, filter) =>
      value?.toLowerCase().includes(filter.toLowerCase());

    return (
      (!filters.name || lowerCaseIncludes(venue.name, filters.name)) &&
      (!filters.price || venue.price <= Number(filters.price)) &&
      (!filters.maxGuests || venue.maxGuests >= Number(filters.maxGuests)) &&
      (!filters.rating || venue.rating >= Number(filters.rating)) &&
      (!filters.address ||
        lowerCaseIncludes(venue.location?.address, filters.address)) &&
      (!filters.city ||
        lowerCaseIncludes(venue.location?.city, filters.city)) &&
      (!filters.zip || venue.location?.zip.startsWith(filters.zip)) &&
      (!filters.country ||
        lowerCaseIncludes(venue.location?.country, filters.country)) &&
      (!filters.continent ||
        lowerCaseIncludes(venue.location?.continent, filters.continent)) &&
      (!filters.wifi || venue.meta?.wifi === filters.wifi) &&
      (!filters.pets || venue.meta?.pets === filters.pets) &&
      (!filters.parking || venue.meta?.parking === filters.parking) &&
      (!filters.breakfast || venue.meta?.breakfast === filters.breakfast)
    );
  };

  return {
    filters,
    handleChange,
    handleSearch,
    filteredVenues,
    searchInitiated
  };
};
