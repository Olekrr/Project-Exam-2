import { apiRequest } from './common';

export const getAllProfiles = (accessToken, apiKey) => apiRequest('/holidaze/profiles', 'GET', accessToken, apiKey);
export const getProfileByName = (name, accessToken, apiKey) => apiRequest(`/holidaze/profiles/${name}`, 'GET', accessToken, apiKey);
export const updateProfile = (name, profileData, accessToken, apiKey) => apiRequest(`/holidaze/profiles/${name}`, 'PUT', accessToken, apiKey, profileData);
export const getProfileBookings = (name, accessToken, apiKey) => apiRequest(`/holidaze/profiles/${name}/bookings`, 'GET', accessToken, apiKey);
export const getProfileVenues = (name, accessToken, apiKey) => apiRequest(`/holidaze/profiles/${name}/venues`, 'GET', accessToken, apiKey);
export const searchProfiles = (query, accessToken, apiKey) => apiRequest(`/holidaze/profiles/search?q=${query}`, 'GET', accessToken, apiKey);
