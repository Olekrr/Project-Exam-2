import React from "react";
import TextInput from "../../utils/textinput/TextInput";
import CheckboxInput from "../../utils/checkboxinput/CheckboxInput";
import useRegistrationForm from "./hooks/useRegistrationForm";

/**
 * Register component for user registration.
 * This component renders a registration form where users can input their details to create a new account.
 * @component
 * @returns {JSX.Element} The rendered Register component.
 */
const Register = () => {
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    venueManager: false
  };

  const {
    formData,
    error,
    formErrors,
    touched,
    isFormValid,
    handleChange,
    handleBlur,
    handleSubmit
  } = useRegistrationForm(initialFormData);

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && formErrors.name}
        />
        <TextInput
          label="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && formErrors.email}
        />
        <TextInput
          label="Password"
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && formErrors.password}
        />
        <CheckboxInput
          label="Register as a venue manager"
          id="venueManager"
          name="venueManager"
          checked={formData.venueManager}
          onChange={handleChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isFormValid}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
