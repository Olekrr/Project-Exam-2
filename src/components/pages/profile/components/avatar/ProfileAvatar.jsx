import React from "react";

/**
 * Component to display the user's profile avatar.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.avatar - Avatar object containing URL and alt text.
 * @param {string} props.avatar.url - URL of the avatar image.
 * @param {string} [props.avatar.alt] - Alt text for the avatar image.
 * @returns {JSX.Element|null} The ProfileAvatar component.
 */
const ProfileAvatar = ({ avatar }) => {
  if (!avatar || !avatar.url) return null;
  return (
    <img
      src={avatar.url}
      alt={avatar.alt || "Profile Avatar"}
      className="img-fluid rounded-circle"
    />
  );
};

export default ProfileAvatar;
