import React from "react";
import TextInput from "../../utils/textInput/textInput";
import CheckboxInput from "../../utils/checkboxInput/CheckboxInput";
import useRegistrationForm from "./hooks/useRegistrationForm";

const Register = () => {
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    venueManager: false
  };

  const { formData, error, handleChange, handleSubmit } =
    useRegistrationForm(initialFormData);

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextInput
          label="Email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextInput
          label="Password"
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <CheckboxInput
          label="Register as a venue manager"
          id="venueManager"
          checked={formData.venueManager}
          onChange={handleChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
