import React from "react";

/**
 * Component to display the user's profile banner.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.banner - Banner object containing URL and alt text.
 * @param {string} props.banner.url - URL of the banner image.
 * @param {string} [props.banner.alt] - Alt text for the banner image.
 * @returns {JSX.Element|null} The ProfileBanner component.
 */
const ProfileBanner = ({ banner }) => {
  if (!banner || !banner.url) return null;
  return (
    <div className="profile-banner">
      <img
        src={banner.url}
        alt={banner.alt || "Profile Banner"}
        className="img-fluid rounded"
      />
    </div>
  );
};

export default ProfileBanner;
