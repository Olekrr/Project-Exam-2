import { apiRequest } from "./common";

/**
 * Retrieves all profiles.
 *
 * @param {string} accessToken - The access token for authentication.
 * @param {string} apiKey - The API key for the request.
 * @returns {Promise<Object>} The API response with all profiles.
 */
export const getAllProfiles = (accessToken, apiKey) =>
  apiRequest("/holidaze/profiles", "GET", accessToken, null, apiKey);

/**
 * Retrieves a profile by its name.
 *
 * @param {string} name - The name of the profile to retrieve.
 * @param {string} accessToken - The access token for authentication.
 * @param {string} apiKey - The API key for the request.
 * @returns {Promise<Object>} The API response with the profile details.
 */
export const getProfileByName = (name, accessToken, apiKey) => {
  return apiRequest(
    `/holidaze/profiles/${name}`,
    "GET",
    accessToken,
    null,
    apiKey
  );
};

/**
 * Updates a profile by its name.
 *
 * @param {string} name - The name of the profile to update.
 * @param {Object} profileData - The updated profile data.
 * @param {string} accessToken - The access token for authentication.
 * @param {string} apiKey - The API key for the request.
 * @returns {Promise<Object>} The API response.
 */
export const updateProfile = (name, profileData, accessToken, apiKey) =>
  apiRequest(
    `/holidaze/profiles/${name}`,
    "PUT",
    accessToken,
    profileData,
    apiKey
  );

/**
 * Retrieves all bookings for a profile by its name.
 *
 * @param {string} name - The name of the profile.
 * @param {string} accessToken - The access token for authentication.
 * @param {string} apiKey - The API key for the request.
 * @returns {Promise<Object>} The API response with the profile's bookings.
 */
export const getProfileBookings = (name, accessToken, apiKey) => {
  const url = `/holidaze/profiles/${name}/bookings?_venues=true`;
  return apiRequest(url, "GET", accessToken, null, apiKey);
};

/**
 * Retrieves all venues for a profile by its name.
 *
 * @param {string} name - The name of the profile.
 * @param {string} accessToken - The access token for authentication.
 * @param {string} apiKey - The API key for the request.
 * @returns {Promise<Object>} The API response with the profile's venues.
 */
export const getProfileVenues = (name, accessToken, apiKey) =>
  apiRequest(
    `/holidaze/profiles/${name}/venues`,
    "GET",
    accessToken,
    null,
    apiKey
  );

/**
 * Searches for profiles based on a query.
 *
 * @param {string} query - The search query.
 * @param {string} accessToken - The access token for authentication.
 * @param {string} apiKey - The API key for the request.
 * @returns {Promise<Object>} The API response with the search results.
 */
export const searchProfiles = (query, accessToken, apiKey) =>
  apiRequest(
    `/holidaze/profiles/search?q=${query}`,
    "GET",
    accessToken,
    null,
    apiKey
  );
