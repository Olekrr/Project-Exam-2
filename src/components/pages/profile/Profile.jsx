import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProfile } from "./hooks/useProfile";
import ProfileAvatar from "./components/avatar/ProfileAvatar";
import ProfileBanner from "./components/banner/ProfileBanner";
import ProfileDetails from "./components/details/ProfileDetails";
import "./profile.scss";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { profile, isLoading, error } = useProfile(username);

  const handleEdit = () => {
    navigate(`/profile/${username}/edit`);
  };

  const handleManageVenues = () => {
    navigate(`/profile/${username}/manage-venues`);
  };

  const handleViewBookings = () => {
    navigate(`/profile/${username}/bookings`);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }
  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <div className="container mt-5 profile-container">
      <ProfileBanner banner={profile.banner} />
      <div className="profile-header mt-4">
        <div className="profile-avatar">
          <ProfileAvatar avatar={profile.avatar} />
        </div>
        <div className="profile-details">
          <ProfileDetails
            name={profile.name}
            email={profile.email}
            bio={profile.bio}
            venueManager={profile.venueManager}
          />
        </div>
      </div>
      <div className="profile-buttons mt-3 text-center">
        <button className="btn btn-primary" onClick={handleEdit}>
          Edit Profile
        </button>
        {profile.venueManager ? (
          <button className="btn btn-secondary" onClick={handleManageVenues}>
            Manage Venues
          </button>
        ) : (
          <button className="btn btn-info" onClick={handleViewBookings}>
            View Your Bookings
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
