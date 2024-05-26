import { apiRequest } from "./common";

/**
 * Registers a new user.
 *
 * @param {Object} userData - The user data to register.
 * @param {string} userData.name - The user's name.
 * @param {string} userData.email - The user's email address.
 * @param {string} userData.password - The user's password.
 * @param {boolean} userData.venueManager - Whether the user is a venue manager.
 * @returns {Promise<Object>} The API response.
 */
export const registerUser = (userData) =>
  apiRequest("/auth/register", "POST", null, userData);

/**
 * Logs in a user.
 *
 * @param {Object} loginData - The login data.
 * @param {string} loginData.email - The user's email address.
 * @param {string} loginData.password - The user's password.
 * @returns {Promise<Object>} The response data containing the access token.
 * @throws {Error} If the login fails or the response structure is invalid.
 */
export const loginUser = async (loginData) => {
  const response = await apiRequest("/auth/login", "POST", null, loginData);
  if (!response.data || !response.data.accessToken) {
    throw new Error(
      "Login failed: Invalid response structure or missing access token."
    );
  }
  return response.data;
};

/**
 * Creates an API key for a logged-in user.
 *
 * @param {string} accessToken - The user's access token.
 * @returns {Promise<string>} The created API key.
 * @throws {Error} If the API key creation fails.
 */
export const createApiKey = async (accessToken) => {
  const apiKeyResponse = await apiRequest(
    "/auth/create-api-key",
    "POST",
    accessToken,
    {}
  );
  if (!apiKeyResponse.data || !apiKeyResponse.data.key) {
    throw new Error("Failed to create API key.");
  }
  return apiKeyResponse.data.key;
};
