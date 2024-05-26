import { useAuth } from "../contexts/AuthContext";

/**
 * Custom hook to handle user logout.
 * This hook provides a logout function that can be used to log out the user.
 * @returns {{ logout: () => void }} An object containing the logout function.
 */
export const useLogout = () => {
  const { handleLogout } = useAuth();

  return { logout: handleLogout };
};
