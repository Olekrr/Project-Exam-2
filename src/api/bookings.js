import { apiRequest } from "./common";

export const getAllBookings = (accessToken, apiKey) => {
  const sortField = "created";
  const sortOrder = "desc";
  const limit = 100;
  const page = 1;
  const url = `/holidaze/bookings?sort=${sortField}&sortOrder=${sortOrder}&limit=${limit}&page=${page}&_venue=true`;
  return apiRequest(url, "GET", accessToken, null, apiKey);
};

export const getBookingById = (id, accessToken, apiKey) =>
  apiRequest(`/holidaze/bookings/${id}`, "GET", accessToken, null, apiKey);

export const createBooking = (bookingData, accessToken, apiKey) =>
  apiRequest("/holidaze/bookings", "POST", accessToken, bookingData, apiKey);

export const updateBooking = (id, bookingData, accessToken, apiKey) =>
  apiRequest(
    `/holidaze/bookings/${id}`,
    "PUT",
    accessToken,
    bookingData,
    apiKey
  );

export const deleteBooking = (id, accessToken, apiKey) =>
  apiRequest(`/holidaze/bookings/${id}`, "DELETE", accessToken, null, apiKey);
