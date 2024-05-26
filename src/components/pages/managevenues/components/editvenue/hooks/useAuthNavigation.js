import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";

/**
 * Custom hook for managing authenticated navigation.
 *
 * @param {string} targetRoute - The target route to navigate to.
 * @returns {Object} An object containing methods to get tokens and redirect.
 */
const useAuthNavigation = (targetRoute) => {
  const navigate = useNavigate();
  const { authData } = useAuth();
  const { accessToken, apiKey } = authData;

  /**
   * Retrieves the access token and API key from the authentication context.
   *
   * @returns {Object} An object containing the access token and API key.
   */
  const getTokens = () => ({
    accessToken,
    apiKey
  });

  /**
   * Redirects to the target route.
   */
  const redirectTo = () => {
    navigate(targetRoute);
  };

  return { getTokens, redirectTo };
};

export default useAuthNavigation;
