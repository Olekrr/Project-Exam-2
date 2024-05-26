const API_URL = process.env.REACT_APP_API_URL;

/**
 * Makes an API request.
 *
 * @param {string} endpoint - The API endpoint.
 * @param {string} method - The HTTP method (e.g., "GET", "POST").
 * @param {string} [accessToken=null] - The access token for authentication.
 * @param {Object} [body=null] - The request body.
 * @param {string} [apiKey=null] - The API key for the request.
 * @returns {Promise<Object|null>} The API response, or null if the response status is 204.
 * @throws {Error} If the API request fails or the response cannot be parsed.
 */
export const apiRequest = async (
  endpoint,
  method,
  accessToken = null,
  body = null,
  apiKey = null
) => {
  const headers = new Headers({
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...(apiKey ? { "X-Noroff-API-Key": apiKey } : {})
  });

  const options = {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : null
  };

  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const responseText = await response.text();
      console.error(
        `API request failed with status: ${response.status}`,
        responseText
      );
      throw new Error(
        `API request failed with status: ${response.status} - ${responseText}`
      );
    }

    if (response.status === 204) {
      return null;
    }

    const responseText = await response.text();
    try {
      return JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      throw e;
    }
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
