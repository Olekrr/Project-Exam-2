import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEditProfile } from "./hooks/useEditProfile";
import TextInput from "../../../utils/textInput/textInput";
import TextAreaInput from "../../../utils/textAreaInput/TextAreaInput";

const EditProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { profile, isLoading, error, setProfile, updateProfileData } =
    useEditProfile(username);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

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
        <TextInput
          label="Name"
          id="name"
          value={profile.name}
          onChange={handleChange}
        />
        <TextInput
          label="Email"
          id="email"
          value={profile.email}
          onChange={handleChange}
        />
        <TextAreaInput
          label="Bio"
          id="bio"
          value={profile.bio}
          onChange={handleChange}
        />
        <TextInput
          label="Avatar URL"
          id="avatarUrl"
          value={profile.avatar.url}
          onChange={handleChange}
        />
        <TextInput
          label="Banner URL"
          id="bannerUrl"
          value={profile.banner.url}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
