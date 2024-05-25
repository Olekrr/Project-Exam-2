import React from "react";

const ProfileDetails = ({ name, email, bio, venueManager }) => {
  return (
    <>
      <h2 className="profile-name">{name}</h2>
      <p className="profile-email">{email}</p>
      {bio && (
        <p className="profile-bio">
          <strong>Bio:</strong> {bio}
        </p>
      )}
      {venueManager && <p className="badge bg-success">Venue Manager</p>}
    </>
  );
};

export default ProfileDetails;
