import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../../api/auth";
import { validateForm } from "./useValidation";

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

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value
    }));
    setError("");
  };

  const handleBlur = (e) => {
    const { id } = e.target;
    setTouched((prev) => ({
      ...prev,
      [id]: true
    }));
  };

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
