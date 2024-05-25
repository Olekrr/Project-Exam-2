import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, createApiKey } from "../../../../api/auth";
import { getProfileByName } from "../../../../api/profiles";

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

      const profileResponse = await getProfileByName(
        userData.name || "defaultUsername",
        userData.accessToken,
        apiKey
      );
      const profileData = profileResponse.data;

      if (
        profileData &&
        profileData.bio &&
        profileData.bio.trim() !== "" &&
        profileData.avatar &&
        profileData.avatar.url &&
        profileData.avatar.url.trim() !== "" &&
        profileData.banner &&
        profileData.banner.url &&
        profileData.banner.url.trim() !== ""
      ) {
        navigate(`/`);
      } else {
        navigate(`/welcome`);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message || "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading, error };
};
