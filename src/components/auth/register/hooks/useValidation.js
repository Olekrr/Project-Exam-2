/**
 * Validates the name field.
 * @param {string} name - The name value to validate.
 * @returns {Object|null} - An error object or null if the name is valid.
 */
export const validateName = (name) => {
  if (name.length < 3) {
    return {
      field: "name",
      message: "Username must be at least 3 characters long."
    };
  }
  return null;
};

/**
 * Validates the email field.
 * @param {string} email - The email value to validate.
 * @returns {Object|null} - An error object or null if the email is valid.
 */
export const validateEmail = (email) => {
  if (!email.endsWith("@stud.noroff.no")) {
    return {
      field: "email",
      message: "You must use a @stud.noroff.no email to register."
    };
  }
  return null;
};

/**
 * Validates the password field.
 * @param {string} password - The password value to validate.
 * @returns {Object|null} - An error object or null if the password is valid.
 */
export const validatePassword = (password) => {
  if (password.length < 5) {
    return {
      field: "password",
      message: "Password must be at least 5 characters long."
    };
  }
  return null;
};

/**
 * Validates the entire registration form.
 * @param {Object} formData - The form data to validate.
 * @returns {Array<Object>} - An array of error objects.
 */
export const validateForm = (formData) => {
  const errors = [];

  const nameError = validateName(formData.name);
  if (nameError) errors.push(nameError);

  const emailError = validateEmail(formData.email);
  if (emailError) errors.push(emailError);

  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.push(passwordError);

  return errors;
};
