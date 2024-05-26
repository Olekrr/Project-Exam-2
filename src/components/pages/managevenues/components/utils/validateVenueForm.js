const validateMinLength = (value, minLength) => {
  return value.length >= minLength;
};

const isValidURL = (string) => {
  const res = string.match(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i);
  return res !== null;
};

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
