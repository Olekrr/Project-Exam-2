/**
 * Checks if a URL is valid.
 *
 * @param {string} url - The URL to validate.
 * @returns {boolean} True if the URL is valid, false otherwise.
 */
const isValidURL = (url) => {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
};

/**
 * Validates the bio field.
 *
 * @param {string} bio - The bio to validate.
 * @returns {Object|null} An error object if validation fails, null otherwise.
 */
export const validateBio = (bio) => {
  if (!bio || bio.length < 3) {
    return { field: "bio", message: "Bio must be at least 3 characters long." };
  }
  return null;
};

/**
 * Validates a URL field.
 *
 * @param {string} url - The URL to validate.
 * @param {string} field - The name of the field being validated.
 * @returns {Object|null} An error object if validation fails, null otherwise.
 */
export const validateURL = (url, field) => {
  if (!isValidURL(url)) {
    return {
      field,
      message: `${field} must be a valid URL and not exceed 300 characters`
    };
  }
  return null;
};

/**
 * Validates the entire profile form.
 *
 * @param {Object} formData - The form data to validate.
 * @returns {Array<Object>} An array of error objects.
 */
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
