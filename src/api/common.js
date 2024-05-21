const API_URL = "https://v2.api.noroff.dev";

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
