export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("username");
  localStorage.removeItem("apiKey");
};
