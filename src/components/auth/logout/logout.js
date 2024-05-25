import { useAuth } from "../contexts/AuthContext";

export const useLogout = () => {
  const { handleLogout } = useAuth();

  return { logout: handleLogout };
};
