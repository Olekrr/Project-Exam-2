const API_URL = "https://v2.api.noroff.dev";

export const apiRequest = async (
  endpoint,
  method,
  accessToken,
  apiKey,
  body = null,
) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
    "X-Noroff-API-Key": apiKey || "",
  };

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API request failed");
    }
    return await response.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
