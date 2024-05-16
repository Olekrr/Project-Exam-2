import { apiRequest } from "./common";

export const getAllVenues = () =>
  apiRequest("/holidaze/venues", "GET", null, null);
export const getVenueById = (id) =>
  apiRequest(`/holidaze/venues/${id}`, "GET", null, null);
export const createVenue = (venueData, accessToken, apiKey) =>
  apiRequest("/holidaze/venues", "POST", accessToken, apiKey, venueData);
export const updateVenue = (id, venueData, accessToken, apiKey) =>
  apiRequest(`/holidaze/venues/${id}`, "PUT", accessToken, apiKey, venueData);
export const deleteVenue = (id, accessToken, apiKey) =>
  apiRequest(`/holidaze/venues/${id}`, "DELETE", accessToken, apiKey);
export const searchVenues = (query) =>
  apiRequest(`/holidaze/venues/search?q=${query}`, "GET", null, null);
