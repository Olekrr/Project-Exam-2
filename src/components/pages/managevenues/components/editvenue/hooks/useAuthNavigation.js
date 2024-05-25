import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";

const useAuthNavigation = (targetRoute) => {
  const navigate = useNavigate();
  const { authData } = useAuth();
  const { accessToken, apiKey } = authData;

  const getTokens = () => ({
    accessToken,
    apiKey
  });

  const redirectTo = () => {
    navigate(targetRoute);
  };

  return { getTokens, redirectTo };
};

export default useAuthNavigation;
