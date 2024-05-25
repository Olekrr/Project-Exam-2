import React from "react";

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
