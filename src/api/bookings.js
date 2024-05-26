import { apiRequest } from "./common";

/**
 * Retrieves all bookings.
 *
 * @param {string} accessToken - The access token for authentication.
 * @param {string} apiKey - The API key for the request.
 * @returns {Promise<Object>} The API response with all bookings.
 */
export const getAllBookings = (accessToken, apiKey) => {
  const sortField = "created";
  const sortOrder = "desc";
  const limit = 100;
  const page = 1;
  const url = `/holidaze/bookings?sort=${sortField}&sortOrder=${sortOrder}&limit=${limit}&page=${page}&_venue=true`;
  return apiRequest(url, "GET", accessToken, null, apiKey);
};

/**
 * Retrieves a booking by its ID.
 *
 * @param {string} id - The ID of the booking.
 * @param {string} accessToken - The access token for authentication.
 * @param {string} apiKey - The API key for the request.
 * @returns {Promise<Object>} The API response with the booking details.
 */
export const getBookingById = (id, accessToken, apiKey) => {
  const url = `/holidaze/bookings/${id}?_venue=true`;
  return apiRequest(url, "GET", accessToken, null, apiKey);
};

/**
 * Creates a new booking.
 *
 * @param {Object} bookingData - The booking data.
 * @param {string} accessToken - The access token for authentication.
 * @param {string} apiKey - The API key for the request.
 * @returns {Promise<Object>} The API response.
 */
export const createBooking = (bookingData, accessToken, apiKey) =>
  apiRequest("/holidaze/bookings", "POST", accessToken, bookingData, apiKey);

/**
 * Updates an existing booking.
 *
 * @param {string} id - The ID of the booking to update.
 * @param {Object} bookingData - The updated booking data.
 * @param {string} accessToken - The access token for authentication.
 * @param {string} apiKey - The API key for the request.
 * @returns {Promise<Object>} The API response.
 */
export const updateBooking = (id, bookingData, accessToken, apiKey) =>
  apiRequest(
    `/holidaze/bookings/${id}`,
    "PUT",
    accessToken,
    bookingData,
    apiKey
  );

/**
 * Deletes a booking by its ID.
 *
 * @param {string} id - The ID of the booking to delete.
 * @param {string} accessToken - The access token for authentication.
 * @param {string} apiKey - The API key for the request.
 * @returns {Promise<Object>} The API response.
 */
export const deleteBooking = (id, accessToken, apiKey) =>
  apiRequest(`/holidaze/bookings/${id}`, "DELETE", accessToken, null, apiKey);
