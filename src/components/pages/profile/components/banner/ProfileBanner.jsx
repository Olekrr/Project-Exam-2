const ProfileBanner = ({ banner }) => {
  if (!banner || !banner.url) return null;
  return (
    <div className="mt-4">
      <img
        src={banner.url}
        alt={banner.alt || "Profile Banner"}
        className="img-fluid rounded"
      />
    </div>
  );
};

export default ProfileBanner;
