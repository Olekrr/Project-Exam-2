const isValidURL = (url) => {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
};

export const validateBio = (bio) => {
  if (!bio || bio.length < 3) {
    return { field: "bio", message: "Bio must be at least 3 characters long." };
  }
  return null;
};

export const validateURL = (url, field) => {
  if (!isValidURL(url)) {
    return { field, message: `${field} must be a valid URL.` };
  }
  return null;
};

export const validateProfileForm = (formData) => {
  const errors = [];

  const bioError = validateBio(formData.bio);
  if (bioError) errors.push(bioError);

  const avatarURLError = validateURL(formData.avatar.url, "avatar.url");
  if (avatarURLError) errors.push(avatarURLError);

  const bannerURLError = validateURL(formData.banner.url, "banner.url");
  if (bannerURLError) errors.push(bannerURLError);

  return errors;
};
