import { apiRequest } from './common';

export const getAllBookings = (accessToken, apiKey) => apiRequest('/holidaze/bookings', 'GET', accessToken, apiKey);
export const getBookingById = (id, accessToken, apiKey) => apiRequest(`/holidaze/bookings/${id}`, 'GET', accessToken, apiKey);
export const createBooking = (bookingData, accessToken, apiKey) => apiRequest('/holidaze/bookings', 'POST', accessToken, apiKey, bookingData);
export const updateBooking = (id, bookingData, accessToken, apiKey) => apiRequest(`/holidaze/bookings/${id}`, 'PUT', accessToken, apiKey, bookingData);
export const deleteBooking = (id, accessToken, apiKey) => apiRequest(`/holidaze/bookings/${id}`, 'DELETE', accessToken, apiKey);
