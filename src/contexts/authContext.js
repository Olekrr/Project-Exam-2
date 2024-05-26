import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { loginUser, createApiKey } from "../api/auth";
import { getProfileByName } from "../api/profiles";

const AuthContext = createContext();

/**
 * AuthProvider component that provides authentication context to its children.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} The AuthProvider component.
 */
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    accessToken: Cookies.get("accessToken") || null,
    apiKey: Cookies.get("apiKey") || null,
    username: Cookies.get("username") || null,
    isLoading: false,
    error: ""
  });

  const navigate = useNavigate();

  /**
   * Handles the login process.
   *
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<void>}
   */
  const handleLogin = async (email, password) => {
    setAuthData((prev) => ({ ...prev, isLoading: true, error: "" }));
    try {
      const userData = await loginUser({ email, password });
      const accessToken = userData.accessToken;
      const username = userData.name || "defaultUsername";
      Cookies.set("accessToken", accessToken, { expires: 7, secure: true });
      Cookies.set("username", username, { expires: 7, secure: true });
      setAuthData((prev) => ({ ...prev, accessToken, username }));

      const apiKey = await createApiKey(accessToken);
      Cookies.set("apiKey", apiKey, { expires: 7, secure: true });
      setAuthData((prev) => ({ ...prev, apiKey }));

      const profileResponse = await getProfileByName(
        username,
        accessToken,
        apiKey
      );
      const profileData = profileResponse.data;
      if (profileData && profileData.bio && profileData.bio.trim() !== "") {
        navigate(`/`);
      } else {
        navigate(`/welcome`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setAuthData((prev) => ({
        ...prev,
        error: error.message || "An unexpected error occurred.",
        isLoading: false
      }));
    }
  };

  /**
   * Handles the logout process.
   *
   * @returns {void}
   */
  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("apiKey");
    Cookies.remove("username");
    setAuthData({
      accessToken: null,
      apiKey: null,
      username: null,
      isLoading: false,
      error: ""
    });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ authData, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the AuthContext.
 *
 * @returns {Object} The authentication context value.
 */
export const useAuth = () => useContext(AuthContext);
