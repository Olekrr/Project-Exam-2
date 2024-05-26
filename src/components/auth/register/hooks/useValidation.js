export const validateName = (name) => {
  if (name.length < 3) {
    return {
      field: "name",
      message: "Username must be at least 3 characters long."
    };
  }
  return null;
};

export const validateEmail = (email) => {
  if (!email.endsWith("@stud.noroff.no")) {
    return {
      field: "email",
      message: "You must use a @stud.noroff.no email to register."
    };
  }
  return null;
};

export const validatePassword = (password) => {
  if (password.length < 5) {
    return {
      field: "password",
      message: "Password must be at least 5 characters long."
    };
  }
  return null;
};

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
