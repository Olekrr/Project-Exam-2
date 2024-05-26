import React from "react";

/**
 * Component to display the user's profile details.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.name - User's name.
 * @param {string} props.email - User's email.
 * @param {string} [props.bio] - User's bio.
 * @param {boolean} props.venueManager - Flag indicating if the user is a venue manager.
 * @returns {JSX.Element} The ProfileDetails component.
 */
const ProfileDetails = ({ name, email, bio, venueManager }) => {
  return (
    <>
      <h1 className="profile-name">{name}</h1>
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
