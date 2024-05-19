const API_URL = "https://v2.api.noroff.dev";

export const apiRequest = async (
  endpoint,
  method,
  accessToken = null,
  body = null,
  apiKey = null,
) => {
  const headers = new Headers({
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...(apiKey && { "X-Noroff-API-Key": apiKey }),
  });

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      let errorText = "API request failed";
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        errorText =
          data.message || `API request failed with status: ${response.status}`;
      } else {
        errorText = await response.text();
      }
      console.error("API request failed:", errorText);
      throw new Error(errorText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
