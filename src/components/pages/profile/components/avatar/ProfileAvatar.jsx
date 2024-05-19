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
