import { useState, useEffect } from "react";
import { getProfileByName } from "../../../../api/profiles";
import { useAuth } from "../../../../contexts/authContext";

export const useProfile = (username) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { authData } = useAuth();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { accessToken, apiKey } = authData;

        if (!accessToken || !apiKey) {
          setError(
            "Authentication credentials are not available. Please login again."
          );
          setIsLoading(false);
          return;
        }

        const data = await getProfileByName(username, accessToken, apiKey);
        if (data && data.data) {
          setProfile(data.data);
        } else {
          setError("No profile data returned from the API.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message || "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [username, authData]);

  return { profile, isLoading, error };
};
