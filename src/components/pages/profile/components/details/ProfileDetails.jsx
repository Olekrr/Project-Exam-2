const ProfileDetails = ({ name, email, bio, venueManager }) => {
  return (
    <>
      <h2>{name}</h2>
      <p>{email}</p>
      {bio && (
        <p>
          <strong>Bio:</strong> {bio}
        </p>
      )}
      {venueManager && <p className="badge bg-success">Venue Manager</p>}
    </>
  );
};

export default ProfileDetails;
