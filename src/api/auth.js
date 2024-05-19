import { apiRequest } from "./common";

export const registerUser = (userData) =>
  apiRequest("/auth/register", "POST", null, userData);

export const loginUser = async (loginData) => {
  const response = await apiRequest("/auth/login", "POST", null, loginData);
  if (!response.data || !response.data.accessToken) {
    throw new Error(
      "Login failed: Invalid response structure or missing access token.",
    );
  }
  return response.data;
};

export const createApiKey = async (accessToken) => {
  const apiKeyResponse = await apiRequest(
    "/auth/create-api-key",
    "POST",
    accessToken,
    {},
  );
  if (!apiKeyResponse.data || !apiKeyResponse.data.key) {
    throw new Error("Failed to create API key.");
  }
  return apiKeyResponse.data.key;
};
