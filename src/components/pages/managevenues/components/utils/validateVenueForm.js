/**
 * Validates if a value meets the minimum length requirement.
 *
 * @param {string} value - The value to validate.
 * @param {number} minLength - The minimum length required.
 * @returns {boolean} - Returns true if the value meets or exceeds the minimum length, false otherwise.
 */
const validateMinLength = (value, minLength) => {
  return value.length >= minLength;
};

/**
 * Validates if a string is a valid URL.
 *
 * @param {string} string - The string to validate.
 * @returns {boolean} - Returns true if the string is a valid URL, false otherwise.
 */
const isValidURL = (string) => {
  const res = string.match(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i);
  return res !== null;
};

/**
 * Validates venue form data.
 *
 * @param {Object} formData - The form data to validate.
 * @param {string} formData.name - The name of the venue.
 * @param {string} formData.description - The description of the venue.
 * @param {Object} formData.location - The location details of the venue.
 * @param {string} formData.location.address - The address of the venue.
 * @param {string} formData.location.city - The city of the venue.
 * @param {string} formData.location.zip - The zip code of the venue.
 * @param {string} formData.location.country - The country of the venue.
 * @param {string} formData.location.continent - The continent of the venue.
 * @param {Object[]} formData.media - The media array containing image URLs.
 * @param {string} formData.media.url - The URL of the image.
 * @param {number} formData.price - The price per night for the venue.
 * @param {number} formData.maxGuests - The maximum number of guests allowed.
 * @param {number} formData.rating - The rating of the venue.
 * @returns {Object} - An object containing validation error messages for each invalid field.
 */
const validateVenueForm = (formData) => {
  const errors = {};

  const requiredFields = [
    { field: "name", label: "Venue name" },
    { field: "description", label: "Description" },
    { field: "location.address", label: "Address" },
    { field: "location.city", label: "City" },
    { field: "location.zip", label: "Zip" },
    { field: "location.country", label: "Country" },
    { field: "location.continent", label: "Continent" }
  ];

  requiredFields.forEach(({ field, label }) => {
    const keys = field.split(".");
    let value = formData;
    keys.forEach((key) => {
      value = value[key];
    });
    if (!validateMinLength(value, 3)) {
      errors[keys[keys.length - 1]] =
        `${label} must be at least 3 characters long.`;
    }
  });

  if (
    formData.media[0].url.length > 300 ||
    !isValidURL(formData.media[0].url)
  ) {
    errors.media =
      "Image URL must be a valid URL and cannot be greater than 300 characters.";
  }
  if (formData.price < 1 || formData.price > 10000) {
    errors.price = "Price must be between 1 and 10,000.";
  }
  if (formData.maxGuests < 1 || formData.maxGuests > 100) {
    errors.maxGuests = "Max guests must be between 1 and 100.";
  }
  if (formData.rating < 1 || formData.rating > 5) {
    errors.rating = "Rating must be between 1 and 5.";
  }

  return errors;
};

export default validateVenueForm;
