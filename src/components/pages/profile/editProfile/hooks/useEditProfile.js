import { useState, useEffect } from "react";
import { getProfileByName, updateProfile } from "../../../../../api/profiles";

export const useEditProfile = (username) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    venueManager: false,
    avatar: { url: "", alt: "User avatar" },
    banner: { url: "", alt: "Profile banner" },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const apiKey = localStorage.getItem("apiKey");
        const data = await getProfileByName(username, token, apiKey);
        if (data && data.data) {
          setProfile({ ...data.data });
        } else {
          setError("Profile not found");
        }
      } catch (err) {
        setError("Failed to fetch profile");
        console.error("Error fetching profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  const updateProfileData = async (profileData) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const apiKey = localStorage.getItem("apiKey");
      await updateProfile(username, profileData, token, apiKey);
      return true;
    } catch (error) {
      setError("Failed to update profile");
      console.error("Update error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    isLoading,
    error,
    setProfile,
    updateProfileData,
  };
};
