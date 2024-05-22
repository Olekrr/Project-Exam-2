import { apiRequest } from "./common";

export const getAllVenues = async () => {
  const sortField = "updated";
  const sortOrder = "desc";
  const limit = 100;
  const page = 1;
  const url = `/holidaze/venues?sort=${sortField}&sortOrder=${sortOrder}&limit=${limit}&page=${page}`;
  const response = await apiRequest(url, "GET", null, null);
  return response.data || [];
};

export const getVenueById = async (id) => {
  const response = await apiRequest(
    `/holidaze/venues/${id}`,
    "GET",
    null,
    null
  );
  return response.data;
};

export const createVenue = (venueData, accessToken, apiKey) =>
  apiRequest("/holidaze/venues", "POST", accessToken, venueData, apiKey);

export const updateVenue = (id, venueData, accessToken, apiKey) =>
  apiRequest(`/holidaze/venues/${id}`, "PUT", accessToken, venueData, apiKey);

export const deleteVenue = (id, accessToken, apiKey) => {
  return apiRequest(
    `/holidaze/venues/${id}`,
    "DELETE",
    accessToken,
    null,
    apiKey
  );
};

export const searchVenues = (query) =>
  apiRequest(`/holidaze/venues/search?q=${query}`, "GET", null, null);
