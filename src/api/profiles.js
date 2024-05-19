import { apiRequest } from "./common";

export const getAllProfiles = (accessToken, apiKey) =>
  apiRequest("/holidaze/profiles", "GET", accessToken, null, apiKey);

export const getProfileByName = (name, accessToken, apiKey) => {
  return apiRequest(
    `/holidaze/profiles/${name}`,
    "GET",
    accessToken,
    null,
    apiKey
  );
};

export const updateProfile = (name, profileData, accessToken, apiKey) =>
  apiRequest(
    `/holidaze/profiles/${name}`,
    "PUT",
    accessToken,
    profileData,
    apiKey
  );

export const getProfileBookings = (name, accessToken, apiKey) =>
  apiRequest(
    `/holidaze/profiles/${name}/bookings`,
    "GET",
    accessToken,
    null,
    apiKey
  );

export const getProfileVenues = (name, accessToken, apiKey) =>
  apiRequest(
    `/holidaze/profiles/${name}/venues`,
    "GET",
    accessToken,
    null,
    apiKey
  );

export const searchProfiles = (query, accessToken, apiKey) =>
  apiRequest(
    `/holidaze/profiles/search?q=${query}`,
    "GET",
    accessToken,
    null,
    apiKey
  );
