import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, createApiKey } from "../../../../api/auth";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setError("");
    try {
      const userData = await loginUser({ email, password });
      localStorage.setItem("accessToken", userData.accessToken);
      localStorage.setItem("username", userData.name || "defaultUsername");

      const apiKey = await createApiKey(userData.accessToken);
      localStorage.setItem("apiKey", apiKey);

      navigate(`/profile/${userData.name || "defaultUsername"}`);
      setIsLoading(false);
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading, error };
};
