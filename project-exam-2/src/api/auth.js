import { apiRequest } from './common';

export const registerUser = (userData) => apiRequest('/auth/register', 'POST', null, null, userData);
export const loginUser = (loginData) => apiRequest('/auth/login', 'POST', null, null, loginData);
export const createApiKey = (accessToken, apiKeyName = 'API Key') => apiRequest('/auth/create-api-key', 'POST', accessToken, null, { name: apiKeyName });
