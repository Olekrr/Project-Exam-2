import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEditProfile } from "./hooks/useEditProfile";
import TextInput from "../../../utils/textinput/TextInput";
import TextAreaInput from "../../../utils/textareainput/TextAreaInput";

/**
 * Component for editing the user profile.
 *
 * @component
 * @returns {JSX.Element} The EditProfile component.
 */
const EditProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const {
    profile,
    isLoading,
    error,
    formErrors,
    touched,
    isFormValid,
    handleChange,
    handleBlur,
    updateProfileData
  } = useEditProfile(username);

  /**
   * Handles form submission to update the profile.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await updateProfileData(profile);
    if (updated) {
      navigate(`/profile-update-success`);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!profile) return <div>No profile data available.</div>;

  return (
    <div className="container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <TextAreaInput
          label="Bio"
          id="bio"
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.bio && formErrors.bio}
        />
        <TextInput
          label="Avatar URL"
          id="avatarUrl"
          name="avatar.url"
          value={profile.avatar.url}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched["avatar.url"] && formErrors["avatar.url"]}
        />
        <TextInput
          label="Banner URL"
          id="bannerUrl"
          name="banner.url"
          value={profile.banner.url}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched["banner.url"] && formErrors["banner.url"]}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isFormValid}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
