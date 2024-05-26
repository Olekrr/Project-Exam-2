import { apiRequest } from "./common";

/**
 * Retrieves all venues with pagination and sorting.
 *
 * @returns {Promise<Object[]>} The API response with all venues.
 */
export const getAllVenues = async () => {
  const sortField = "updated";
  const sortOrder = "desc";
  const limit = 100;
  const page = 1;
  const url = `/holidaze/venues?sort=${sortField}&sortOrder=${sortOrder}&limit=${limit}&page=${page}`;
  const response = await apiRequest(url, "GET", null, null);
  return response.data || [];
};

/**
 * Retrieves a venue by its ID.
 *
 * @param {string} id - The ID of the venue to retrieve.
 * @returns {Promise<Object>} The API response with the venue details.
 */
export const getVenueById = async (id) => {
  const response = await apiRequest(
    `/holidaze/venues/${id}`,
    "GET",
    null,
    null
  );
  return response.data;
};

/**
 * Creates a new venue.
 *
 * @param {Object} venueData - The venue data.
 * @param {string} accessToken - The access token for authentication.
 * @param {string} apiKey - The API key for the request.
 * @returns {Promise<Object>} The API response.
 */
export const createVenue = (venueData, accessToken, apiKey) =>
  apiRequest("/holidaze/venues", "POST", accessToken, venueData, apiKey);

/**
 * Updates an existing venue.
 *
 * @param {string} id - The ID of the venue to update.
 * @param {Object} venueData - The updated venue data.
 * @param {string} accessToken - The access token for authentication.
 * @param {string} apiKey - The API key for the request.
 * @returns {Promise<Object>} The API response.
 */
export const updateVenue = (id, venueData, accessToken, apiKey) =>
  apiRequest(`/holidaze/venues/${id}`, "PUT", accessToken, venueData, apiKey);

/**
 * Deletes a venue by its ID.
 *
 * @param {string} id - The ID of the venue to delete.
 * @param {string} accessToken - The access token for authentication.
 * @param {string} apiKey - The API key for the request.
 * @returns {Promise<Object>} The API response.
 */
export const deleteVenue = (id, accessToken, apiKey) => {
  return apiRequest(
    `/holidaze/venues/${id}`,
    "DELETE",
    accessToken,
    null,
    apiKey
  );
};

/**
 * Searches for venues based on a query.
 *
 * @param {string} query - The search query.
 * @returns {Promise<Object[]>} The API response with the search results.
 */
export const searchVenues = (query) =>
  apiRequest(`/holidaze/venues/search?q=${query}`, "GET", null, null);
