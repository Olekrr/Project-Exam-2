import { useState, useEffect } from "react";
import { getProfileByName, updateProfile } from "../../../../../api/profiles";
import { useAuth } from "../../../../../contexts/authContext";
import { validateProfileForm } from "./validateEdit";

/**
 * Custom hook for editing the user profile.
 *
 * @param {string} username - The username of the profile to edit.
 * @returns {Object} The profile data and related handlers.
 */
export const useEditProfile = (username) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    venueManager: false,
    avatar: { url: "", alt: "User avatar" },
    banner: { url: "", alt: "Profile banner" }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const { authData } = useAuth();

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const { accessToken, apiKey } = authData;
        const data = await getProfileByName(username, accessToken, apiKey);
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
  }, [username, authData]);

  useEffect(() => {
    const validationErrors = validateProfileForm(profile);
    const errors = validationErrors.reduce((acc, err) => {
      acc[err.field] = err.message;
      return acc;
    }, {});
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [profile]);

  /**
   * Handles input change and updates the profile state.
   *
   * @param {React.ChangeEvent} e - The change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => {
      const keys = name.split(".");
      if (keys.length > 1) {
        return {
          ...prev,
          [keys[0]]: {
            ...prev[keys[0]],
            [keys[1]]: value
          }
        };
      }
      return {
        ...prev,
        [name]: value
      };
    });
    setError("");
  };

  /**
   * Handles input blur and sets the touched state.
   *
   * @param {React.FocusEvent} e - The blur event.
   */
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));
  };

  /**
   * Updates the profile data.
   *
   * @param {Object} profileData - The profile data to update.
   * @returns {boolean} True if the update is successful, false otherwise.
   */
  const updateProfileData = async (profileData) => {
    setIsLoading(true);
    try {
      const { accessToken, apiKey } = authData;
      await updateProfile(username, profileData, accessToken, apiKey);
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
    formErrors,
    touched,
    isFormValid,
    setProfile,
    handleChange,
    handleBlur,
    updateProfileData
  };
};
