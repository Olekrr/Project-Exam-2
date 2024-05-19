import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProfile } from "./hooks/useProfile";
import ProfileAvatar from "./components/avatar/ProfileAvatar";
import ProfileBanner from "./components/banner/ProfileBanner";
import ProfileDetails from "./components/details/ProfileDetails";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { profile, isLoading, error } = useProfile(username);

  const handleEdit = () => {
    navigate(`/profile/${username}/edit`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <ProfileAvatar avatar={profile.avatar} />
        </div>
        <div className="col-md-8">
          <ProfileDetails
            name={profile.name}
            email={profile.email}
            bio={profile.bio}
            venueManager={profile.venueManager}
          />
          <ProfileBanner banner={profile.banner} />
          <button className="btn btn-primary mt-3" onClick={handleEdit}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
