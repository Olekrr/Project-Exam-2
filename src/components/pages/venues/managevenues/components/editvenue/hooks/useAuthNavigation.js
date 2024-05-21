import { useNavigate } from "react-router-dom";

const useAuthNavigation = (targetRoute) => {
  const navigate = useNavigate();

  const getTokens = () => ({
    accessToken: localStorage.getItem("accessToken"),
    apiKey: localStorage.getItem("apiKey")
  });

  const redirectTo = () => {
    navigate(targetRoute);
  };

  return { getTokens, redirectTo };
};

export default useAuthNavigation;
