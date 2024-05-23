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
    return (
      (!filters.name ||
        venue.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.price || venue.price <= Number(filters.price)) &&
      (!filters.maxGuests || venue.maxGuests >= Number(filters.maxGuests)) &&
      (!filters.rating || venue.rating >= Number(filters.rating)) &&
      (!filters.address ||
        venue.location.address
          .toLowerCase()
          .includes(filters.address.toLowerCase())) &&
      (!filters.city ||
        venue.location.city
          .toLowerCase()
          .includes(filters.city.toLowerCase())) &&
      (!filters.zip || venue.location.zip.startsWith(filters.zip)) &&
      (!filters.country ||
        venue.location.country
          .toLowerCase()
          .includes(filters.country.toLowerCase())) &&
      (!filters.continent ||
        venue.location.continent
          .toLowerCase()
          .includes(filters.continent.toLowerCase())) &&
      (!filters.wifi || venue.meta.wifi === filters.wifi) &&
      (!filters.parking || venue.meta.parking === filters.parking) &&
      (!filters.breakfast || venue.meta.breakfast === filters.breakfast) &&
      (!filters.pets || venue.meta.pets === filters.pets)
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
