const API_URL = 'https://api.noroff.dev';

const getHeaders = (accessToken, apiKey) => ({
  'Content-Type': 'application/json',
  Authorization: accessToken ? `Bearer ${accessToken}` : '',
  'X-Noroff-API-Key': apiKey || '',
});

const apiRequest = async (endpoint, method, accessToken, apiKey, body = null) => {
  const options = {
    method,
    headers: getHeaders(accessToken, apiKey),
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API request failed');
    }
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};