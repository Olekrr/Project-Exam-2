import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../../api/auth";
import { validateForm } from "./useValidation";

/**
 * Custom hook to manage the registration form state and handle form submission.
 * @param {Object} initialState - The initial state of the form data.
 * @param {string} initialState.name - The initial name value.
 * @param {string} initialState.email - The initial email value.
 * @param {string} initialState.password - The initial password value.
 * @param {boolean} initialState.venueManager - The initial venue manager value.
 * @returns {Object} - An object containing the form state and handlers.
 * @returns {Object} formData - The current form data.
 * @returns {string} error - The error message.
 * @returns {Object} formErrors - The form validation errors.
 * @returns {Object} touched - The fields that have been touched.
 * @returns {boolean} isFormValid - Whether the form is valid.
 * @returns {Function} handleChange - The function to handle input changes.
 * @returns {Function} handleBlur - The function to handle input blur events.
 * @returns {Function} handleSubmit - The function to handle form submission.
 */
const useRegistrationForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validationErrors = validateForm(formData);
    const errors = validationErrors.reduce((acc, err) => {
      acc[err.field] = err.message;
      return acc;
    }, {});
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [formData]);

  /**
   * Handles input changes and updates the form data.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value
    }));
    setError("");
  };

  /**
   * Handles input blur events and updates the touched state.
   * @param {React.FocusEvent<HTMLInputElement>} e - The blur event.
   */
  const handleBlur = (e) => {
    const { id } = e.target;
    setTouched((prev) => ({
      ...prev,
      [id]: true
    }));
  };

  /**
   * Handles form submission, validates the form, and submits the data.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationErrors = validateForm(formData);
    if (validationErrors.length > 0) {
      const errors = validationErrors.reduce((acc, err) => {
        acc[err.field] = err.message;
        return acc;
      }, {});
      setFormErrors(errors);
      setTouched(
        Object.keys(formData).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {}
        )
      );
      return;
    }

    try {
      const response = await registerUser(formData);
      if (response) {
        navigate("/login");
      }
    } catch (err) {
      setError("Failed to register. Please check your details.");
    }
  };

  return {
    formData,
    error,
    formErrors,
    touched,
    isFormValid,
    handleChange,
    handleBlur,
    handleSubmit
  };
};

export default useRegistrationForm;
